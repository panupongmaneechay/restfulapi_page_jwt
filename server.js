const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const morgan = require('morgan');
const app = express();
const upload = multer();

process.env.TZ = "Asia/TH";
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.text());
app.use(upload.array()); 
// app.use(express.static('public'));

const route = require('./routes')(app);
let port = "8081"
app.listen(port, () => {
	console.log(`Starting server on http://localhost:${port}`);
});
