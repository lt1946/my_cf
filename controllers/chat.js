var db = require('../config').db;

exports.login = function(req, res, next) {
	 res.render('login');
//    db.query('select * from todo order by finished asc, id asc limit 50', function(err, rows) {
//        if(err) return next(err);
//        res.render('index', {todos: rows});
//    });
};