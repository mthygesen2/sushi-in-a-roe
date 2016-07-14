'use strict';

var express = require('express'),
    logger = require('morgan'),
    app = express(),
    jade = require('jade');
var basePath = __dirname + '/../../..';
app.use(logger('dev'));
app.use('/', express.static(basePath));

// 404 handler
app.use(function (req, res, next) {
  try {
    var html = jade.compileFile(basePath + '/src/templates/404.html.jade')({
      queryString: req.query
    });
    res.status(404).send(html);
  } catch (e) {
    next(e);
  }
});

// Local server
app.listen(process.env.PORT || 3040, function () {
  console.log('Listening on http://localhost:' + (process.env.PORT || 3040));
});
//# sourceMappingURL=../source-maps/web/server.js.map
