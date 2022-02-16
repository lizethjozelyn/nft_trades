const WebSocket = require('ws');
const { login_check, insert_user } = require('./sql_login');

const wss = new WebSocket.Server({ port: 8080 });

// event when a socket connects to the server
wss.on('connection', function connection(ws) {
    // event when a message is sent over the socket
    ws.on('message', function incoming(message) {
        var input = JSON.parse(message)
        if (input.command) processCommand(ws, input.command, input.data)
    });
});

// processes different inputs from the client
async function processCommand(ws, command, data) {
    if (command === 'login_check' && data.username && data.password) {
        result = await login_check(data)
        if (result) ws.send("Successfully logged in!")
        else ws.send("Unsuccessful Login")
    }

    else if (command === 'new_user' && data.username && data.password) {
        result = await insert_user(data)
        if (result) ws.send("Successfully created new account")
        else ws.send("Username already exists")
    }
    else {
        ws.send('Incorrect data format')
    }
}
