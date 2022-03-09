var mysql = require('mysql');
var bcrypt = require('bcrypt');
const { promisify } = require('util');
const config = require('config');
const { NULL } = require('mysql/lib/protocol/constants/types');
const { exec } = require('child_process');


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


async function generate_username_hash(username){
    return new Promise((resolve, reject) => {
        bcrypt.hash(username, 1, function(err, user_hash){
            return resolve(user_hash);
        });
    });
}

async function insert_user_hash(username){
    test = await execute_query("SELECT * FROM users WHERE user_id = ?", [username]);
    if(test.length == 0)
        return NULL;
    user_hash = await generate_username_hash(username);
    await execute_query("UPDATE users SET user_hash = ? WHERE user_id = ?", [user_hash, username]);
    return user_hash;
}

async function get_user_from_hash(hash){
    return await execute_query("SELECT user_id FROM users WHERE user_hash = ?", [hash]);
}

async function get_hash_from_user(username){
    return await execute_query("SELECT user_hash FROM users WHERE user_id = ?", [username]);
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
    if(test.length != 0){
        return true;
    }
    return false;
}

async function check_if_name_exists(name){
    var test = await execute_query("SELECT * FROM images WHERE image_name = ?", name);
    if(test.length != 0){
        return true;
    }
    return false;
}




async function add_image(url, name = undefined, group = undefined){

    if(await check_if_url_exists(url))
        return false

    if(name){
        if(await check_if_name_exists(name))
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

async function get_all_unowned_images(){
    return await execute_query("SELECT * FROM images WHERE user_id IS NULL")
}

async function get_all_owned_images(){
    return await execute_query("SELECT * FROM images WHERE user_id IS NOT NULL")
}

async function six_rand_images(){
    var data = await execute_query("SELECT * FROM images ORDER BY RAND()")
    if(data.length > 6)
    {
        return data.slice(0, 6)
    }
    return data
}

async function ten_images(){
    var data = await execute_query("SELECT * FROM images ORDER BY RAND()")
    if(data.length > 10)
    {
        return data.slice(0, 10)
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
    check_if_url_exists,
    ten_images,
    insert_user_hash,
    get_user_from_hash,
    get_hash_from_user,
    get_all_unowned_images,
    get_all_owned_images
};



async function test_hash(){
    var new_hash = await insert_user_hash("test");
    console.log(new_hash);
    console.log(await get_user_from_hash(new_hash));
    new_hash = await insert_user_hash("adfsadfasfsadf");
    console.log(new_hash);
    console.log(await get_user_from_hash(new_hash));
    console.log(await get_all_unowned_images());
    console.log(await get_all_owned_images());
}

db_connect();
//test_hash();
