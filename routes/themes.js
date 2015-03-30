
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

