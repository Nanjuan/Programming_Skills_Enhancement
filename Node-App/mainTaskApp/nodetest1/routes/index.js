var express = require('express');
var router = express.Router();
var myTitle = 'My first web app 2';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: myTitle });
});

module.exports = router;
