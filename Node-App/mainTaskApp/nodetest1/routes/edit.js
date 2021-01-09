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
  var row = req.query.row

  db.all(sql, arrayOfTasks, row, (err, rows) => {
    if (err) {
      console.error(err.message);
    }
    console.log(sql + row + ';')
    // console.log(row)
    // console.log(rows)
    // console.log(sql)
  });
  res.render('edit');
    
  });

db.all(sql, arrayOfTasks, (err, rows) => {
  if (err) {
    console.error(err.message);
  }
  });
module.exports = router;
