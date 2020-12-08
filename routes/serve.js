var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(read_sensor());
});

/* POST users listing. */
router.post('/', function(req, res, next) {
  create_sensor(req.body.mydata2);
  res.send('received data='+req.body.mydata2);
});


module.exports = router;
function XMLhttpGet(theUrl)  // 對m2m GET
{
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
	    console.log(xmlHttp.responseText)
    }

    xmlHttp.open( "GET", theUrl, true); //false for synchronous request
    xmlHttp.setRequestHeader('X-M2M-Origin', 'admin:admin')
    xmlHttp.setRequestHeader('Content-Type', 'application/xml;ty=2')
    xmlHttp.send()
    return xmlHttp.responseText;
}
function read_sensor(){
  headers = {
    'X-M2M-Origin': 'admin:admin',
  }
  var res = request('GET', 'http://localhost:8080/~/mn-cse?rcn=5&lvl=1' , {headers:headers });
  return res.getBody('utf-8')
}
//console.log(XMLhttpGet('http://127.0.0.1:8080/~/mn-cse')) //要收到200 ok

function XMLhttpPost(theUrl,msg)  // 對m2m POST
{
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
	    console.log(xmlHttp.responseText)
    }

    xmlHttp.open( "POST", theUrl, true); //false for synchronous request
    xmlHttp.setRequestHeader('X-M2M-Origin', msg.headers['X-M2M-Origin'] )
    xmlHttp.setRequestHeader('Content-Type', msg.headers['Content-Type'])
    //msg = creat_AE('my_sensor');
    xmlHttp.send(msg.payload)
    return xmlHttp.responseText;
}
function creat_AE(name){
	msg.headers = {};
        msg.headers['X-M2M-Origin'] = 'admin:admin';
	msg.headers['Content-Type'] = 'application/xml;ty=2';
	msg.payload =
	'<m2m:ae xmlns:m2m="http://www.onem2m.org/xml/protocols" rn="'+name+'s">'+
	    '<api>app-sensor</api>'+
	    '<lbl>Type/sensor Category/temperature Location/home</lbl>'+
	    '<rr>false</rr>'+
	'</m2m:ae>';
	return msg;
}

function creat_DESCRIPTOR_container(name){
	msg.headers = {};
        msg.headers['X-M2M-Origin'] = 'admin:admin';
	msg.headers['Content-Type'] = 'application/xml;ty=3';
	msg.payload =
	'<m2m:cnt xmlns:m2m="http://www.onem2m.org/xml/protocols" rn="'+name+'">'+
	'</m2m:cnt>';
	return msg;
}

function creat_content_instance(name){
	msg.headers = {};
        msg.headers['X-M2M-Origin'] = 'admin:admin';
	msg.headers['Content-Type'] = 'application/xml;ty=4';
	msg.payload =
	'<m2m:cin xmlns:m2m="http://www.onem2m.org/xml/protocols" rn="'+name+'">'+
        '<cnf>message</cnf>'+
        '<con>'+
        '&lt;obj&gt;'+
        '&lt;str name=&quot;appId&quot; val=&quot;MY_SENSOR&quot;/&gt;'+
        '&lt;str name=&quot;category&quot; val=&quot;temperature &quot;/&gt;'+
        '&lt;int name=&quot;data&quot; val=&quot;27&quot;/&gt;'+
        '&lt;int name=&quot;unit&quot; val=&quot;celsius&quot;/&gt;'+
        '&lt;/obj&gt;'+
        '</con>'+
        '</m2m:cin>';
	return msg;
}


//console.log(XMLhttpPost('http://127.0.0.1:8080/~/mn-cse/mn-name',creat_AE('Samh2'))) //要收到200 ok
//console.log(XMLhttpPost('http://127.0.0.1:8080/~/mn-cse/mn-name/CAE562841172',creat_DESCRIPTOR_container('Samh_DESCRIPTOR2')))

//console.log(XMLhttpPost('http://127.0.0.1:8080/~/mn-cse/cnt-635825586',creat_content_instance('Samh_contentinstance')))


