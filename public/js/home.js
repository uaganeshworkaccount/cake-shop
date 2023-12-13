function displayCake(){


    const geturl = "http://localhost:3000/cakes";
  fetch(geturl, { method: "GET" })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network Response was not ok");
      }
      return response.json();
    })
    .then((data) => {

        let length=data.length;
        console.log(length)
        let content="";
        for(i=0;i<length;i++)
        {
        content+=`<div class="col-md-4">
        <div class="card">
            <img class="imagecustom" src="${data[i].image_url}" class="card-img-top" alt="Image 1">
            <div class="card-body">
                <p class="card-text">${data[i].name}</p>
            </div>
        </div>
       </div>`
        }

        // console.log(content)
        document.getElementById("imagerow").innerHTML=content;

        console.log(data);







       
     
    })
    .catch((error) => {
      console.log(error.message);
    });

}