var app = require('express').createServer();
var b=process.env.VCAP_SERVICES==null;
app.get('/', function(req, res) {
	var result = 'Hello from Cloud Foundry<br>' +
       ( b?'':JSON.stringify(process.env.VCAP_SERVICES) +
        '<br>========================<br>' +
        JSON.stringify(JSON.parse(JSON.stringify(JSON.parse(process.env.VCAP_SERVICES)['mysql-5.1']))[0]['credentials']));
	res.send(result);
});
var port=b?3000:process.env.VCAP_APP_PORT
app.listen(port);
console.log("server running http://localhost:"+port);
