function createOrder() {
  console.log("create order on progress");
  const customer_name = document.getElementById("customer_name").value;
  const customer_email = document.getElementById("customer_email").value;
  const address = document.getElementById("address").value;
  const phonenumber = document.getElementById("phonenumber").value;
  let cakename = document.getElementById("selectfield");
  let id = cakename.value;
  console.log(id);
  let z = document.getElementById("quantityfield");
  let h = z.value;
  console.log(h);
  //Hiding Image and Description
  let image = document.getElementById("cakeimage");
  image.style.display = "none";
  let description = document.getElementById("cakedescription");
  description.style.display = "none";
  let x = document.getElementById("totalpricefinal");
  x.style.display = "none";

  //Validation
  if (
    customer_name == "" ||
    customer_email == "" ||
    address == "" ||
    phonenumber == "" ||
    h == "" ||
    id == ""
  ) {
    alert("Fill out all the fields");
    return false;
  }

  //email validation
   let pattern=/^[a-zA-Z0-9.-_]+@[a-zA-Z]+.[a-zA-Z]{2,}$/;  

      if (pattern.test(customer_email)) {
        console.log("Email passed");
        
         }
       else {
        alert("Email Format is not Correct")
        return false;
        }

  //phone number validation
  let patterns=/^[9876]{1}[0-9]{9}$/;  
   
         if (patterns.test(phonenumber)) {
           console.log("Phone passed");
           
            }
          else {
           console.log("Phone Number not passed ");
           alert("Phone Number is not Correct")
           return false;
           }
   
  //---------------------------------------------------------------------------------------------//
  //update quantity in cakes table
  let cakeid = document.getElementById("cakeidfortotal").value;
  console.log("cakeid", cakeid);
  console.log("quantity", h);

  //Get method to check current quantity
  const geturl = "http://localhost:3000/cakes/" + cakeid;
  fetch(geturl, { method: "GET" })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network Response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      let uquantity = eval(data.quantity - h);
      console.log("Updated Quantity", uquantity);
      const bb = JSON.stringify({ quantity: uquantity });

      const cakequantityurl = "http://localhost:3000/cakes/" + cakeid;

      fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: bb,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network Response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log("error occured in update quantity catch");
        });
    })
    .catch((error) => {
      console.log(error.message);
    });

  const url = "http://localhost:3000/cakes/" + id;
  fetch(url, { method: "GET" })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network Response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      let finalcakename = data.name;
      let uid=localStorage.getItem("username")
      console.log(
        customer_name,
        customer_email,
        address,
        phonenumber,
        finalcakename,
        
      );

      const bodyData = JSON.stringify({
        customer_name: customer_name,
        customer_email: customer_email,
        address: address,
        phonenumber: phonenumber,
        cake: finalcakename,
        quantity: h,
        cake_id:cakeid,
        user_id:uid
      });

      const url = "http://localhost:3000/orders";

      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: bodyData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network Response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          console.log("order confirmed");
        })
        .catch((error) => {
          console.log("error occured in second catch");
        });
    })
    .catch((error) => {
      console.log(error.message);
    });
  let contentz = `<p class="logmessage" id="orderconfirm">Order Confirmed</p>`;
  document.getElementById("ordermessage").innerHTML = contentz;
  getCakeList();
  ordermessage.style.display = "block";
  setTimeout(() => {
    ordermessage.style.display = "none";
    location.reload();
  }, 1000);
}

//To display cake list in form
function getCakeList() {

  let demo = document.getElementById("totalpricefinal");
  demo.style.display = "none";

  const url = "http://localhost:3000/cakes";
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network Response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      let length = data.length;
      console.log(length);
      let content =
        "<select onchange='getQuantity()' name='cakes'  id='selectfield'><option disabled selected value> Select Cake </option>";
      for (i = 0; i < length; i++) {
        content += `<option value="${data[i]._id}" data-extra="${data[i].name}">${data[i].name}</option>`;
      }
      content += `</select>`;
      document.getElementById("cakename").innerHTML = content;
    })
    .catch((error) => {
      console.log(error.message);
    });
