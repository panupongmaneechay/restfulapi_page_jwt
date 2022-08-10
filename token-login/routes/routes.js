const express = require('express');
const router = express.Router();

const token_auth = require('../controllers/token');
const token_verify = require('../middleware/auth');
const article = require('../controllers/article');
//get token 
router.post('/v1/auth', token_auth.tokenAuth);
//get post Article
router.get('/v1/article/get',token_verify.verifyToken, article.getArticle);

module.exports = router;