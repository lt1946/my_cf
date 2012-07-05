var todo = require('../controllers/todo');
var chat = require('../controllers/chat');
var spider = require('../controllers/spider');
var socket = require('../controllers/socket');

exports.init=function(app){
	/**
	 * Routing
	 */
	// app.get('/', todo.index);
	
	app.get('/', function(req, res) {
		var result = 'Hello from Cloud Foundry<br>' +
	       ( config.isVcap?JSON.stringify(process.env.VCAP_SERVICES) +
	        '<br>========================<br>' +
	        JSON.stringify(JSON.parse(JSON.stringify(JSON.parse(process.env.VCAP_SERVICES)['mysql-5.1']))[0]['credentials']):'');
		res.send(result);
	});
	app.post('/todo/new', todo.new);
	app.get('/todo/:id', todo.view);
	app.get('/todo/:id/edit', todo.edit);
	app.post('/todo/:id/edit', todo.save);
	app.get('/todo/:id/delete', todo.delete);
	app.get('/todo/:id/finish', todo.finish);
	/*chat*/
	app.get('/chat',chat.login);
    /*spider*/
    app.get('/spider',spider.index);
    /*socket*/
    app.get('/socket',socket.index);
    
    
};