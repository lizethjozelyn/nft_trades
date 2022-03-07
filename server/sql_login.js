var mysql = require('mysql');
var bcrypt = require('bcrypt');
const { promisify } = require('util');
const config = require('config');
const { NULL } = require('mysql/lib/protocol/constants/types');


//Check discord for the configs.
//DO NOT 

const con_vars = config.get("db");
//const con_vars = config.get("localhost");
//const con_vars = config.get("localhost_test");
var con = mysql.createConnection({
    host: con_vars['host'],
    user: con_vars['user'],
    password: con_vars['password'],
    database: con_vars['database'],
    
});


//connect to DB
async function db_connect(){
	var con = mysql.createConnection({
    host: con_vars['host'],
    user: con_vars['user'],
    password: con_vars['password'],
    database: con_vars['database'],
});

    con.connect(function(err){
        if (err) throw err;
        console.log("Connected to database successfully.")
    })
}


const SALT_ROUNDS = 10;

//takes dictionary of username and password
//returns array of username, hashed password
async function encrypt_user(data){
    return new Promise((resolve, reject) => {
        bcrypt.hash(data['password'], SALT_ROUNDS, function(err, secure_password){
            return resolve([data['username'], secure_password]);
        });
    });
}

//inserts user into database
//returns false if user already exists
async function insert_user(user){
    var test = await execute_query("SELECT * FROM users WHERE user_id = ?", user['username'])
    if(test.length !== 0){
        return false;
    }
    var user_2 = await encrypt_user(user);
    await execute_query("INSERT INTO users VALUES(?, ?)", user_2);
    return true;
}

//takes in username and password, returns true if valid user+pass match
//returns false if invalid user or pass
async function login_check(user_data){
    results = await execute_query("SELECT * FROM users WHERE user_id = ?", user_data['username']);
    if(results.length == 0)
        return false;
    return await bcrypt.compare(user_data['password'], results[0]['user_pass']);

}

async function get_users(){
    results = await execute_query("SELECT user_id FROM users");
	console.log(JSON.stringify(results));
    return results;
}

async function check_if_url_exists(url){
    var test = await execute_query("SELECT * FROM images WHERE url = ?", url);
    if(test.length !== 0){
        return false;
    }
}

async function check_if_name_exists(name){
    var test = await execute_query("SELECT * FROM images WHERE image_name = ?", name);
    if(test.length > 0){
        return false;
    }
}




async function add_image(url, name = undefined, group = undefined){

    if(check_if_url_exists(url))
        return false
    if(name){
        if(check_if_name_exists(name))
            return false
    }

    await execute_query("INSERT INTO images (url) VALUES (?)", url);
    if(name)
        await set_image_name(url, name);
    if(group)
        await add_image_to_group(url, group);
}

async function set_image_name(url, name){
    var test = await execute_query("SELECT * FROM images WHERE url = ?", url);
    if(test.length == 0){
        return false;
    }
    var test2 = await execute_query("SELECT * FROM images WHERE image_name = ?", name);
    if(test2.length > 0){
        return false;
    }

    await execute_query("UPDATE images SET image_name = ? WHERE url = ?", [name, url]);
    return true;
}
async function add_image_to_group(url, group){
    var test = await execute_query("SELECT * FROM images WHERE url = ?", url);
    if(test.length == 0){
        return false;
    }
    await execute_query("UPDATE images SET image_group = ? WHERE url = ?", [group, url]);
    return true;
}

async function get_group(group){
    results = await execute_query("SELECT * FROM images WHERE image_group = ?", group);
    if(results.length == 0)
        return null;
    return results;
}


async function add_user_to_image(url, user){
    results = await execute_query("SELECT * FROM users WHERE user_id = ?", user);
    if(results.length == 0)
        return false;
    results = await execute_query("SELECT * FROM images WHERE url = ?", url);
    if(results.length == 0)
        return false;
    await execute_query("UPDATE images SET user_id = ? WHERE url = ?", [user, url]);
    return true;
}

//returns null if user doesn't exist
async function get_user_images(user){
    results = await execute_query("SELECT * FROM users WHERE user_id = ?", user);
    if(results.length == 0)
        return null;
    return await execute_query("SELECT * FROM images WHERE user_id = ?", user);
}

async function get_all_user_data(user){
    results = await execute_query("SELECT * FROM users WHERE user_id = ?", user);
    if(results.length == 0)
        return null;
    return results;
}

async function get_all_images(){
    return await execute_query("SELECT * FROM images");
}


async function get_all_group_names(){
    return await execute_query("SELECT DISTINCT image_group FROM images WHERE image_group IS NOT NULL")
}

