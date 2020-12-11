var express = require('express');
var router = express.Router();
var request = require('sync-request');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(read_sensor());

});

/* POST users listing. */
router.post('/', function(req, res, next) {
  create_sensor(req.body.mydata2);
  res.send('received data='+req.body.mydata2);
});

///////////////////////////////////////////////////////////////////
function create_sensor(name){
  headers = {
    'X-M2M-Origin': 'admin:admin',
    'Content-Type': 'application/xml;ty=2'
  }
  xml=
`<m2m:ae xmlns:m2m="http://www.onem2m.org/xml/protocols" rn="${name}" >
  <api>app-sensor</api>
  <lbl>Type/sensor Category/temperature Location/home</lbl>
  <rr>false</rr>
</m2m:ae>`
  var res = request('POST', '	http://127.0.0.1:8080/~/mn-cse' , {headers:headers , body:xml});
  console.log(res.getBody('utf-8'));
}
function read_sensor(){
  headers = {
    'X-M2M-Origin': 'admin:admin',
    "Accept": "application/json"
  }
  var res = request('GET', 'http://localhost:8080/~/mn-cse?rcn=5&lvl=1' , {headers:headers });
  console.log( JSON.parse(res.getBody('utf-8'))['m2m:cb']['ch'])
  return res.getBody('utf-8')
}
/////////////////////////////////////////////////////////////////////////

read_sensor()



module.exports = router;
