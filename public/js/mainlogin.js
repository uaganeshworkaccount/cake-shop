
(function ($) {
    "use strict";

    
    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    
    

})(jQuery);


// FUnction to login 
function LoginUser(){

let username=document.getElementById('username').value;
let password=document.getElementById('password').value;

console.log(username,password);

//Checking with db
const bodyData = JSON.stringify({
   username:username,
   password:password,
   email:username
  });
console.log(bodyData);
  const url = "http://localhost:3000/login";

  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: bodyData,
  })
    .then((response) => {
      if (!response.ok) {
        let content='<p id="message">Invalid Credentials</p>'
        document.getElementById("message").innerHTML=content;
        throw new Error("Network Response was not ok");
        
      }
      if(response.redirected){
          window.location.href=response.url;
      }
      return response.json();
    })
    .then((data) => {
      console.log("data recieved from server",data);
      // let content=`<p id="msg">${data.message}</p>`;
      // document.getElementById('message').innerHTML=content;
      
      localStorage.setItem("credentials",data.token);
      localStorage.setItem("username",data.username);
      localStorage.setItem("nameuser",data.user.name);
      console.log("role",data.role)
      console.log("name",data.user.name)
      if(data.role=="user"){

         location.href="./user.html"
      }

      if(data.role=="admin"){

        location.href="../cake/viewcake.html"
      }
      
    })
    .catch((error) => {
      console.log(error);
    });

  event.preventDefault();








}