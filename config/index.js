var ejs = require('ejs');
var express = require('express');
var csrf = require('../lib/csrf');
var mysql = new require('mysql');
var db = null;
var isVcap = process.env.VCAP_SERVICES!=null;

exports.vcap = isVcap;

exports.port = isVcap?process.env.VCAP_APP_PORT:3000;
exports.email = 'lt1946@gmail.com';
exports.site_name = 'my_cf';
exports.site_desc = '';
exports.session_secret = 'tsoedsosisession_secretonsheecfrxedta';
var vcapMysql=JSON.parse(JSON.stringify(JSON.parse(process.env.VCAP_SERVICES)['mysql-5.1']))[0]['credentials'];
var db_options =isVcap?{
			host : vcapMysql['host'],
			port : vcapMysql['port'],
			user : vcapMysql['user'],
			password : vcapMysql['password'],
			database : 'todo'
		} :{
			host : 'localhost',
			port : 3306,
			user : 'root',
			password : 'root',
			database : 'todo'
		};
if (mysql.createClient) {
	db = mysql.createClient(db_options);
} else {
	db = new mysql.Client(db_options);
	db.connect(function(err) {
		if (err) {
			console.error('connect db ' + db.host + ' error: ' + err);
			process.exit();
		}
	});
}
exports.db = db;
exports.init = function(app) {
	app.use(express.static(__dirname + '/../public', {
		maxAge : 3600000 * 24 * 30
	}));
	app.use(express.cookieParser());
	app.use(express.bodyParser());
	app.use(express.session({
		secret : this.session_secret
	}));
	/**
	 * Fixed CSRF
	 *  add '<input type="hidden" name="csrf" value="<%- it.csrf %>" />' to form
	 */
	app.use(csrf.check());
	app.dynamicHelpers({
		csrf : csrf.token
	});
	app.helpers({
		config : this
	});
	app.set("view engine", "html");
	app.set("views", __dirname + '/../views');
	app.register("html", ejs);
}
