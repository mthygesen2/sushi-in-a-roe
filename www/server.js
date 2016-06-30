var express = require('express'),
    logger = require('morgan'),
    app = express(),
    jade = require('jade');

app.use(logger('dev'));
app.use('/', express.static(__dirname + '/static'));

// 404 handler
app.use(function(req, res, next) {
  try {
    var html = jade.compileFile(__dirname + '/src/templates/404.html.jade')({ queryString: req.query });
    res.status(404).send(html)
  } catch (e) {
    next(e)
  }
});

// Local server
app.listen(process.env.PORT || 3040, function () {
  console.log('Listening on http://localhost:' + (process.env.PORT || 3040))
});
