var mysql = require('mysql2');
const Utils = require('./utils/utils.js');

require('dotenv').config();

let Db = {};
 
Db.connect = function() {
    let username = process.env.MYSQL_USERNAME
    let password = process.env.MYSQL_PASSWORD
    let host = process.env.MYSQL_HOST
    let database = process.env.MYSQL_DATABASE

    Db.con = mysql.createConnection({
        host: host,
        user: username,
        password: password,
        database: database
    });

    Db.con.connect(function(err) {
        if (err) throw err;
        Utils.DebugPrint("[DATABASE] Database connected!");
    });
}

Db.connect()

module.exports = Db;
