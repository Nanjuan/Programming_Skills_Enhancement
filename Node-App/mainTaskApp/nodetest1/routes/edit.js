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

// UPDATE TaskList SET title = 'newUpdateTitle' WHERE rowNum = 2;
let sqlUpdateTable = `UPDATE TaskList SET `
let sqlUpdateWhere = `WHERE rowNum = `

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
    var rowNum = rows[0].rowNum;
    var dateTaskEnter = rows[0].dateTaskEnter;
    var dueDate = rows[0].dueDate;
    var title = rows[0].title;
    var comments = rows[0].comments;
    var priority = rows[0].priority;
    var completion = rows[0].completion;
    var status = rows[0].status;
    // console.log(rowNum, dateTaskEnter)
    // console.log(rows[0].title)

    res.render('edit', {
      rowNum: rowNum,
      dateTaskEnter: dateTaskEnter,
      dueDate: dueDate,
      title: title,
      comments: comments,
      priority: priority,
      completion: completion,
      status: status,
    });
    // Here is where the update of the field happen
    // Here is the update query 
    // UPDATE TaskList SET 
    // title = 'newUpdateTitle' 
    // WHERE rowNum = 
    // 2;

    router.post('/updateEdit', function(req, res) {
      let dateTaskEnterEdit = req.body.dateTaskEnter;
      // + "dateTaskEnter" + "=" + "'" + dateTaskEnterEdit + "' "+","
      let dueDateEdit = req.body.dueDate;
      // + "dueDate" + "=" + "'" + dueDateEdit + "' "+","
      let titleEdit = req.body.title;
      // + "title" + "=" + "'" + titleEdit + "' "+","
      let commentsEdit = req.body.comments;
      // + "comments" + "=" + "'" + commentsEdit + "' "+","
      let priorityEdit = req.body.priority;
      // + "priority" + "=" + "'" + priorityEdit + "' "+","
      let completionEdit = req.body.completion;
      // + "completion" + "=" + "'" + completionEdit + "' "+","
      let statusEdit = req.body.status;
      // + "status" + "=" + "'" + statusEdit + "' "+

      // Need to pass the title which is the name of th efield 
      // UPDATE TaskList SET dateTaskEnter = '2021-10-09', dueDate = '2021-10-10', title = 'newUpdateTitle', comments = 'New query', priority = 'high',completion = 'completed',status = 'working' WHERE rowNum = 2;
      updateQuery = sqlUpdateTable + "dateTaskEnter" + "=" + "'" + dateTaskEnterEdit + "' "+"," + "dueDate" + "=" + "'" + dueDateEdit + "' "+"," + "title" + "=" + "'" + titleEdit + "' "+"," + "comments" + "=" + "'" + commentsEdit + "' "+","  + "priority" + "=" + "'" + priorityEdit + "' "+"," + "completion" + "=" + "'" + completionEdit + "' "+"," + "status" + "=" + "'" + statusEdit + "' "+ sqlUpdateWhere + rowNum + ";"
      db.run(updateQuery);
      res.redirect('/');
      // console.log(updateQuery)
      // console.log(updateQuery)
      // res.render('edit', {
      //   rowNum: rowNum,
      //   dateTaskEnter: dateTaskEnter,
      //   dueDate: dueDate,
      //   title: title,
      //   comments: comments,
      //   priority: priority,
      //   completion: completion,
      //   status: status,
      // });
    });
  });
  // router.post('/updateEdit', function(req, res) {
  //   res.render('edit');
  //   console.log('Hello worls')
  // });
});


// db.close((err) => {
//   if (err) {
//     console.error(err.message);
//   }
//   console.log('Close the database connection.');
// });
module.exports = router;
