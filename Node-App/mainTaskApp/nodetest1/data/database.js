const sqlite3 = require('sqlite3').verbose();
const Task = require('./task.js');
// const typesTask = []

// let taskA = new Task( )

// console.log(taskA[0])
// let taskA = new Task(1,2020-11-18,2020-11-18,'start','war','easy','finish','completed');
// let taskB = new Task(5,2020-11-20,2022-11-18,'avengars','time travel','hard','not finish','improgress');

// function typeTask(row) {
      
// }
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
    // console.log(row.comments)

    let taskList = new Task(row.rowNum,row.dateTaskEnter,row.dueDate,row.title,row.comments,row.priority,row.completion,row.status);
    // console.log(taskList)
    // module.exports = taskList
    // console.log(taskList)
    module.exports.taskList = taskList;


    // typesTask.push(row)

    // console.log(typesTask)
    // var arr2 = [];
    // arr2.push(row);
    // console.log(row)
    // module.exports = arr2
    // console.log(arr2)
    // console.log(row)
    // return row
    // module.exports = {
    //   rows: row,
    // };
    // console.log(row.comments)
    // arr2.push(row.rowNum + "\t" +
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



// module.exports = arr2

db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Close the database connection.');
});
