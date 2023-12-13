const express=require('express');
const app=express();
const mongoose=require('mongoose');
const cors=require('cors');
const session=require('express-session');
var jwtlib=require('jsonwebtoken');
var username;
 
//Kore Ai User Bot
//--------------------------------------------------------------//
app.get('/sts', (req, res) => {

   
   const authHeader = req.headers.authorization;
   let tokensts=authHeader.split(" ").pop();
   
   let ds=jwtlib.decode(tokensts);
   console.log(ds);
   console.log(ds.user.username);
   let emaildata=ds.user.username
    res.set( {
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin":"*",
    "Access-Control-Allow-Headers":"*",
    "Access-Control-Allow-methods":"*"});
    const jwt = generateJWTForOTTBot(emaildata);
    data = {
    jwt:jwt
    };

    res.send(JSON.stringify(data));
   })


   function generateJWTForOTTBot(emaildata){
    
    const payload = {
      "iat": (new Date().getTime())/1000,
      "exp": (new Date().getTime())/1000+86400,
        "aud": "https://idproxy.kore.ai/authorize",
        "iss": "cs-fd313e7c-67be-5cc2-b8ee-e3662cb5030b",
      "sub": emaildata
    }
    const secret = "LDvjcfa5xvHD3hyYAPzaeI9b6L8H+Y0s8OdXq+84+cM=";
    var token = jwtlib.sign(payload, secret);
    return token;
  }

  //----------------------Kore Ai Admin Bot----------------------------------//

  app.get('/stsadmin', (req, res) => {

    const authHeaders = req.headers.authorization;
    let tokensts=authHeaders.split(" ").pop();
    
    let dsa=jwtlib.decode(tokensts);
    console.log(dsa);
    console.log(dsa.user.username);
    let emaildatas=dsa.user.username;
    console.log(emaildatas);

    res.set( {
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin":"*",
    "Access-Control-Allow-Headers":"*",
    "Access-Control-Allow-methods":"*"});
    const jwt = generateadminJWTForOTTBot(emaildatas);
    data = {
    jwt:jwt
    };
    res.send(JSON.stringify(data));
   })


   function generateadminJWTForOTTBot(emaildatas){
    
    const payload = {
      "iat": (new Date().getTime())/1000,
      "exp": (new Date().getTime())/1000+86400,
        "aud": "https://idproxy.kore.ai/authorize",
        "iss": "cs-47cfa4e7-76f1-567c-8a50-b54ce0065b98",
      "sub": emaildatas
    }
    const secret = "zKzvUx4ZojNo4wExWaspxr8lViDvhqCk4+G2yE46DbU=";
    var token = jwtlib.sign(payload, secret);
    return token;
  }

  //-----------------------------------------------------------------//

const routes=require('./routes/orderRoutes')
const cakeroutes=require('./routes/cakeRoutes')
const userroutes=require('./routes/userRoutes')
app.use('/',express.static('./public'))
app.use('/kore/libs',express.static('./kore/libs'))
app.use('/kore/UI/libs',express.static('./kore/UI/libs'))
app.use('/kore/UI',express.static('./kore/UI'))
app.use('/cake',express.static('./cake_mange/public'))
app.use('/kore',express.static('./kore'))

//Admin Bot
app.use('/koreadmin/libs',express.static('./koreadmin/libs'))
app.use('/koreadmin/UI/libs',express.static('./koreadmin/UI/libs'))
app.use('/koreadmin/UI',express.static('./koreadmin/UI'))
app.use('/koreadmin',express.static('./koreadmin'))


app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cors());


app.use(routes);
app.use(cakeroutes);
app.use(userroutes);


mongoose.connect("mongodb://localhost:27017/bakery")
.then(()=>{
    console.log("Mongo DB Connection Successs");
    app.listen(3000,()=>{
        console.log("Node listening to port 3000");
    })
}
).catch(()=>{
    console.log("Error occured while connecting to mongod");
})

module.exports=app;

