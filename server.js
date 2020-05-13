// Importing Express Framework
const express = require('express');
// Creating an Express Instance
var app = express();

// Create a message array to emulate for frontend (This has to be served by the database in next step)
var messages = [
    {name:"Parul", text:"How're you doing?"},
    {name:"Aman", text:"I'm fine. Thank You!"}
]

// Routing for /messages route - if we receive a GET request, send the messages (API for message to use in frontend)
app.get('/messages', (req, res)=>{
    res.send(messages);
})

// Tell express to serve the desired static files on this instance
app.use(express.static(__dirname));

// Create a server event on port 3000
var server = app.listen(3000, ()=>{
    console.log("Server is running on 127.0.0.1:", server.address().port);
});