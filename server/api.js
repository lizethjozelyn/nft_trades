
const express = require("express");
const app = express();
const { db_connect, login_check, insert_user, get_users, get_user_images, get_all_images, get_group, six_rand_images, get_all_group_names, get_cookie_login } = require('./sql_login');
var cors = require('cors');

app.use(cors());
app.use(express.json()); // if missing, will cause:  Cannot read properties of undefined (reading 'username')


db_connect();
//API Calls ***************************************************************************

app.post('/login', async function (req, res) {
	const username = req.body.username;
	const password = req.body.password;
	const user_data = {'username' : req.body.username, "password" : req.body.password};
	const retVal = await get_cookie_login(user_data);
	//await runTests();
	res.send(retVal);

});

app.post('/register', async function (req, res) {
	const username = req.body.username;
	const password = req.body.password;
	const user_data = {'username' : req.body.username, "password" : req.body.password};
	const retVal = await insert_user(user_data);
	//await runTests();
	res.send(retVal);

});

app.post('/getimage', async function (req, res) {
	const username = req.body.username;
	const retVal = await get_user_images(username);
	//await runTests();
	res.send(retVal);
});

app.post('/getgroup', async function (req, res) {
	const group = req.body.group;
	const retVal = await get_group(group);
	//await runTests();
	res.send(retVal);
});
//create a routes file for axios to call so we don't hardcode api url
app.post('/upload', async function (req, res) {

	console.log('test');

});

app.get('/test', (req, res) => {
	
	
	console.log('test');
	res.send("YESSSS");
	
});

app.get('/search/user', async function (req, res)  {
	
	console.log(await get_users());
	res.send(await get_users());
});

app.get('/search/name', async function (req, res)  {
	
	console.log(await get_all_images());
	res.send(await get_all_images());
});

app.get('/search/group', async function (req, res)  {
	

	res.send(await get_all_group_names());
});

app.get('/search/random', async function (req, res)  {
	
	console.log(await six_rand_images());
	res.send(await six_rand_images());
});


//The port you have below hosts it like so: http://localhost:PORT
app.listen(3305, () => {
  console.log("Running server");
});