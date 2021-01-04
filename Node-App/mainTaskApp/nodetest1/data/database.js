const sqlite3 = require('sqlite3').verbose();
// const Task = require('./task.js');
var tableString = "";

let sql = `SELECT rowNum as rowNum,
dateTaskEnter as dateTaskEnter,
dueDate as dueDate,
title as title,
comments as comments,
priority as priority,
completion as completion, 
status as status
FROM TaskList`;

let db = new sqlite3.Database('../data/db/dataStored.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected it working database.');
});

// bellow is the function for tasks

// function tasks(tableString) {
//   var tableString = "";
//   var arrayOfTasks = []
//   db.all(sql, arrayOfTasks, (err, rows) => {
//     if (err) {
//       console.error(err.message);
//     }
//     // console.log(rows[3].title)
//     // var tableString = "";
//     for (var i in rows) {
//       var task = rows[i];
//       tableString += "<tr><td>" + task.rowNum
//                   + "</td><td>" + task.dateTaskEnter
//                   + "</td><td>" + task.dueDate
//                   + "</td><td>" + task.title
//                   + "</td><td>" + task.comments
//                   + "</td><td>" + task.priority
//                   + "</td><td>" + task.completion
//                   + "</td><td>" + task.status
//                   + "</tr><tr>"              
//     }
//     // Here is where tableString actually prints I need it to be on the next one!!
//     // table.push(tableString)
//     console.log(tableString)
//     // module.exports = tableString;
//     // return tableString;

//   }); 
// }
// console.log("here " + tableString)

// below is without the function 

var arrayOfTasks = []
db.all(sql, arrayOfTasks, (err, rows) => {
  if (err) {
    console.error(err.message);
  }
  
  // console.log(rows[3].title)
  // var tableString = "";
  for (var i in rows) {
    var task = rows[i];
    // var tableString = "";
    tableString += "<tr><td>" + task.rowNum
                + "</td><td>" + task.dateTaskEnter
                + "</td><td>" + task.dueDate
                + "</td><td>" + task.title
                + "</td><td>" + task.comments
                + "</td><td>" + task.priority
                + "</td><td>" + task.completion
                + "</td><td>" + task.status
                + "</tr><tr>"              
  }
  // Here is where tableString actually prints I need it to be on the next one!!
  // table.push(tableString)
  // console.log(tableString)
  // module.exports = tableString;
  // return tableString;
  module.exports.tableString = tableString;

});
// module.exports = tableString;
// console.log(tableString)
// Just outside of my four loop I will add the object from above into my array 


db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Close the database connection.');
});


