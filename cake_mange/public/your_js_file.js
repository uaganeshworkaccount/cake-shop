document.addEventListener('DOMContentLoaded', getCakes);

 

// function getCakes() {

//   console.log("get cakes executed");
//   const cakeTable = document.getElementById('cakeTable');

// ////-----------------------------------------------//

//   const link = "http://localhost:3000/checkUser"
//   let token=localStorage.getItem("credentials")
//   fetch(link,{method:'POST',headers:{'Authorization':`Bearer ${token}`,'Content-Type':'application/json'}})
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Network Response was not ok");
//       }
      
//       if(response.redirected){
//         window.location.href=response.url;
//         }
//       return response.json();
//     })
//     .then((data) => {
//           //Do Nothing
//     })
//     .catch((error) => {
//       console.log(error.message);
//     });


// //--------------------------------------------------//



 

//   fetch('http://localhost:3000/cakes')

//     .then(response => response.json())

//     .then(cakes => {

//       cakeTable.innerHTML = "<tr><th>ID</th><th>Name</th><th>Flavour</th><th>Weight</th><th>Layers</th><th>Price</th><th>Action</th></tr>";

 

//       cakes.forEach(cake => {

//         const row = `<tr>

//           <td>${cake._id}</td>

//           <td>${cake.name}</td>

//           <td>${cake.flavor}</td>

//           <td>${cake.weight}</td>

//           <td>${cake.layers}</td>

//           <td>${cake.price}</td>

//           <td>

//             <button onclick="updateCake('${cake._id}')">Update</button>

//             <button onclick="deleteCake('${cake._id}')">Delete</button>

//           </td>

//         </tr>`;

//         cakeTable.innerHTML += row;

//       });

//     });

// }

 

function showAddCakeForm() {

  document.getElementById('addCakeForm').style.display = 'block';

}

 function viewOrder(){

  location.href="../vieworders.html"


 }
 

function addCake() {

    const name = document.getElementById('cakeName').value;
  
    const flavor = document.getElementById('cakeFlavour').value;
  
    const weight_kg= document.getElementById('cakeWeight').value;
  
    const layers = document.getElementById('cakeLayers').value;
  
    const price = document.getElementById('cakePrice').value;
  
    const image_url= document.getElementById('cakeImage').value;
  
    const quantity = document.getElementById('cakeQuality').value;
  
    const topping = document.getElementById('cakeTopping').value;
  
   
  
    // Construct new cake object
  
    const newCake = {
  
      name,
  
      flavor,
  
      weight_kg,
  
      layers,
  
      price,
  
     image_url,
  
      quantity,
  
      topping,
  
    };
  
   
  
    // Send POST request to add new cake
  
    fetch('http://localhost:3000/cakes', {
  
      method: 'POST',
  
      headers: {
  
        'Content-Type': 'application/json',
  
      },
  
      body: JSON.stringify(newCake),
  
    })
  
      .then(response => response.json())
  
      .then(addedCake => {
  
        console.log(`Added new cake: ${JSON.stringify(addedCake)}`);
  
        getCakes(); // Refresh the table after adding a new cake
  
        document.getElementById('addCakeForm').style.display = 'none'; // Hide the add form after adding
  
      })
  
      .catch(error => console.error(error));
  
  }


function getCakes() {

    const cakeTable = document.getElementById('cakeTable');


    / ////-----------------------------------------------//

  const link = "http://localhost:3000/checkUser"
  let token=localStorage.getItem("credentials")
  fetch(link,{method:'POST',headers:{'Authorization':`Bearer ${token}`,'Content-Type':'application/json'}})
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
          //Do Nothing
    })
    .catch((error) => {
      console.log(error.message);
    });


