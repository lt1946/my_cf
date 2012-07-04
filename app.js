var app = require('express').createServer();
app.get('/', function(req, res) {
    var result= 'Hello from Cloud Foundry'
        +JSON.stringify(process.env.VCAP_SERVICES)+'\n';
        +JSON.parse(process.env.VCAP_SERVICES)['mysql-5.1'];
    res.send(result);
});
app.listen(process.env.VCAP_APP_PORT || 3000);