//----------------------------------------------------------------------------------//
  //To display Table Details 94fbr
  let sendurl=localStorage.getItem("username")
  // const link = "http://localhost:3000/orders";
  const link = "http://localhost:3000/orders/cake/"+sendurl;
  let token=localStorage.getItem("credentials")
  fetch(link,{method:'GET',headers:{'Authorization':`Bearer ${token}`,'Content-Type':'application/json'}})
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network Response was not ok");
      }
      
      if(response.redirected){
        window.location.href=response.url;
        }
      return response.json();
    })
    .then((data) => {


      console.log(data);
      let length = data.length;
      console.log("length=", length);
      if(length==0){
        let displayhtml=""
        document.getElementById("generateTable").innerHTML = displayhtml;
      }
      if (length != 0) {
        let displayhtml = `<table class="modern-table">
        <thead>
        <tr>
        <th> Name</th>
        <th>Contact Number</th>
        <th>Ordered Item</th>
        <th>Quantity</th>
        <th>Status</th>
        <th>Actions</th>
        </tr>
        </thead>
        <tbody>`;

        for (i = length - 1; i >= 0; i--) {
          displayhtml += `<tr>
        <td>${data[i].customer_name}</td>
        <td>${data[i].phonenumber}</td>
        <td>${data[i].cake}</td>
        <td>${data[i].quantity}</td>
        
        `;

        if(data[i].status=="Order Recieved"){
          displayhtml +=`<td id="pending">${data[i].status}</td><td><button id="popupfunction-${data[i]._id}" onclick="invokePopup('${data[i]._id}')" class='btn edit-btn check' >Edit</button>
        <button onclick="cancelorder('${data[i]._id}')" id="cancelOrderButton-${data[i]._id}" class="btn delete-btn">Cancel Order</button>
        </td>
        `;
          }else{
            displayhtml +=`<td id="delivered">${data[i].status}</td><td></td>`;
          }
        displayhtml += `</tr><tr></tbody>`;
        // console.log(displayhtml);
        document.getElementById("generateTable").innerHTML = displayhtml;
      }
      }
    })
    .catch((error) => {
      console.log(error.message);
    });

  }
  

function getQuantity() {
  let selected = document.getElementById("selectfield");
  let id = selected.value;
  console.log(id);
  const url = "http://localhost:3000/cakes/" + id;

  fetch(url, { method: "GET" })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network Response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // console.log(data.quantity);
      let content = `<input type='hidden' id="cakeidfortotal" value='${data._id}'/><input type='hidden' id="cakepricefortotal" value='${data.price}'/><select onchange='gettotalPrice()' name='quantity' id='quantityfield'><option disabled selected value>Quantity</option>`;

      for (i = 1; i <= data.quantity; i++) {
        content += `<option value="${i}">${i}</option>`;
      }

      content += `</select>`;
      // console.log(content);
      document.getElementById("quantityname").innerHTML = content;

      //Adding Image
      let imagecontent = `<img id="showcake" src="${data.image_url}"/>`;
      document.getElementById("cakeimage").innerHTML = imagecontent;
      cakeimage.style.display = "block";

      //Description
      let description = ` <p>Specially made ${data.layers} layer ${data.name} <br>with ${data.topping} toppings </p>
        <p>Weight: ${data.weight_kg} KG</p>
        <p>Price: ₹${data.price}</p>`;

      document.getElementById("cakedescription").innerHTML = description;
      cakedescription.style.display = "block";

      //switching off total
      let z = document.getElementById("totalpricefinal");
      z.style.display = "none";

      //switching off background
      let demo = document.getElementById("totalpricefinal");
      demo.style.display = "none";
    })
    .catch((error) => {
      console.log(error.message);
    });
}

//Popup Handling
function invokePopup(id) {
  console.log(id);
  var showPopupButton = document.getElementById(`popupfunction-${id}`);
  var popup = document.getElementById("popup");
  var closePopupButton = document.getElementById("closePopup");
  var popupForm = document.getElementById("popupForm");
  popup.style.display = "block";

  showPopupButton.addEventListener("click", () => {
    popup.style.display = "block";
  });

  closePopupButton.addEventListener("click", () => {
    popup.style.display = "none";
  });

  popupForm.addEventListener("submit", (e) => {
    popup.style.display = "none";
  });

  //Showing The Values on the update form

  const url = "http://localhost:3000/orders/" + id;
  fetch(url, { method: "GET" })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network Response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      document.getElementById("updatename").value = data.customer_name;
      document.getElementById("updateemail").value = data.customer_email;
      document.getElementById("updateaddress").value = data.address;
      document.getElementById("updatephone").value = data.phonenumber;
      document.getElementById("updateitem").value = data.cake;
      document.getElementById("updatequantiy").value = data.quantity;
      document.getElementById("hiddenidvalue").value = data._id;
    })
    .catch((error) => {
      console.log(error.message);
    });
}

//Updating Order Details

