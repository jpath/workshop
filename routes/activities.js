
exports.list = function(req, res, next){
  req.db.activities.find().toArray(function(error, activities){
    if (error) return next(error);
    res.render('activities', {
      title: 'Activities',
      activities: activities || []
    });
  });
};
exports.add = function(req, res, next){
  if (!req.body || !req.body.name) return next(new Error('No data provided.'));
  req.db.activities.save({
    name: req.body.name,
    createTime: new Date(),
  }, function(error, activity){
    if (error) return next(error);
    if (!activity) return next(new Error('Failed to save.'));
    console.info('Added %s with id=%s', activity.name, activity._id);
    res.redirect('/activities');
  })
};

exports.show = function(req, res, next){
  if(!req.query || !req.query._id) return next(new Error('No id provided'));
  req.db.activities.findById(req.query._id, function(err, activity) {
    if(err) return next(err);
    res.render('activity', {
      activity: activity
    });
  });
};
