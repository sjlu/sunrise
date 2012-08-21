require('child_process').exec('grunt');

var express = require('express');
var app = express();

app.configure(function(){
   app.use(express.static(__dirname + '/public'));
   app.use(express.logger());
   app.use(app.router);
});

app.listen(8000);
