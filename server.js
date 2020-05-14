// Importing Express Framework
const express = require('express');
// Importing Body Parser Module
const bodyParser = require('body-parser');
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

// Create a message array to emulate for frontend (This has to be served by the database in next step)
var messages = [
    {name:"Parul", text:"How're you doing?"},
    {name:"Aman", text:"I'm fine. Thank You!"}
]

// Routing for /messages route - if we receive a GET request, send the messages (API for message to use in frontend)
app.get('/messages', (req, res)=>{
    res.send(messages);
})
// // Routing for /messages route - if we receive a POST request, get the data in the messages form (API for message to use in frontend)
app.post('/messages', (req, res)=>{
    messages.push(req.body);
    res.sendStatus(200);
    io.emit('new_message', req.body)
})
// using event hook on socket instance in server.js
io.on('connection', (socket)=>{
	console.log('A user was just connected');
});
// Create a server event on port 3000
var server = http.listen(3000, ()=>{
    console.log("Server is running on 127.0.0.1:", server.address().port);
});