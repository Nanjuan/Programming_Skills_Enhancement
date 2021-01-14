// Create express app
var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('../views/index');
});

// router.post('/delete', function(req, res) {
//   let db = new sqlite3.Database('./data/db/dataStored.db', sqlite3.OPEN_READWRITE, (err) => {
//     if (err) {
//       console.error(err.message);
//     }
//     console.log('Connected it working database.');
//   });

//   let deleteRow = req.body.row;
//   // console.log(req.body.row)

//   // DELETE FROM TaskList WHERE rowNum = 11;
//   newQuery = `DELETE FROM TaskList WHERE oid = ${deleteRow};`
 
//   // console.log(newQuery);
//   db.run(newQuery);
//   db.close((err) => {
//     if (err) {
//       console.error(err.message);
//     }
//     console.log('Close the database connection.');
//   });
  
//   res.redirect('/')
// });

// router.post('/update', function(req, res) {
//   let db = new sqlite3.Database('./data/db/dataStored.db', sqlite3.OPEN_READWRITE, (err) => {
//     if (err) {
//       console.error(err.message);
//     }
//     console.log('Connected it working database.');
//   });
//   db.all(sql, (err, rows) => {
//     if (err) {
//       console.error(err.message);
//     }

//     var dataToSend;
//     var firstName = req.body.firstName;
//     var lastName = req.body.lastName;

//     // spawn new child process to call the python script
//     const python = spawn('python', ['./pythonScripts/script1.py', firstName, lastName]);
    
//     // collect data from script
//     python.stdout.on('data', function (data) {
//         console.log('Pipe data from python script ...');
//         dataToSend = data.toString();
//     });
//     // in close event we are sure that stream from child process is closed
//     python.on('close', (code) => {
//         console.log(`child process close all stdio with code ${code}`);
//         // send data to browser
//         //  res.send(dataToSend)
//         res.render('index', {
//             dataToSend:dataToSend,
//             rows:rows,
//         });
//     }); 
//   });
//   db.close((err) => {
//     if (err) {
//       console.error(err.message);
//     }
//     console.log('Close the database connection.');
//   });
// });



module.exports = router;
