const express = require('express');
//const session = require('express-session');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const path = require('path');

const app = express();

app.set('view engine', 'html');

app.use(morgan("dev"));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, './public')));

app.use('/', require('./routes/index'));

app.listen(5050, function(req, res, next){
    console.log("solus listening 5050");
});