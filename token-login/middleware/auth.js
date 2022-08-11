const jwt = require('jsonwebtoken');
const config = require('../../config.json')

exports.verifyToken = (req, res , next) => {
    let token = req.headers.token
    console.log(token)

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    let decoded = jwt.verify(token, config.secret);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
    return next()
};
        
