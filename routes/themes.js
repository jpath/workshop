
/*
 * GET themes listing.
 */

exports.list = function(req, res, next){
  req.db.themes.find().toArray(function(error, themes){
    if (error) return next(error);
    res.render('themes', {
      title: 'Themes',
      themes: themes || []
    });
  });
};
exports.add = function(req, res, next){
  if (!req.body || !req.body.name) return next(new Error('No data provided.'));
  req.db.themes.save({
    name: req.body.name,
    createTime: new Date(),
  }, function(error, theme){
    if (error) return next(error);
    if (!theme) return next(new Error('Failed to save.'));
    console.info('Added %s with id=%s', theme.name, theme._id);
    res.redirect('/themes');
  })
};

exports.show = function(req, res, next){
  if(!req.query || !req.query._id) return next(new Error('No id provided'));
  req.db.themes.findById(req.query._id, function(err, theme) {
    if(err) return next(err);
    res.render('theme', {
      theme: theme
    });
  });
};
