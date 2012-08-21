var express = require('express');

var app = express();

app.configure(function(){
   app.use(express.static(__dirname + '/public'));
   app.use(express.logger());
   app.use(app.router);
});

var port = process.env.PORT || 5000;
app.listen(port);
