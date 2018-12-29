const mongoose = require("mongoose");
// Connect to mongodb

mongoose.connect("mongodb://localhost/testaroo",{ useNewUrlParser: true });

mongoose.connection.once('open' , function(){
    console.log("Connection has been made , now creat fireworks..")
}).on('error', function(error){
    console.log('Connection error:', error)
});