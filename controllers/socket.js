 var mongo = require('../config/mongo'),
    mongodb = mongo.db,
    mongourl=mongo.url;


exports.index=function(req,res){
    res.render('socket/index');
};