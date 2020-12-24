var express = require('express');
// const { database } = require('sqlite3');
const taskList = require('../data/database');

var router = express.Router();
var myTitle = 'My first web app 2';
var myMessage = 'This is to test message';
var myComment = 'this is my comment';
// const firstRow = tasksLists;

console.log(taskList)
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: myTitle,
    message: myMessage,
    comment: myComment, 
  });
  // res.send('<html><body>Hello</body></html>')
  // res.send('<html><body>'+myMessage+'</body></html>')
});


module.exports = router;
