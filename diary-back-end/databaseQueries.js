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
                resolve(false);
            }
            else {
                const uuid = res[0]['User_Key'];
                resolve(uuid);
            }
        })
    });
}

function getUserId(uuid) {
    return new Promise((resolve, reject) => {
        pool.query('select Id from Users where User_key = ?',[uuid],
        (err,res) => {
            if(err) reject(err);

            if(res.length === 0) {
                return resolve(false);
            }

            resolve(res[0]['Id']);
        });
    });
}

function getNotes(userId, date) {
    return new Promise((resolve, reject) => {
        pool.query(`select * from Notes where User_Id = ? and Created_On = ? and Is_Deleted = 0`,
        [userId, date],(err,res) => {
            if(err) reject(err);

            if(res.length === 0) resolve({});

            const notes = [];
            for(var i = 0; i < res.length; i++) {
                var note = {
                    'id':res[i]['Id'],
                    'title':res[i]['Title'],
                    'Content':res[i]['Content']
                };
                notes.push(note);
            }

            resolve(notes);
        });
    });
}

async function getInformation(uuid, date) {
    const userId = await getUserId(uuid);
    if(userId === false) {
        return false;
    }

    return new Promise((resolve, reject) => {
        pool.query(`select Mood_Id from UserMoods 
            where User_Id = ? and \`Date\` = ?`,[userId, date],async (err, res) => {
            if(err) reject(err);

            const returnObject = {};

            if(res.length === 0) {
                pool.query(`insert into UserMoods(User_Id, Mood_Id, \`Date\`)
                values(?,?,?)`,[userId, 3, date], (err, res) => {
                    if(err) reject(err);
                });
            }

            returnObject.emotion = res.length === 0 ? 3 : res[0]['Mood_Id'];
            returnObject.notes = await getNotes(userId, date);
            
            resolve(returnObject);
        });
    });
}

async function updateMood(uuid, date, moodIndex) {
    const userId = await getUserId(uuid);
    if(userId === false) {
        return false;
    }

    return new Promise((resolve, reject) => {
        pool.query(`update UserMoods set Mood_Id = ?
        where User_Id = ? and \`Date\` = ?`,[moodIndex, userId, date], (err,res) => {
            if(err) reject(err);

            resolve(true);
        })
    });
}

async function createNote(uuid, date, noteName) {
    const userId = await getUserId(uuid);
    if(userId === false) {
        return false;
    }

    return new Promise((resolve, reject) => {
        pool.query(`insert into Notes(Title,Created_On,User_Id) 
        values(?,?,?)`,[noteName, date, userId],(err,res) => {
            if(err) return err;

            resolve(res);
        });
    });
}

module.exports = {
    checkUsername,
    registerUser,
    loginUser,
    getInformation,
    updateMood,
    createNote
}