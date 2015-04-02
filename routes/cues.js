
exports.list = function(req, res, next){
  req.db.cues.find().toArray(function(error, cues){
    if (error) return next(error);
    res.render('cues', {
      title: 'Themes',
      cues: cues || []
    });
  });
};
exports.add = function(req, res, next){
  if (!req.body || !req.body.name) return next(new Error('No data provided.'));
  req.db.cues.save({
    name: req.body.name,
    createTime: new Date(),
  }, function(error, cue){
    if (error) return next(error);
    if (!cue) return next(new Error('Failed to save.'));
    console.info('Added %s with id=%s', cue.name, cue._id);
    res.redirect('/cues');
  })
};

