const express = require('express')
const {spawn} = require('child_process');
const bodyParser = require('body-parser');
const app = express()
const port = 3000

// View engine setup 
app.set('view engine', 'ejs'); 

app.use(bodyParser.urlencoded({ extended: true })); 

// app.post('/', (req, res) =>
app.post('/update', (req, res) => {
 
var dataToSend;
var term = req.body.term;
// spawn new child process to call the python script
 const python = spawn('python', ['script1.py', term]);
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