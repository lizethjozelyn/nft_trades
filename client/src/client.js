const WebSocket = require('ws');

const socket = new WebSocket('ws://127.0.0.1:8080')

// event when connection is opened
socket.addEventListener('open', function (event) {
    var input = {'command':'login_check', 'data':{'username' : "test", "password" : "Password111"}}
    socket.send(JSON.stringify(input))
});

// event when there is an error
socket.addEventListener('error', function (event) {
    console.log(event)
})

// event for when a message is received from the server
socket.addEventListener('message', function (event) {

    // print the message from the server
    console.log(event.data);
});