
exports.add = function(req, res, next){
  if (!req.body || !req.body.theme_id || !req.body.activity_id) return next(new Error('No data provided.'));
  req.db.workshops.save({
    theme_id: req.body.theme_id,
    activity_id: req.body.activity_id,
    createTime: new Date(),
  }, function(error, workshop){
    if (error) return next(error);
    console.info('Added %s with id=%s', workshop.name, workshop._id);
    res.cookie('workshop_id', workshop._id)
    res.redirect('/workshop');
  })
};

exports.show = function(req, res, next) {
  if(req.cookies.workshop_id) {

  }
  req.db.workshops.findById(req.cookies.workshop_id, function(err, workshop) {
    if(err) return(next(err));
    if(!workshop.name) {
      console.info('Got workshop with no name id=%s', workshop._id);
      res.render('new-workshop', {
        workshop: workshop
      })
    } else {
      res.render('workshop', {
        workshop: workshop
      }); 
      }
  });
};

exports.update = function(req, res, next) {
  if (!req.body) return next(new Error('No data provided.'));
  console.log(req.cookies.workshop_id.toString());
  if(!req.cookies.workshop_id) return next(new Error('Workshop not set, cannot update.'));
  req.db.workshops.updateById(req.cookies.workshop_id, 
      {$set: req.body}, 
      function(err, count) {
        if(err) return next(err);
        if(count != 1) return next(new Error('Update failed.'))
        console.log('Updated workshop' + req.cookies.workshop_id);
        res.redirect('/workshop')
      });
};
