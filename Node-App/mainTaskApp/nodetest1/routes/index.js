var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const {spawn} = require('child_process');
var arrayOfTasks = []
var dataToSend = "";
let sql = `SELECT rowNum as rowNum,
dateTaskEnter as dateTaskEnter,
dueDate as dueDate,
title as title,
comments as comments,
priority as priority,
completion as completion, 
status as status
FROM TaskList`;

let db = new sqlite3.Database('./data/db/dataStored.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected it working database.');
});


db.all(sql, arrayOfTasks, (err, rows) => {
  if (err) {
    console.error(err.message);
  }
  // console.log(rows[3].title)

  /* GET home page. */
  // console.log(dataStored)

  router.get('/', function(req, res, next) {
    res.render('index', {
      rows:rows,
      dataToSend:dataToSend,
    });
  });
  
  router.post('/update', function(req, res) {
 
    var dataToSend;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;

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
        res.render('index', {
            dataToSend:dataToSend,
            rows:rows,
        });
    }); 
  });
  // router.get('/edit', function(req, res, next) {
  //   res.redirect('edit', {
  //     rows:rows,
  //   });
  // });
});

db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Close the database connection.');
});


module.exports = router;
