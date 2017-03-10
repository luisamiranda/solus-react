var express = require('express');
var router = express.Router();

router.use(function(req, res, next){
  console.log(req.body);
  next();
});


module.exports = router;