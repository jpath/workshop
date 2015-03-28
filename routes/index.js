var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Workshop' });
});

router.post('/themes', function(req, res, next) {
  var theme = req.body.theme;
  res.render('themes', {});
  console.log(theme);
});
module.exports = router;
