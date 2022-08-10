const jwt = require('jsonwebtoken');
const users = {"username":"panupong","password":"maneechay"}
const config = require('../../config.json')

exports.tokenAuth = (req, res) => {
    let username = req.body.username;
    let password = req.body.password
    let token = jwt.sign(
        { "user_id": username, password },
        config.secret,
        {
          expiresIn: "2h",
        }
      );
    if(username === users.username && password === users.password){
        res.status(200).json({
            status: true,
            message: "Query Success",
            bearer: token
            
        });
    }
};

