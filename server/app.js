const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const path = require('path');

const app = express();

module.exports = app
    .set('view engine', 'html')

    .use(morgan("dev"))

    .use(bodyParser.urlencoded({extended: true}))
    .use(bodyParser.json())
    
    .use(express.static(path.join(__dirname, '../public')))

    .use('/github', function(req, res, next){
        res.redirect('https://github.com/luisamiranda/solus-react')
    })
    .use(function(err, req, res, next) {
        console.error(err)
    })

    .listen(5050, function(req, res, next){
        console.log("solus listening 5050")
    })