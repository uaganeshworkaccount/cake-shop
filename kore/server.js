// Variables
var path = require('path');
var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var jwtlib=require('jsonwebtoken');
//Configure port
var port=3000;

//App directories
var PROJECT_DIR = path.normalize(__dirname);

app.use('/',express.static(path.join(PROJECT_DIR, '')));



http.listen(port, function(){
    console.log('Sample Application runnning at http://localhost:'+port+'/UI');
});

app.get('/sts', (req, res) => {
    res.set( {
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin":"*",
    "Access-Control-Allow-Headers":"*",
    "Access-Control-Allow-methods":"*"});
    const jwt = generateJWTForOTTBot();
    data = {
    jwt:jwt
    };
    res.send(JSON.stringify(data));
   })


   function generateJWTForOTTBot(){
    const payload = {
      "iat": (new Date().getTime())/1000,
      "exp": (new Date().getTime())/1000+86400,
        "aud": "https://idproxy.kore.ai/authorize",
        "iss": "cs-fd313e7c-67be-5cc2-b8ee-e3662cb5030b",
      "sub": "ganesh@gmail.com"
    }
    const secret = "LDvjcfa5xvHD3hyYAPzaeI9b6L8H+Y0s8OdXq+84+cM=";
    var token = jwtlib.sign(payload, secret);
    return token;
  }


