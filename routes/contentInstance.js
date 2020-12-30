var express = require('express');
var router = express.Router();
var request = require('sync-request');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(read_sensor());
});

/* POST users listing. */
router.post('/', function(req, res, next) {
  console.log(req.body);
  creat_DESCRIPTOR_contentInstance(req.body);
  res.send('received data='+req.body.mydata2);
});


function creat_DESCRIPTOR_contentInstance(input){
    headers = {
      'X-M2M-Origin': 'admin:admin',
      'Content-Type': 'application/xml;ty=4'
    }
    //var path = read_sensor_url(AEname)
    //console.log('http://localhost:8080/~'+path)
    xml=
      `<m2m:cin xmlns:m2m="http://www.onem2m.org/xml/protocols">
      <cnf>application/xml</cnf>
      <con>
          &lt;obj&gt;
              &lt;str name=&quot;User_Name&quot; val=&quot;${input.User_Name}&quot;/&gt;
              &lt;str name=&quot;Start_Time&quot; val=&quot;${input.Start_Time}&quot;/&gt;
              &lt;str name=&quot;End_Time&quot; val=&quot;${input.End_Time}&quot;/&gt;
              &lt;str name=&quot;Weight&quot; val=&quot;${input.Weight}&quot;/&gt;
              &lt;str name=&quot;number_of_set&quot; val=&quot;${input.number_of_set}&quot;/&gt;
              &lt;str name=&quot;Calories&quot; val=&quot;${input.Calories}&quot;/&gt;
              &lt;op name=&quot;getValue&quot; href=&quot;/in-cse/in-name/MY_SENSOR/DATA/la&quot;
           in=&quot;obix:Nil&quot; out=&quot;obix:Nil&quot; is=&quot;retrieve&quot;/&gt;
          &lt;/obj&gt;
      </con>
  </m2m:cin>`
    var res = request('POST', `http://localhost:8080/~/mn-cse/mn-name/${input.mydata2}/${input.mydata3}` , {headers:headers , body:xml});
    //var res = request('POST', 'http://localhost:8080/~/mn-cse/CAE447774024' , {headers:headers , body:xml});

    console.log(res.getBody('utf-8'));
  }
  module.exports = router;
