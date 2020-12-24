const sqlite3 = require('sqlite3').verbose();
const Task = require('./task.js');

// let taskA = new Task(1,2020-11-18,2020-11-18,'start','war','easy','finish','completed');
// let taskB = new Task(5,2020-11-20,2022-11-18,'avengars','time travel','hard','not finish','improgress');

// var arr2 = [];
// arr2.push(row);

// console.log(arr2);
// let task = new Task();

// open the database
let db = new sqlite3.Database('./db/dataStored.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected it working database.');
});

db.serialize(() => {
  db.each(`SELECT rowNum as rowNum,
                  dateTaskEnter as dateTaskEnter,
                  dueDate as dueDate,
                  title as title,
                  comments as comments,
                  priority as priority,
                  completion as completion, 
                  status as status
           FROM TaskList`, (err, row) => {
    if (err) {
      console.error(err.message);
    }
    var arr2 = [];
    arr2.push(row);
    console.log(row)
    module.exports = arr2
    // console.log(arr2)
    // console.log(row)
    // return row
    // module.exports = {
    //   rows: row,
    // };
    // console.log(row)
    // console.log(row.rowNum + "\t" +
    // row.dateTaskEnter + "\t" + 
    // row.dueDate + "\t" + 
    // row.title + "\t" + 
    // row.coments + "\t" + 
    // row.priority+ "\t" + 
    // row.completion+ "\t" + 
    // row.status
    // );
  });
});

db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Close the database connection.');
});
