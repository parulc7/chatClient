// Importing Express Framework
const express = require('express');
// Importing Body Parser Module
const bodyParser = require('body-parser');
// Importing Mongoose for interacting with MongoDB
const mongoose = require('mongoose');
// Creating an Express Instance
var app = express();

// Creating a HTTP Server Instance on our app for Socket.io to use
var http = require('http').Server(app);
// Passing the server instance to the io instance
var io = require('socket.io')(http);
// Express Middleware Statements -> app.use()
// Tell express to serve the desired static files on this instance
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// MongoDB user credentials (must be hidden in configuration files for production builds)
var db = "mongodb+srv://user:abc123xyz@cluster0-xywnu.mongodb.net/test?retryWrites=true&w=majority";

// Message Model
var MessageModel = mongoose.model('MessageModel', {
    name:String,
    text:String,
});

// Routing for /messages route - if we receive a GET request, send the messages (API for message to use in frontend)
app.get('/messages', (req, res)=>{
    MessageModel.find({}, (err, messages)=>{
        res.send(messages);
    })
})
// // Routing for /messages route - if we receive a POST request, get the data in the messages form (API for message to use in frontend)
app.post('/messages', (req, res)=>{
    var message = MessageModel(req.body);
    message.save((err)=>{
        if(err)
            res.sendStatus(500);
        res.sendStatus(200);
        io.emit('new_message', req.body)
    });
})
// using event hook on socket instance in server.js
io.on('connection', (socket)=>{
	console.log('A user was just connected');
});
// Create a connection to MongoDB 
mongoose.connect(db, {useMongoClient:true, useNewUrlParser:true, useUnifiedTopology:true}, (err)=>{
    console.log("MongoDB Connection Established!!\n", err);
});
// Create a server event on port 3000
var server = http.listen(3000, ()=>{
    console.log(`Server is running on http://127.0.0.1:${server.address().port}`);
});