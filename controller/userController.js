var jwt=require('jsonwebtoken');
const Users=require('../model/Users.js');
const { sign } = require("jsonwebtoken");
const { hash, compare } = require("bcryptjs");

// const set=require('../public/index.html')

// exports.logindd = async (req, res) => {
//     const { username, password } = req.body;

//     try {
//       const user = await Users.findOne({ username }).lean();
//       if (!user) return res.status(200).json({message:"Invalid username"});
//       if(password!=user.password){
//         return res.status(200).send({message:"Invalid password"});
//       }
     
//       console.log(user.role);

//       if(user.role=='user')
//       {
//           // res.status(301);
//           let responseuser={username:user.username,role:user.role}
       
         
//           let token=jwt.sign(responseuser,"secret",{expiresIn:86400});
//           res.status(200).send({auth:"success",token:token})
//           // res.redirect('/user.html')
          
//       }

//       if(user.role=='admin')
//       {
       
//         res.redirect('../cake/viewcake.html')

//       }
      
//     } catch (error) {
//       return res.status(500).send(error.message);
//     }
//   };

  exports.logout = async (req, res) => {
      
      res.redirect('/index.html')

  };

  //LOginUSing jWT
  exports.login = async (req, res, next) => {
    const { username,password,email } = req.body;
    try {
      // const user = await Users.findOne({ username }).lean();
      // if (!user) return res.status(404).send("Invalid credentials");
      //-------------------------------------------------------------//
      const usernamecheck = await Users.findOne({ username }).lean();
      const useremail=await Users.findOne({ email }).lean();

      if(!usernamecheck && !useremail){
        return res.status(404).send("Invalid credentials");
      }
      else if(usernamecheck)
      {
        console.log("Entered user name");
        const user=usernamecheck;
       const isMatch = await compare(password, user.password);
       if (!isMatch) return res.status(400).send("Invalid credentials");
        // if(password!=user.password)
        // {
        //   return res.status(400).send("Invalid password");
        // }
        if(user.role=="user")
        {
        const token = sign({ user }, "secret", { expiresIn: 360000 });
        return res.status(200).json({ token, user: { ...user, password: null } ,role:user.role ,username:user._id });
        }

        if(user.role=="admin")
        {
          const token = sign({ user }, "secretadmin", { expiresIn: 360000 });
          return res.status(200).json({ token, user: { ...user, password: null } ,role:user.role ,username:user._id });
        }
      }

      else if(useremail)
      {
        console.log("Entered user email");
        console.log(useremail);
        const user=useremail;
        const isMatch = await compare(password, user.password);
       if (!isMatch) return res.status(400).send("Invalid credentials");
        // if(password!=user.password)
        // {
        //   return res.status(400).send("Invalid password");
        // }
  
        const token = sign({ user }, "secret", { expiresIn: 360000 });
        return res.status(200).json({ token, user: { ...user, password: null } ,role:user.role ,username:user._id});
      }
      

      
      // if (user.role !== "user")
      //   return res.status(404).send("Invalid credentials..");
      // const isMatch = await compare(password, user.password);
      // if (!isMatch) return res.status(400).send("Invalid credentials");

      // if(password!=user.password)
      // {
      //   return res.status(400).send("Invalid password");
      // }

      // const token = sign({ user }, "secret", { expiresIn: 360000 });
      // return res.status(200).json({ token, user: { ...user, password: null } ,role:user.role ,username:user._id });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  };
  
  //Register
  exports.register = async (req, res, next) => {
    const { name, email, username, password } = req.body;
    console.log(name,email,username,password);
    if(!name || !email || !username || !password)
      return res.status(400).send("Please fill in all the required fields!")
    try {
      const userObj = { name, email, username,password  };
      const hashedPwd = await hash(password, 12);
      userObj.password = hashedPwd;
      const user = await new Users(userObj).save();
      const token = sign({ userObj }, "secret", { expiresIn: 360000 });
      return res
        .status(201)
        .json({ token, user: { ...user._doc, password: null }});
    } catch (error) {
      return res.status(500).send(error.message);
    }
  };


  exports.checkUser=async (req,res,next)=>{
    
    res.status(200).send({message:"hello"})

  }

  exports.userExist=async (req,res,next)=>{
    
    const username=req.body.username;
    console.log("username",username);
    const usernamecheck = await Users.findOne({ username }).lean();
    if(usernamecheck)
    {
      res.status(200).send({message:"exist"})
    }
    else{
      res.status(200).send({message:"available"})
    }


  }

  exports.emailExist=async (req,res,next)=>{
    
    const email=req.body.email;
    console.log("email",email);
    const emailcheck = await Users.findOne({ email }).lean();
    if(emailcheck)
    {
      res.status(200).send({message:"exist"})
    }
    else{
      res.status(200).send({message:"available"})
    }


  }