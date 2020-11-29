var express = require('express');
const app = require('../app');
var router = express.Router();



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with user = '+ req.query.user_name+'  mail='+ req.query.user_mail);

});



module.exports = router;
