# NFT Trading Simulator

This project was created using React, Javascript, MySQL, CSS, and HTML.

## Available Scripts

### Config

You will need to insert the default.json file into /server/config. You may need to create the config folder to do this. The config file should be turned in with the assignment - if unavailable, email a group member from this project.

### Installing node modules

run `npm ci package.json` (or `npm ci .\package.json`) in both the server folder and the client folder to install the necessary packages.

### Starting the API and Client

To run the API needed for the webabb to work, run:

`node api.js`

In the server directory, you can run:

`npm start`

Within the client directory to start the app. If it does not work due to "react-scripts" missing, then run

`npm install react-scripts --save`

to fix it.

Note that you need the config file with the MySQL server info to run this project. The config file should be placed in /server/config. Config file is available upon request - for security reasons, it cannot be uploaded to GitHub

## Configuring the Database

The online database is somewhat unstable, due to a free hosting service being used. If you get connection errors to the online database, you can switch to a local one. This should be unecessary, but instructions are provided as a backup.

### Steps for configuring a local database:

1. Download MySQL community edition (https://www.mysql.com/products/community/) and workbench (https://dev.mysql.com/downloads/workbench/).

2. Install both files - default settings should suffice.

3. Make sure your local server is running (on windows, go to services, select MySQL80, start the process).
 
4. Connect to the database with workbench (it should already have localhost filled in, if it doesn't it should be hostname - localhost, username - root, and the password you set on install of community edition).

5. Use workbench to create a new database called "test" by clicking schema -> right click -> create schema -> name it "test".
  
     Refresh the schema window using the refresh button in workbench, select "test" by double-clicking it, then execute the following SQL code:

   =CREATE TABLE \`images\` (
  \`url\` varchar(64) NOT NULL,
  \`user_id\` varchar(45) DEFAULT NULL,
  \`image_group\` varchar(64) DEFAULT NULL,
  \`image_name\` varchar(64) DEFAULT NULL,
  PRIMARY KEY (\`url\`)
);

    CREATE TABLE \`users\` (
  \`user_id\` varchar(16) NOT NULL,
  \`user_pass\` varchar(64) DEFAULT NULL,
  \`user_hash\` varchar(64) DEFAULT NULL,
  PRIMARY KEY (\`user_id\`)
)


6. modify the config.json file to have your password for the "localhost" config (replace the password, in other words), and modify sql_login.js to use the local database: comment out `const con_vars = config.get("db");` and uncomment `//const con_vars = config.get("localhost");`

7. Run `run_config_tests.js` to fill the database with some test images and users (this also will tell you if your database is working).

8. If you get "ER_NOT_SUPPORTED_AUTH_MODE", use `ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456789';` (replace 123456789 with your password), then run `FLUSH PRIVILEGES`. You may need to restart workbench to make this work.

9. Launch the api as normal.

## Features

### Main Page

Displays a randomized selection of the images on the website.

### Image Buying

Users can "buy" (for free) any image on the website not already owned.

### Image Gifting

Images can be gifted to other users from your profile.

### Image Uploading

Images can be uploaded to the website through an image URL. 

### Multiple Search Features

Available options: search for a user, for an image name, or for an image group.

