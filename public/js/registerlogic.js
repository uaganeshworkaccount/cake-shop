function registerUser() {
  let name = document.getElementById("nameofuser").value;
  let email = document.getElementById("email").value;
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let confirmpassword=document.getElementById("confirmpassword").value;
 
  let ki=""
  if(password!=confirmpassword)
  {
    ki=`<p id="pmessage">Passwords do not match !</p>`
    document.getElementById("passwordmessage").innerHTML=ki;
  }

  console.log(name, email, username, password);

  const link = "http://localhost:3000/register";

  let senddata = JSON.stringify({
    name: name,
    email: email,
    username: username,
    password: password,
  });


  fetch(link, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: senddata,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network Response was not ok");
      }

      if (response.redirected) {
        window.location.href = response.url;
      }
      return response.json();
    })

    .then((data) => 
    {

        // console.log(data);
      if(data.token)
      {
        let content="<p id='custommessage' >Registration Successful</p>"
        document.getElementById('message').innerHTML=content;

        setTimeout(()=>{
          let content="<p id='custommessageredirect' >Redirecting to Login !</p>"
          document.getElementById('message').innerHTML=content;
        },1000)
         
        setTimeout(()=>{
          location.href="./login.html"
        },2000)
        
       
      }


    })
    .catch((error) => {
      console.log(error.message);
    });
}



function checkuser(){
console.log("Check User Running");
let username=document.getElementById("username").value
console.log(username);
if(!username)
{
  console.log("Enter username");
  return false;
}


//checking 
let senddata=JSON.stringify({"username":username})
fetch("http://localhost:3000/userexist", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: senddata,
})
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network Response was not ok");
    }

    if (response.redirected) {
      window.location.href = response.url;
    }
    return response.json();
  })

  .then((data) => 
  {
    let exist="";
    let available="";

    if(data.message=="exist"){
      console.log("exist");
      exist+=`<p id="existmessage">Username already exist ❌</p>`;
      document.getElementById('usermessage').innerHTML=exist;
    }  
     
    else{
      console.log("available");
      available+=`<p id="availablemessage">Username available ✔</p>`;
      document.getElementById('usermessage').innerHTML=available;
    }
    

  })
  .catch((error) => {
    console.log(error.message);
  });




}


//check email

function checkemail(){
  console.log("Check email Running");
  let email=document.getElementById("email").value
  console.log(email);
  if(!email)
  {
    console.log("Enter email");
    return false;
  }
  
  
  //checking 
  let emaildata=JSON.stringify({"email":email})
  fetch("http://localhost:3000/emailexist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: emaildata,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network Response was not ok");
      }
  
      if (response.redirected) {
        window.location.href = response.url;
      }
      return response.json();
    })
  
    .then((data) => 
    {
      let exist="";
      let available="";
  
      if(data.message=="exist"){
        console.log("exist");
        exist+=`<p id="existemail">Email already exist ❌</p>`;
        document.getElementById('emailmessage').innerHTML=exist;
      }  
       
      else{
        console.log("available");
        available+=`<p id="availableemail">Email available ✔</p>`;
        document.getElementById('emailmessage').innerHTML=available;
      }
      
  
    })
    .catch((error) => {
      console.log(error.message);
    });
  
  
  
  
  }


  function passwordmatch(){
    console.log("exec");
    let password = document.getElementById("password").value;
    let confirmpassword=document.getElementById("confirmpassword").value;
   
    if(!confirmpassword)
    {
      document.getElementById("passwordmessage").innerHTML="";
      return false;
    }
    let ki=""
    let gg=""
    if(password!=confirmpassword)
    {
      ki+=`<p id="pmessage">Passwords do not match !</p>`
      document.getElementById("passwordmessage").innerHTML=ki;
    }
    else{

      document.getElementById("passwordmessage").innerHTML=gg;
    }

  }