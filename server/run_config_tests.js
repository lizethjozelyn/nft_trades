const sql_login = require('./sql_login');
const config = require('config')
var mysql = require('mysql')


async function runUserTests(){
    console.log(await sql_login.insert_user({'username' : "test", "password" : "Password"}));
    console.log(await sql_login.insert_user({'username' : "test2", "password" : "Passwordle"}));
    console.log(await sql_login.login_check({'username' : "test", "password" : "Password"}));
    console.log(await sql_login.login_check({'username' : "test", "password" : "NotThePassword"}));
    console.log(await sql_login.login_check({'username' : "notauser", "password" : "NotThePassword"}));
    console.log(await sql_login.insert_user({'username' : "jack.son", "password" : "Password"}));


    var test = await sql_login.execute_query("SELECT * FROM  users");
    console.log(test);  
    console.log(sql_login.convert_to_json(test));
    console.log(await sql_login.get_all_user_data("test"))
}


async function runUrlTests(){
    
        //old test code - not needed anymore, but useful for debugging.
    /*
    await sql_login.add_image("https://i.imgur.com/fjKRYan.jpeg")
    await sql_login.add_image("https://i.imgur.com/vd14d46.jpeg", "keyboard 2")
    await sql_login.add_image("https://i.imgur.com/GxBwOSt.jpg", "keyboard 3", "keyboards")

    await sql_login.add_image("https://i.imgur.com/Wrm0g6Y.jpg")
    await sql_login.add_image("https://i.imgur.com/cqKvnil.jpg")
    await sql_login.add_image("https://i.imgur.com/swQRT0Z.png")
    await sql_login.add_image("https://i.imgur.com/PjVbBYf.png")
    await sql_login.add_image("https://i.imgur.com/cjNiQSD.jpg")
    await sql_login.add_image("https://i.imgur.com/HbjRDzC.jpg")
    await sql_login.add_image("https://i.imgur.com/0Inuc18.png")
    
    await sql_login.add_image_to_group("https://i.imgur.com/HbjRDzC.jpg", "valorant");


    console.log(await sql_login.add_image_to_group("https://i.imgur.com/fjKRYan.jpeg", "keyboards"))
    console.log( await sql_login.add_user_to_image("https://i.imgur.com/fjKRYan.jpeg", "test"))
    
    console.log(await sql_login.add_image_to_group("not an image", "keyboards"))
    console.log(await sql_login.add_user_to_image("https://i.imgur.com/fjKRYan.jpeg", "not a user"))
    console.log(await sql_login.add_user_to_image("not an image", "user"))
    

    await sql_login.get_user_images("test");
    await sql_login.get_group("keyboards");
    */
    await sql_login.add_image("https://i.imgur.com/RSuytUC.png", "Shaq's Ape", "GTA: Grand Theft Ape");
    await sql_login.add_image("https://i.imgur.com/4EYC0dx.png", "Post's Ape", "GTA: Grand Theft Ape");
    await sql_login.add_image("https://i.imgur.com/f50uWrA.png", "KSI's Ape", "GTA: Grand Theft Ape");
    await sql_login.add_image("https://i.imgur.com/bq9flIT.png", "Mike's Ape", "GTA: Grand Theft Ape");
    await sql_login.add_image("https://i.imgur.com/TtUJNyW.png", "Steph's Ape", "GTA: Grand Theft Ape");
    await sql_login.add_image("https://i.imgur.com/mzJB7vp.png", "Baby's Ape", "GTA: Grand Theft Ape");
    await sql_login.add_image("https://i.imgur.com/KCjktME.png", "Fallon's Ape", "GTA: Grand Theft Ape");
    await sql_login.get_all_images();
    console.log("done");

}

async function runNewTests()
{
    console.log(await sql_login.set_image_name("https://i.imgur.com/RSuytUC.png", "Shaq's Ape 2"));
    console.log(await sql_login.set_image_name("blah", "not an image"));
    console.log(await sql_login.set_image_name("https://i.imgur.com/fjKRYan.jpeg", "Shaq's Ape 2"));
    console.log(await sql_login.set_image_name("https://i.imgur.com/RSuytUC.png", "Shaq's Ape"));
    console.log(await sql_login.six_rand_images());
    console.log(await sql_login.get_all_group_names());
    console.log(await sql_login.get_url_from_name("Shaq's Ape"));
    await sql_login.add_user_to_image("https://i.imgur.com/RSuytUC.png", "test");

}

sql_login.db_connect();
runUserTests();
runUrlTests();
runNewTests();