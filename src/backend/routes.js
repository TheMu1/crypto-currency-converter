var express = require("express");
var app = express();
var path = require("path");


//Static files
app.use(express.static(path.join(__dirname, '..', '../dist/' )));

app.get('*', function(req, res){
    res.sendFile(path.resolve(__dirname, '..', '../dist/index.html'));
});

module.exports = function(){
    return app
};