async function six_rand_images(){
    var data = await execute_query("SELECT * FROM images ORDER BY RAND()")
    if(data.length > 6)
    {
        return data.slice(0, 6)
    }
    return data
}

async function get_url_from_name(image_name){
    return await execute_query("SELECT url FROM images WHERE image_name = ?", image_name)
}


function convert_to_json(data){
    return JSON.stringify(data);
}

//pretties up con.query, lets you await it
//example:
//await execute query("SELECT * FROM users WHERE user_id = ?", "steve")
//https://www.tabnine.com/code/javascript/functions/mysql/Connection/query
//might move db connection into here, i.e. connect and end connection each query.
function execute_query(sql, args=null) {
    return new Promise((resolve, reject) => {
     con.query(sql, args, (err, results) => {
      if (err) {
       return reject(err)
      }
      return resolve(results)
     })
    })
   }



//add functions to here if you need to call them
module.exports = {
    execute_query,
    insert_user,
    login_check, 
    db_connect,
    get_users,
    add_image,
    add_user_to_image,
    get_user_images,
    add_image_to_group,
    get_group,
    get_all_user_data,
    get_all_images,
    convert_to_json,
    set_image_name,
    get_all_group_names,
    six_rand_images,
    get_url_from_name,
    check_if_name_exists,
    check_if_url_exists
};

    db_connect();
//Comment this bit out if you don't want to run tests
async function runUserTests(){
    //db_connect();
    console.log(await insert_user({'username' : "test", "password" : "Password"}));
    console.log(await insert_user({'username' : "test2", "password" : "Passwordle"}));
    console.log(await login_check({'username' : "test", "password" : "Password"}));
    console.log(await login_check({'username' : "test", "password" : "NotThePassword"}));
    console.log(await login_check({'username' : "notauser", "password" : "NotThePassword"}));
    console.log(await insert_user({'username' : "jack.son", "password" : "Password"}));


    var test = await execute_query("SELECT * FROM  users");
    console.log(test);  
    console.log(convert_to_json(test));
    console.log(await get_all_user_data("test"))
    //con.end();
}

async function runUrlTests(){

    /*
    await add_image("google.com");
    await add_image("yahoo.com");
    await add_image("eggert.com")
    await add_image("smallberg.com");
    await add_image("test.com", "test image 1")
    await add_image("test2.com", "test  image 2", "groupy mc groupface" )

    await add_user_to_image("eggert.com", "test");
    await add_user_to_image("google.com", "test");
    await add_image_to_group("google.com", "search engines");
    await add_image_to_group("yahoo.com", "search engines");
    */

    await add_image("https://i.imgur.com/fjKRYan.jpeg")
    await add_image("https://i.imgur.com/vd14d46.jpeg", "keyboard 2")
    await add_image("https://i.imgur.com/GxBwOSt.jpg", "keyboard 3", "keyboards")

    await add_image("https://i.imgur.com/Wrm0g6Y.jpg")
    await add_image("https://i.imgur.com/cqKvnil.jpg")
    await add_image("https://i.imgur.com/swQRT0Z.png")
    await add_image("https://i.imgur.com/PjVbBYf.png")
    await add_image("https://i.imgur.com/cjNiQSD.jpg")
    await add_image("https://i.imgur.com/HbjRDzC.jpg")
    await add_image("https://i.imgur.com/0Inuc18.png")
    
    await add_image_to_group("https://i.imgur.com/HbjRDzC.jpg", "valorant");


    console.log("should be true: " + await add_image_to_group("https://i.imgur.com/fjKRYan.jpeg", "keyboards"))
    console.log("should be true: " +await add_user_to_image("https://i.imgur.com/fjKRYan.jpeg", "test"))

    console.log("should be false: " +await add_image_to_group("not an image", "keyboards"))
    console.log("should be false: " +await add_user_to_image("https://i.imgur.com/fjKRYan.jpeg", "not a user"))
    console.log("should be false: " +await add_user_to_image("not an image", "user"))
    

    await get_user_images("test");
    await get_group("keyboards");
    await get_all_images();

}

async function runNewTests()
{
    console.log(await set_image_name("https://i.imgur.com/PjVbBYf.png", "valorant image"));
    console.log(await set_image_name("blah", "valorant image 2"));
    console.log(await set_image_name("https://i.imgur.com/fjKRYan.jpeg", "valorant image"));
    console.log(await six_rand_images());
    console.log(await get_all_group_names());
    console.log(await get_url_from_name("keyboard 2"))

}


//runUserTests();
//runUrlTests();
//runNewTests();
//note: you want to run con.end(); at the end of accessing the DB
//I can add that to the end of functions if you'd like, it might slow down
//the code though because it would mean you have to reconnect for each query