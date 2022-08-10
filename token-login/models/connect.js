const Promise = require('bluebird');
const appConfig = require('../config/app');
const mysql = require('mysql')
exports.connect = (bu) => {
	return new Promise((resolve, reject) => {
		let connection = mysql.createConnection({
			user: appConfig[bu].user,
			password: appConfig[bu].password,
			host: appConfig[bu].server,
			database: appConfig[bu].DB,
			port: appConfig[bu].port,
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