const Promise = require('bluebird');
// const appConfig = require('../../config/configdb.json');
const mysql = require('mysql')
exports.connect = () => {
	return new Promise((resolve, reject) => {
		let connection = mysql.createConnection({
			// user: appConfig[bu].user,
			// password: appConfig[bu].password,
			// host: appConfig[bu].server,
			// database: appConfig[bu].DB,
			// port: appConfig[bu].port,
			user: "root",
			password: "melfindos009",
			host: "127.0.0.1",
			database: "article",
			port: "3306",
			max: 10,
			min: 0,
			idleTimeoutMillis: 30000
		});
		//console.log(connection)
		resolve(connection)
	});
};

exports.closeConn = (conn) => {
	console.log('end')
	conn.end();
};