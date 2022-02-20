const express = require("express");
const app = express();
const mysql = require("mysql")
const { login_check, insert_user } = require('./sql_login');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "TestPassword123",
    database: "test"
	
});





con.connect(function(err){
    if (err) throw err;
    console.log("Connected to database successfully.")
})



app.post('/login', async function (req, res) {
	const username = req.body.username;
	const password = req.body.password;
	const user_data = {'username' : req.body.username, "password" : req.body.password};
	const retVal = await login_check(user_data);
	//await runTests();
	res.send(retVal);

});

app.get('/test', (req, res) => {
	
	
	console.log('test');
	res.send("YESSSS");
	
});


//The port you have below hosts it like so: http://localhost:PORT
app.listen(3305, () => {
  console.log("Running server");
});

/*
app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});
*/