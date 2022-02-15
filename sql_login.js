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

var con = mysql.createConnection({
    host: "localhost",
    user: "test",
    password: "TestPassword123",
    database: "test"
});





con.connect(function(err){
    if (err) throw err;
    console.log("Connected to database successfully.")
})


/*
const pool = mysql.createPool(config);
async function query (sql, params) {
    console.log(await pool.execute(sql, params));
    //return rows;
}
*/

/*
async function execute_query(sql_arg, var_args = null){
    con.query(sql_arg, [var_args], (error, results, fields) =>{
        if(error){
            return console.error(error.message);
        }
        //console.log(results);
        console.log("test");
    });
}
*/

async function execute_query(sql_arg, var_args = null){
    con.query(sql_arg, (error, results, fields) =>{
        if(error){
            return console.error(error.message);
        }
        return results;
    });
}






//encryption (we'll have to hide some of this)
//const INIT = Buffer.alloc(16,0);
//const ALG = "aes-256-cbc";
const SALT_ROUNDS = 10;

async function encrypt_user(data){
    return new Promise((resolve, reject) => {
        bcrypt.hash(data['password'], SALT_ROUNDS, function(err, secure_password){
            return resolve([data['username'], secure_password]);
        });
    });
}

async function insert_user(user){
    var user_2 = await encrypt_user(user);
    //console.log(user_2);
    execute_query("INSERT INTO users VALUES(?, ?)", user_2);
}

async function login_check(user_data){

    results = await execute_query("SELECT * FROM users WHERE user_id = ?", user_data['username']);

    return await bcrypt.compare(user_data['password'], results[0]['user_pass']);

}

//https://www.tabnine.com/code/javascript/functions/mysql/Connection/query
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



async function main(){
    //argh = await execute_query("SELECT * FROM users");

    console.log(await login_check({'username' : "test", "password" : "Password"}));
    console.log(await login_check({'username' : "test", "password" : "NotThePassword"}));
    //insert_user({'username' : "test", "password" : "Password"});
    //var argh = await execute_query("SELECT * FROM  users");
    //console.log(argh);
    

}



module.exports = {
    execute_query,
    insert_user,
    login_check
};

main();