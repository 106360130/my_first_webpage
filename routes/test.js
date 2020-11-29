var express = require('express');
const app = require('../app');
var router = express.Router();



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('你輸入的是'+ req.query.mydata);

});



module.exports = router;
