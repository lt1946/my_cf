var mongo = require('../config/mongo'),
    mongodb = mongo.db,
    mongourl=mongo.url;


exports.index=function(req,res){
    mongodb.connect(mongourl, function(err, conn){
        conn.collection('ips', function(err, coll){
          object_to_insert = { 'ip': req.connection.remoteAddress, 'ts': new Date() };
          coll.insert( object_to_insert, {safe:true}, function(err){
           // res.writeHead(200, {'Content-Type': 'text/plain'});
            //res.write(JSON.stringify(object_to_insert));
            //res.end('\n');
            var result=JSON.stringify(object_to_insert);
            console.log(result);
            res.render('spider/index', {result:result});
          });
        });
      });
      
  
};