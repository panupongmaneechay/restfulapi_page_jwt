const auth = require('../middleware/auth')

exports.getArticle = (req, res) => {
        
            res.status(200).json({
                status: true,
                message: "Query Success"
            });
    }

