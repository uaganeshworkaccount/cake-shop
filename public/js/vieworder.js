function displayOrders(){
  
 
  let token=localStorage.getItem("credentials")
  const url = "http://localhost:3000/ordersadmin";
  fetch(url, {method: "GET",headers:{'Authorization':`Bearer ${token}`,'Content-Type':'application/json'}})
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network Response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      
       let length = data.length;
       console.log("length=", length);
        console.log(data);
        let content=`<table class="modern-table">
        <thead>
        <tr>
        <th>Customer Name</th>
        <th>Contact Number</th>
        <th>Ordered Item</th>
        <th>Quantity</th>
        <th>Status</th>
        <th>Change Status</th>
        </tr>
        </thead>
        <tbody>`;
        console.log(data.status);
        for (i = length - 1; i >= 0; i--) 
        {
          if(data[i].status=='Order Recieved')
          {
          content+= `<tr>
          <td>${data[i].customer_name}</td>
          <td>${data[i].phonenumber}</td>
          <td>${data[i].cake}</td>
          <td>${data[i].quantity}</td>
          <td>${data[i].status}</td>
          <td> 
          <button id="btnn" onclick="delivery('${data[i]._id}')" class='btn edit-btn check' >Change to Delivered</button>
          </td>
          </tr>
          <tr>`;

          }
        }
          content+= `</tbody></table>`;

        
        document.getElementById("generateTable").innerHTML=content;
    })
    .catch((error) => {
      console.log(error.message);
    });
}


function delivery(id){
console.log("updating");

const url = "http://localhost:3000/orders/" + id;
const bodydata=JSON.stringify({status:"Delivered"})
  fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: bodydata,
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
        console.log("updated");
        displayOrders();
    })
    .catch((error) => {
      console.log("error occured in line 264");
    });



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