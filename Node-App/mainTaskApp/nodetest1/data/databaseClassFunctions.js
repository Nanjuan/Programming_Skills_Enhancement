class Database {
  allTasks() {
    const sqlite3 = require('sqlite3').verbose();
    var tableString = "";
    var arrayOfTasks = []
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
      for (var i in rows) {
        var task = rows[i];
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
      // this.allTasks = tableString
      // it work here but not one index up
      // console.log(tableString)
      // return tableString;
      // module.exports.tableString = tableString;
    });
    // console.log(tableString)
    // console.log('nothing here')
    db.close((err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Close the database connection.');
    });
    // return tableString;

  }
}
// exports database.tableString;
thisRows = new Database();
tableOfAllRows = thisRows.allTasks();

// console.log('final to export ' + tableOfAllRows)

// console.log('this is printing ' + thisRows.allTasks())
// console.log(thisRows.allTasks(tableString))
// module.exports.database = database;
// module.exports.tableString = tableString;
// module.exports = allTasks();
