var app = require('express').createServer();
var config = require('./config');
var path = require('./action/path');

config.init(app);
path.init(app);
app.listen(config.port);

console.log('Server start http://'+config.host+':' + config.port);
