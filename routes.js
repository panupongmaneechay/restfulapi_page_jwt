const token_login = require('./token-login/routes/routes');

module.exports = (app) => {
	app.use("/token",token_login);
}
