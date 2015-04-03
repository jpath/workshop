var express = require('express');
var router = express.Router();
var themes = require('./themes');
var activities = require('./activities');
var cues = require('./cues');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Workshop' });
});

router.get('/themes', themes.list);
router.post('/themes', themes.add);
router.get('/activities', activities.list);
router.post('/activities', activities.add);
router.get('/cues', cues.list);
router.post('/cues', cues.add);
router.get('/theme/:_id?', themes.show);
module.exports = router;
