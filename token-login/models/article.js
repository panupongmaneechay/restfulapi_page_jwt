const appConn = require('./connect');
const Promise = require('bluebird');
const sql = require('yesql').mysql


exports.createCartlist = (name, product, amount, address, bu) => {
    return new Promise((resolve, reject) => {
        appConn.connect(bu)
            .then((conn) => {
                let query = sql(
                    "INSERT INTO `list_cart`(`name`, `product`, `amount`, `address`, `date`, `status`) VALUES (:name,:product,:amount,:address,now(),'Waiting')"
                )({
                    name: name,
                    product: product,
                    amount: amount,
                    address: address
                });
                conn.query(query, (err, res) => {
                    if (err) {
                        console.error('Error executing query', err.stack)
                        reject(err);
                    } else {
                        // console.log(res.rows[0]);
                        resolve('Success');
                    }
                    appConn.closeConn(conn)
                })
            })
            .catch((err) => {
                reject(err)
            })
    })
}


exports.updateCartlist = (name, bu) => {
    return new Promise((resolve, reject) => {
        appConn.connect(bu)
            .then((conn) => {
                let query = sql(
                    "UPDATE list_cart SET `status`='Success' WHERE name = :name"
                )({
                    name: name
                });
                conn.query(query, (err, res) => {
                    if (err) {
                        console.error('Error executing query', err.stack)
                        reject(err);
                    } else {
                        // console.log(res.rows[0]);
                        resolve('Update Success');
                    }
                    appConn.closeConn(conn)
                })
            })
            .catch((err) => {
                reject(err)
            })
    })
}

exports.deleteCartlist = (name, bu) => {
    return new Promise((resolve, reject) => {
        appConn.connect(bu)
            .then((conn) => {
                let query = sql(
                    "DELETE FROM list_cart WHERE name = :name"
                )({
                    name: name
                });
                conn.query(query, (err, res) => {
                    if (err) {
                        console.error('Error executing query', err.stack)
                        reject(err);
                    } else {
                        // console.log(res.rows[0]);
                        resolve('Delete Success');
                    }
                    appConn.closeConn(conn)
                })
            })
            .catch((err) => {
                reject(err)
            })
    })
}

exports.getUsername = (username,password, bu) => {
    return new Promise((resolve, reject) => {
        appConn.connect(bu).then((conn) => {
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

