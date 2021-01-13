// Create express app
var express = require("express")
var app = express()
var db = require("./database")
var md5 = require("md5")

const {spawn} = require('child_process');

// Below how to show the request on terminal
var logger = require('morgan');
app.use(logger('dev'));

// Need to add helmetjs github

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Server port
var HTTP_PORT = 8001 
// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});
// Root endpoint
app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});

// Insert here other API endpoints
// Get a List of users
app.get("/api/task", (req, res, next) => {
    var sql = "SELECT * FROM TaskList"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});

// Get a single user by id
app.get("/api/task/:id", (req, res, next) => {
    var sql = "SELECT * FROM TaskList where oid = ?;"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":row
        })
      });
});

// Create a new user
// There are 7 parameters to create this new task
// dateTaskEnter, dueDate, title, comments, priority, completion,status
app.post("/api/task/", (req, res, next) => {
    var errors=[]
    if (!req.body.dateTaskEnter){
        errors.push("No Date Task Enter specified");
    }
    if (!req.body.dueDate){
        errors.push("No Due Date specified");
    }
    if (!req.body.title){
        errors.push("No Title specified");
    }
    if (!req.body.comments){
        errors.push("No Comments specified");
    }
    if (!req.body.priority){
        errors.push("No priority specified");
    }
    if (!req.body.completion){
        errors.push("No Completion specified");
    }
    if (!req.body.status){
        errors.push("No Status specified");
    }

    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    // dateTaskEnter, dueDate, title, comments, priority, completion,status
    var data = {
        dateTaskEnter: req.body.dateTaskEnter,
        dueDate: req.body.dueDate,
        title: req.body.title,
        comments:req.body.comments,
        priority:req.body.priority,
        completion:req.body.completion,
        status:req.body.status
    }
    var sql ="INSERT INTO TaskList ( dateTaskEnter, dueDate, title, comments, priority, completion, status) VALUES ( ?,?,?,?,?,?,?);"
    var params =[data.dateTaskEnter, data.dueDate, data.title, data.comments, data.priority, data.completion, data.status]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "ID" : this.lastID   
        });
    });
});

// Update an user
// dateTaskEnter, dueDate, title, comments, priority, completion,status
app.patch("/api/task/:id", (req, res, next) => {
    let dateTaskEnterEdit = req.body.dateTaskEnter;
    let dueDateEdit = req.body.dueDate;
    let titleEdit = req.body.title;
    let commentsEdit = req.body.comments;
    let priorityEdit = req.body.priority;
    let completionEdit = req.body.completion;
    let statusEdit = req.body.status;
    let rowNumBody = req.params.id;

    // This can be removed with the data paramet on the res.json too. 
    var data = {
        rowNumBody: req.params.id,
        dateTaskEnter: req.body.dateTaskEnter,
        dueDate: req.body.dueDate,
        title: req.body.title,
        comments:req.body.comments,
        priority:req.body.priority,
        completion:req.body.completion,
        status:req.body.status
    }
    db.run(
       `UPDATE TaskList 
        SET dateTaskEnter = $dateTaskEnter, 
            dueDate = $dueDate, 
            title = $title, 
            comments = $comments, 
            priority = $priority,
            completion = $completion,
            status = $status 
        WHERE oid = $rowNum;`,
        {
            $dateTaskEnter:dateTaskEnterEdit,
            $dueDate:dueDateEdit,
            $title: titleEdit,
            $comments: commentsEdit,
            $priority: priorityEdit,
            $completion: completionEdit,
            $status: statusEdit,
            $rowNum: rowNumBody
          },
          
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({
                message: "success",
                data: data,
                changes: this.changes
            })
    });
    // console.log(rowNumBody)
});

// Delete an user
app.delete("/api/task/:id", (req, res, next) => {
    db.run(
        'DELETE FROM TaskList WHERE oid = ?;',
        req.params.id,
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message":"deleted", changes: this.changes})
    });
});

// Add extra api call to either ping or dnslookup a IP Address but first just do a simple parameter pass into python script. 
app.get("/api/python/:id,:id2", (req, res, next) => {
    // let var1 = req.params.id;
    // let var2 = req.params.id2;

    // console.log(var1 + var2)

    var dataToSend;
    var firstName = req.params.id;
    var lastName = req.params.id2;

    // spawn new child process to call the python script
    const python = spawn('python', ['./pythonScripts/script1.py', firstName, lastName]);
    
    // collect data from script
    python.stdout.on('data', function (data) {
        console.log('Pipe data from python script ...');
        dataToSend = data.toString();
    });
    // in close event we are sure that stream from child process is closed
    python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        // send data to browser
        //  res.send(dataToSend)
        res.json({"message":"python", dataToSend})
    }); 
});

// Default response for any other request
app.use(function(req, res){
    res.status(404);
});