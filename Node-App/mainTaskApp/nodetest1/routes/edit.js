var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();

var arrayOfTasks = [];
var dataToSend = "";
let sql = `SELECT rowNum as rowNum,
dateTaskEnter as dateTaskEnter,
dueDate as dueDate,
title as title,
comments as comments,
priority as priority,
completion as completion, 
status as status FROM TaskList WHERE rowNum = `;

let db = new sqlite3.Database('./data/db/dataStored.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected it working database.');
});

// need to pass the sql plus row into the squery for it to work do aodouble into
router.get('/', function(req, res, next) {
  // console.log(req.query.row)
  var row = req.query.row
  // console.log(sql)
  var newSQLQuery = sql + row + ';'
  // console.log(newSQLQuery)


  db.all(newSQLQuery, arrayOfTasks, row, (err, rows) => {
    if (err) {
      console.error(err.message);
    }
    // console.log('here' + rows[3].title)
    // console.log(rows[1])

  });
  res.render('edit');
    
  });

// db.all(sql, arrayOfTasks, (err, rows) => {
//   if (err) {
//     console.error(err.message);
//   }
//   });
module.exports = router;
