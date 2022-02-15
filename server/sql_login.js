var mysql = require('mysql');
var bcrypt = require('bcrypt');
const { promisify } = require('util');

/*
const config = {
    db:{ 
        //move this to somewhere secure for the publication version
        host: "localhost",
        user: "test",
        password: "TestPassword123",
        database: "test"
    }

};
*/

//This should NOT be public - we need to hide it somehow in the final version
var con = mysql.createConnection({
    host: "localhost",
    user: "test",
    password: "TestPassword123",
    database: "test"
});




//connect to DB
async function db_connect(){
    con.connect(function(err){
        if (err) throw err;
        console.log("Connected to database successfully.")
    })
}



/*
const pool = mysql.createPool(config);
async function query (sql, params) {
    console.log(await pool.execute(sql, params));
    //return rows;
}
*/


//encryption (we'll have to hide some of this)
//const INIT = Buffer.alloc(16,0);
//const ALG = "aes-256-cbc";
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
    db_connect
};


//Comment this bit out if you don't want to run tests
async function runTests(){
    db_connect();
    console.log(await insert_user({'username' : "test", "password" : "Password"}));
    console.log(await insert_user({'username' : "test2", "password" : "Passwordle"}));
    console.log(await login_check({'username' : "test", "password" : "Password"}));
    console.log(await login_check({'username' : "test", "password" : "NotThePassword"}));
    console.log(await login_check({'username' : "notauser", "password" : "NotThePassword"}));
    var test = await execute_query("SELECT * FROM  users");
    console.log(test);  
    con.end();
}
runTests();
