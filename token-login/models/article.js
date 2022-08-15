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


exports.createArticle = (updateusername,article) => {
    return new Promise((resolve, reject) => {
        appConn.connect().then((conn) => {
            // console.log(conn)
            let query =  sql("INSERT INTO `user_article`(`article`, `updateusername`,`createupdate`) VALUES (:article,:updateusername,now())")
            ({
                updateusername : updateusername,
                article : article
            })
            
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

exports.updateProfile = (fname,lname,tel,email,username,picture) => {
    return new Promise((resolve, reject) => {
        appConn.connect().then((conn) => {
            // console.log(conn)
            let query =  sql("UPDATE `user_auth` SET `picture`= :picture,`fname`=:fname,`lname`= :lname,`email`=:email,`tel`= :tel WHERE username = :username")
            ({
                fname : fname,
                lname : lname,
                tel : tel,
                email : email,
                username : username,
                picture : picture
            })
            
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