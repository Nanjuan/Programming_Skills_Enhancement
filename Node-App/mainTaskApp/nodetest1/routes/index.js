var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const {spawn} = require('child_process');

var dataToSend = "";
let sql = `SELECT oid as rowNum,
dateTaskEnter as dateTaskEnter,
dueDate as dueDate,
title as title,
comments as comments,
priority as priority,
completion as completion, 
status as status
FROM TaskList`;


  // console.log(rows[1].title)
  // console.log(rows[3].title)

  /* GET home page. */
  // console.log(dataStored)

router.get('/', function(req, res, next) {
  let db = new sqlite3.Database('./data/db/dataStored.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected it working database.');
  });
  db.all(sql, (err, rows) => {
    if (err) {
      console.error(err.message);
    }
    // console.log(rows)
    res.render('index', {
      rows:rows,
      dataToSend:dataToSend,
    });
  });
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Close the database connection.');
  });
});

router.post('/delete', function(req, res) {
  let db = new sqlite3.Database('./data/db/dataStored.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected it working database.');
  });

  let deleteRow = req.body.row;
  // console.log(req.body.row)

  // DELETE FROM TaskList WHERE rowNum = 11;
  newQuery = `DELETE FROM TaskList WHERE oid = ${deleteRow};`
 
  // console.log(newQuery);
  db.run(newQuery);
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Close the database connection.');
  });
  
  res.redirect('/')
});

router.post('/update', function(req, res) {
  let db = new sqlite3.Database('./data/db/dataStored.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected it working database.');
  });
  db.all(sql, (err, rows) => {
    if (err) {
      console.error(err.message);
    }

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
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Close the database connection.');
  });
});



module.exports = router;
