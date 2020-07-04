const mysql = require('mysql');
require('dotenv').config();

const pool = mysql.createPool({
    "connectionLimit": 10,
    "host": process.env.SERVER,
    "user": process.env.USER,
    "password": process.env.PASSWORD,
    "database": process.env.DATABASE 
});

function checkUsername(username) {
    return new Promise((resolve, reject) => {
        pool.query('SELECT COUNT(*) FROM Users WHERE Username = ?',[username],
        (err,res) => {
            if(err) reject(err);

            const result = res[0]['COUNT(*)'];
            const resultObj = {"usernameUnique":result == 0};
            resolve(resultObj);
        });
    });
}

module.exports = {
    checkUsername
}