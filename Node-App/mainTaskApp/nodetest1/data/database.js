const sqlite3 = require('sqlite3').verbose();

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
    module.exports = {
      rows: row,
    };
    console.log(row)
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
