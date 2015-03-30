var express = require('express');
var router = express.Router();
var themes = require('./themes');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Workshop' });
});

router.post('/themes', themes.add);
module.exports = router;
