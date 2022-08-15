const appConn = require('./connect');
const Promise = require('bluebird');
const sql = require('yesql').mysql


exports.getUsername = (username,password) => {
    return new Promise((resolve, reject) => {
        appConn.connect().then((conn) => {
            // console.log(conn)
            let query =  sql("SELECT * FROM user_auth WHERE username = :username AND password = :password")
            // let query =  sql("SELECT * FROM `user_auth` WHERE name=:username AND password= :password")
            ({
                username: username,
                password: password
            });
            
            conn.query(query, (err, res) => {
                if (err) {
                    console.error('Error executing query', err.stack)
                    reject(err);
                } else {
                    resolve(res);
                }
                appConn.closeConn(conn)
            })
        }).catch((err) => {
            reject(err)
        })
    })
}

exports.getArticle = () => {
    return new Promise((resolve, reject) => {
        appConn.connect().then((conn) => {
            // console.log(conn)
            let query =  sql("SELECT * FROM user_article")
            // let query =  sql("SELECT * FROM `user_auth` WHERE name=:username AND password= :password")
            ({})
            
            conn.query(query, (err, res) => {
                if (err) {
                    console.error('Error executing query', err.stack)
                    reject(err);
                } else {
                    resolve(res);
                }
                appConn.closeConn(conn)
            })
        }).catch((err) => {
            reject(err)
        })
    })
}