function updateOrderDetails() {
  let z = document.getElementById("hiddenidvalue").value;
  console.log(z);


  //Getting Value from form to update
  let updatename = document.getElementById("updatename").value;
  let updateemail = document.getElementById("updateemail").value;
  let updateaddress = document.getElementById("updateaddress").value;
  let updatephone = document.getElementById("updatephone").value;
  let updateitem = document.getElementById("updateitem").value;
  let updatequantiy = document.getElementById("updatequantiy").value;
  let hiddenidvalue = document.getElementById("hiddenidvalue").value;

  // //email validation
   let pattern=/^[a-zA-Z0-9.-_]+@[a-zA-Z]+.[a-zA-Z]{2,}$/;  

   if (pattern.test(updateemail)) {
     console.log("Email passed");
     
      }
    else {
     alert("Email Format is not Correct")
     return false;
     }

//phone number validation
let patterns=/^[9876]{1}[0-9]{9}$/;  

      if (patterns.test(updatephone)) {
        console.log("Phone passed");
        
         }
       else {
        console.log("Phone Number not passed ");
        alert("Phone Number is not Correct")
        return false;
        }

  //Hide details
  //Hiding Image and Description
  let image = document.getElementById("cakeimage");
  image.style.display = "none";
  let description = document.getElementById("cakedescription");
  description.style.display = "none";

  console.log(
    updatename,
    updateemail,
    updateaddress,
    updatephone,
    updateitem,
    updatequantiy,
    hiddenidvalue
  );

  const bodyData = JSON.stringify({
    customer_name: updatename,
    customer_email: updateemail,
    address: updateaddress,
    phonenumber: updatephone,
  });

  const url = "http://localhost:3000/orders/" + hiddenidvalue;

  fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: bodyData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          "Network Response for Update Request on Line 253 was not ok"
        );
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      console.log("details updated");
      var popup = document.getElementById("popup");
      popup.style.display = "none";
    })
    .catch((error) => {
      console.log("error occured in line 264");
    });

  let contentz = `<p class="logmessage" id="detailsmodified">Details Modified Successfully</p>`;
  document.getElementById("ordermessage").innerHTML = contentz;
  ordermessage.style.display = "block";
  getCakeList();
  setTimeout(() => {
    ordermessage.style.display = "none";
  }, 2000);
  event.preventDefault();
}

//Delete Popup

function cancelorder(id) {
  const cancelOrderButton = document.getElementById(`cancelOrderButton-${id}`);
  const confirmationPopup = document.getElementById("confirmationPopup");
  const confirmCancel = document.getElementById("confirmCancel");
  const goBack = document.getElementById("goBack");
  confirmationPopup.style.display = "block";
  cancelOrderButton.addEventListener("click", () => {
    confirmationPopup.style.display = "block";
  });

  confirmCancel.addEventListener("click", () => {
    confirmationPopup.style.display = "none";
  });

  goBack.addEventListener("click", () => {
    confirmationPopup.style.display = "none";
  });

  //Displaying ID on textbox
  document.getElementById("passidfordelete").value = id;
}

//Cancelling order function

function cancelOrder() {
  console.log("Cancel on progress");
  let id = document.getElementById("passidfordelete").value;
  console.log(id);

  const url = "http://localhost:3000/orders/" + id;

  fetch(url, { method: "DELETE" })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network Response for Delete Request  was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Order cancelled successfully");
      getCakeList();
    })
    .catch((error) => {
      console.log("error occured in delete fetch");
    });
  let contentz = `<p class="logmessage" id="detailsmodified">Order Cancelled!</p>`;
  document.getElementById("ordermessage").innerHTML = contentz;
  ordermessage.style.display = "block";
  let im = document.getElementById("cakeimage");
  im.style.display = "none";
  let desc = document.getElementById("cakedescription");
  desc.style.display = "none";
  getCakeList();
  setTimeout(() => {
    ordermessage.style.display = "none";
  }, 2300);
}

function gettotalPrice() {
  console.log("Calculating Total Price");
  let id = document.getElementById("cakeidfortotal").value;
  let price = document.getElementById("cakepricefortotal").value;
  let quantity = document.getElementById("quantityfield").value;
  console.log(id, price, quantity);

  let total = eval(Math.floor(price * quantity));

  console.log(total);

  let ts = `<p>Total: ₹ ${total}</p>`;
  document.getElementById("totalpricefinal").innerHTML = ts;
  let z = document.getElementById("totalpricefinal");
  z.style.display = "block";
}



function logout(){

  console.log("logout");

  localStorage.clear();
  const url = "http://localhost:3000/logout";

  fetch(url, { method: "GET" })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network Response was not ok");
      }
      if(response.redirected){
        window.location.href=response.url;
    }
      return response.json();
    })
    .then((data) => {
     
    console.log(data);
      
    })
    .catch((error) => {
      console.log(error.message);
    });


}
