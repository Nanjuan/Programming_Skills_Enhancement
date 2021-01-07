const express = require('express')
const {spawn} = require('child_process');
const bodyParser = require('body-parser');
const app = express()
const port = 3000

// View engine setup 
app.set('view engine', 'ejs'); 

app.use(bodyParser.urlencoded({ extended: true })); 

// app.post('/', (req, res) =>
app.get('/', (req, res) => {
 
//  var dataToSend;
//  var term = req.query.term; 
//  var second = req.query.second;
// // var third = req.body.third;
// // spawn new child process to call the python script
// // const python = spawn('python', ['script1.py']);
//  const python = spawn('python', ['script1.py', term, second]);
//  // collect data from script
//  python.stdout.on('data', function (data) {
//   console.log('Pipe data from python script ...');
//   dataToSend = data.toString();
//  });
//  // in close event we are sure that stream from child process is closed
//  python.on('close', (code) => {
//  console.log(`child process close all stdio with code ${code}`);
//  // send data to browser
// //  res.render('index', dataToSend)
//  });
res.render('index')
})

app.post('/update', (req, res) => {
 
    var dataToSend;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    // spawn new child process to call the python script
     const python = spawn('python', ['script1.py', firstName, lastName]);
     // collect data from script
     python.stdout.on('data', function (data) {
      console.log('Pipe data from python script ...');
      dataToSend = data.toString();
     });
     // in close event we are sure that stream from child process is closed
     python.on('close', (code) => {
     console.log(`child process close all stdio with code ${code}`);
     // send data to browser
    //  res.send(dataToSend)
    res.send('Your name is "' + dataToSend + '".')
     });
     
    })

app.listen(port, () => console.log(`Example app listening on port 
${port}!`))