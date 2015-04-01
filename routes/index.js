var express = require('express');
var router = express.Router();
var themes = require('./themes');
var activities = require('./activities');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Workshop' });
});

router.get('/themes', themes.list);
router.post('/themes', themes.add);
router.get('/activities', activities.list);
router.post('/activities', activities.add);
module.exports = router;
