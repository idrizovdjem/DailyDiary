const mysql = require('mysql');
require('dotenv').config();
const { v4: uuidv4 } = require('uuid');

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

function registerUser(username, password) {
    return new Promise((resolve, reject) => {
        const uuid = uuidv4();
        pool.query('insert into Users(Username,`Password`,Registered_On,User_Key) values(?,?,CURDATE(),?)',
        [username, password,uuid], (err,res) => {
            if(err) reject(err);

            resolve(uuid);
        });
    });
}

function loginUser(username, password) {
    return new Promise((resolve, reject) => {
        pool.query('Select User_Key from Users Where Username = ? and `Password` = ?',
        [username, password],(err,res) => {
            if(err) reject(err);

            if(res.length === 0) {
                reject(false);
            }
            
            resolve(true);
        })
    });
}

module.exports = {
    checkUsername,
    registerUser,
    loginUser
}