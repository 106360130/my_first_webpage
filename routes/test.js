var express = require('express');
var router = express.Router();
var request = require('sync-request');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(read_sensor());

});

/* POST users listing. */
router.post('/', function(req, res, next) {
  create_sensor(req.body.mydata);
  creat_DESCRIPTOR_container(req.body.mydata,'DATA')
  creat_DESCRIPTOR_container(req.body.mydata,'DESCRIPTOR')
  creat_DESCRIPTOR_container(req.body.mydata,'ONLINE')


  res.send('received data='+req.body.mydata);
});

/*  post something */

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
  var res = request('POST', 'http://127.0.0.1:8080/~/mn-cse' , {headers:headers , body:xml});
  console.log(res.getBody('utf-8'));
}

function creat_DESCRIPTOR_container(AEname,DCname){
  headers = {
    'X-M2M-Origin': 'admin:admin',
    'Content-Type': 'application/xml;ty=3'
  }
  //var path = read_sensor_url(AEname)
  //console.log('http://localhost:8080/~'+path)
  xml=
	`<m2m:cnt xmlns:m2m="http://www.onem2m.org/xml/protocols" rn="${DCname}">
	</m2m:cnt>`
  var res = request('POST', `http://localhost:8080/~/mn-cse/mn-name/${AEname}` , {headers:headers , body:xml});
  //var res = request('POST', 'http://localhost:8080/~/mn-cse/CAE447774024' , {headers:headers , body:xml});

  console.log(res.getBody('utf-8'));
}

function creat_DESCRIPTOR_contentInstance(AEname,DCname){
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
            &lt;str name=&quot;type&quot; val=&quot;Temperature_Sensor&quot;/&gt;
            &lt;str name=&quot;location&quot; val=&quot;Home&quot;/&gt;
            &lt;str name=&quot;appId&quot; val=&quot;MY_SENSOR&quot;/&gt;
            &lt;op name=&quot;getValue&quot; href=&quot;/in-cse/in-name/MY_SENSOR/DATA/la&quot;
         in=&quot;obix:Nil&quot; out=&quot;obix:Nil&quot; is=&quot;retrieve&quot;/&gt;
        &lt;/obj&gt;
    </con>
</m2m:cin>`
  var res = request('POST', `http://localhost:8080/~/mn-cse/mn-name/${AEname}/${DCname}` , {headers:headers , body:xml});
  //var res = request('POST', 'http://localhost:8080/~/mn-cse/CAE447774024' , {headers:headers , body:xml});

  console.log(res.getBody('utf-8'));
}
///////////////////////////////////////////////

/*read imformation*/

function read_all_sensor(){
  headers = {
    'X-M2M-Origin': 'admin:admin',
    "Accept": "application/json"
  }
  var res = request('GET', 'http://localhost:8080/~/mn-cse?rcn=5&lvl=1' , {headers:headers });
  //console.log( JSON.parse(res.getBody('utf-8'))['m2m:cb']['ch'])
  return JSON.parse(res.getBody('utf-8'))['m2m:cb']['ch']
}
/*
function read_sensor_url(name){
  headers = {
    'X-M2M-Origin': 'admin:admin',
    "Accept": "application/json"
  }
  var res = request('GET', 'http://localhost:8080/~/mn-cse?rcn=5&lvl=1' , {headers:headers });
  var all_sensor = read_all_sensor()
  for (i=1;i<all_sensor.length-1;i++)
  {
    if (name == all_sensor[i].nm)
    {
      //console.log(all_sensor[i])
      return  all_sensor[i].val
    }
  }
}*/
/////////////////////////////////////
//creat_DESCRIPTOR_container('apple','descriptor5')
//creat_DESCRIPTOR_contentInstance('apple','dd')

module.exports = router;
