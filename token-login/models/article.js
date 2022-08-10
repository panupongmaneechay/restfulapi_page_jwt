const appConn = require('../connect');
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

exports.getCartWait = (username, bu) => {
    return new Promise((resolve, reject) => {
        appConn.connect(bu).then((conn) => {
            let query = '';
            if (username !== undefined) {
                query = sql("SELECT * FROM `list_cart` WHERE name=:username AND status= 'Waiting'")({
                    username: username
                });
            } else if (username == undefined) {
                
                query = sql("SELECT * FROM `list_cart` WHERE status= 'Waiting'")();
            }
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

exports.getCartSuccess = (username, bu) => {
    return new Promise((resolve, reject) => {
        appConn.connect(bu).then((conn) => {
            let query = '';
            if (username !== undefined) {
                query = sql("SELECT * FROM `list_cart` WHERE name=:username AND status= 'Success'")({
                    username: username
                });
            } else if (username == undefined) {
                
                query = sql("SELECT * FROM `list_cart` WHERE status= 'Success'")();
            }
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


exports.getStore = (gender,size,category,limits,bu) => {
    return new Promise((resolve, reject) => {
        appConn.connect(bu).then((conn) => {
            let query = '';
            if (gender !== undefined && size == undefined && category == undefined) {
                query = sql("SELECT * FROM `store_a` WHERE gender=:gender LIMIT :limits")({
                    gender: gender,
                    limits: limits
                });
            }else if (gender == undefined && size !== undefined && category == undefined) {
                
                query = sql("SELECT * FROM `store_a` WHERE size=:size LIMIT :limits")({
                    size: size,
                    limits: limits
                });
            } else if (gender == undefined && size == undefined && category !== undefined) {
                var querys = `SELECT * FROM store_a WHERE category = '["`
                querys += `${category}`
                querys += `"]' `
                querys += `LIMIT :limits`
                query = sql(querys)
                ({
                    category: category,
                    limits: limits
                });
            }else if (gender !== undefined && size !== undefined && category == undefined) {
                query = sql("SELECT * FROM `store_a` WHERE size=:size AND gender=:gender LIMIT :limits")({
                    gender: gender,
                    size: size,
                    limits: limits
                });
            }else if (gender !== undefined && size == undefined && category !== undefined) {
                var querys = `SELECT * FROM store_a WHERE gender=:gender AND category='["`
                querys += `${category}`
                querys += `"]' `
                querys += `LIMIT :limits`
                query = sql(querys)
                ({
                    gender: gender,
                    category: category,
                    limits: limits
                });
            }else if (gender == undefined && size !== undefined && category !== undefined) {
                var querys = `SELECT * FROM store_a WHERE size=:size AND category='["`
                querys += `${category}`
                querys += `"]' `
                querys += `LIMIT :limits`
                query = sql(querys)
                ({
                    size: size,
                    category: category,
                    limits: limits
                });
            }else if (gender !== undefined && size !== undefined && category !== undefined) {
                var querys = `SELECT * FROM store_a WHERE size=:size AND gender =:gender AND category='["`
                querys += `${category}`
                querys += `"]' `
                querys += `LIMIT :limits`
                query = sql(querys)
                ({
                    size: size,
                    category: category,
                    gender: gender,
                    limits: limits
                });
            }
            conn.query(query, (err, res) => {
                if (err) {
                    console.error('Error executing query', err.stack)
                    reject(err);
                } else {
                    console.log(res)
                    resolve(res);
                }
                appConn.closeConn(conn)
            })
        }).catch((err) => {
            reject(err)
        })
    })
}