// //--------------------------------------------------//

    
  
   
  
    fetch('http://localhost:3000/cakes')
  
      .then(response => response.json())
  
      .then(cakes => {
  
        cakeTable.innerHTML = "<tr><th>ID</th><th>Name</th><th>flavor</th><th>Weight</th><th>Layers</th><th>Price</th><th>Image</th><th>quantity</th><th>Topping</th><th>Action</th></tr>";
  
   
  
        cakes.forEach(cake => {
  
          const row = document.createElement('tr');
  
          row.innerHTML = `
  
            <td>${cake._id}</td>
  
            <td>${cake.name}</td>
  
            <td>${cake.flavor}</td>
  
            <td>${cake.weight_kg}</td>
  
            <td>${cake.layers}</td>
  
            <td>${cake.price}</td>
  
            <td><img src="${cake.image_url}" style="width:80px;height:80px;" alt="img"></td>
  
            <td>${cake.quantity}</td>
  
            <td>${cake.topping}</td>
  
            <td>
  
              <button onclick="updateCake('${cake._id}')">Update</button>
  
              <button onclick="deleteCake('${cake._id}')">Delete</button>
  
            </td>
  
          `;
  
          cakeTable.appendChild(row);
  
        });
  
      })
  
      .catch(error => console.error(error));
  
   }


  
   
  
  function cancelAddCake() {

  
    document.getElementById('addCakeForm').style.display = 'none';
  
  }

 

  function updateCake(cakeId) {
    

    if (cakeId) {
  
      // Fetch cake details based on ID
  
      fetch(`http://localhost:3000/cakes/${cakeId}`)
  
        .then(response => response.json())
  
        .then(cake => {
  
          // Populate the edit form with cake details
  
          document.getElementById('editCakeId').value = cakeId;
  
          document.getElementById('editCakeName').value = cake.name;
  
          document.getElementById('editCakeFlavour').value = cake.flavor;
  
          document.getElementById('editCakeWeight').value = cake.weight_kg;
  
          document.getElementById('editCakeLayers').value = cake.layers;
  
          document.getElementById('editCakePrice').value = cake.price;
  
          document.getElementById('editCakeImage').value = cake.image_url;
  
          document.getElementById('editCakeQuality').value = cake.quantity;
  
          document.getElementById('editCakeTopping').value = cake.topping;
  
   
  
          // Show the edit form
  
          document.getElementById('editCakeForm').style.display = 'block';
  
        })
       
  
  
    } else {
    
  
      // Gather the updated cake details from the form
  
      const id = document.getElementById('editCakeId').value;
  
      const name = document.getElementById('editCakeName').value;
  
      const flavor = document.getElementById('editCakeFlavour').value;
  
      const weight_kg= document.getElementById('editCakeWeight').value;
  
      const layers = document.getElementById('editCakeLayers').value;
  
      const price = document.getElementById('editCakePrice').value;
  
      const image_url = document.getElementById('editCakeImage').value;
  
      const quantity = document.getElementById('editCakeQuality').value;
  
      const topping = document.getElementById('editCakeTopping').value;
  
   
  
      // Construct updated cake object
  
      const updatedCake = {
  
        name,
  
        flavor,
  
        weight_kg,
  
        layers,
  
        price,
  
       image_url,
  
        quantity,
  
        topping,
  
      };
  
   
  
      // Send PUT request to update cake details
  
      fetch(`http://localhost:3000/cakes/${id}`, {
  
        method: 'PUT',
  
        headers: {
  
          'Content-Type': 'application/json',
  
        },
  
        body: JSON.stringify(updatedCake),
  
      })
  
        .then(response => response.json())
  
        .then(updatedCake => {
  
          console.log(`Updated cake: ${JSON.stringify(updatedCake)}`);
  
          getCakes(); 
  
          document.getElementById('editCakeForm').style.display = 'none'; 
  
        })
  
        .catch(error => console.error(error));
  
    }
  
  }
  
 
 
  function cancelUpdateCake() {
   
    document.getElementById('editCakeForm').style.display = 'none';
   
      
  }

   
  
  function deleteCake(id) {
  
    fetch(`http://localhost:3000/cakes/${id}`, {
  
      method: 'DELETE',
  
    })
  
      .then(response => response.json())
  
      .then(deletedCake => {
  
        console.log(`Deleted cake: ${JSON.stringify(deletedCake)}`);
  
        getCakes(); // Refresh the table after deleting a cake
  
      })
  
      .catch(error => console.error(error));
  
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