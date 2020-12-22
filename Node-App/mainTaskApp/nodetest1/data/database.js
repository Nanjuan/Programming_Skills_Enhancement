const sqlite3 = require('sqlite3').verbose();

// open the database
let db = new sqlite3.Database('../../../python-inject/dataStored.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the dataSotrePythong database.');
});

db.serialize(() => {
  db.each(`SELECT oid as id,
                  title as name
           FROM TaskList`, (err, row) => {
    if (err) {
      console.error(err.message);
    }
    console.log(row.id + "\t" + row.name);
  });
});

db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Close the database connection.');
});