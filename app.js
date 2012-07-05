var app = require('express').createServer();
app.get('/', function(req, res) {
    var result= 'Hello from Cloud Foundry<br>'
        +JSON.stringify(process.env.VCAP_SERVICES)+'<br>'
        +"========================<br>"
        +JSON.stringify(JSON.parse(process.env.VCAP_SERVICES)['mysql-5.1']['credentials']);
    res.send(result);
});
app.listen(process.env.VCAP_APP_PORT || 3000);
