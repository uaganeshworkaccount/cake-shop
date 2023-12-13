// const express = require('express');

// const bodyParser = require('body-parser');

// const mongoose = require('mongoose');
// const cors=require('cors')


 

// const app = express();
// app.use(cors());

// const port = process.env.PORT || 5000;

 

// mongoose.connect('mongodb://localhost:27017/cakes', { useNewUrlParser: true, useUnifiedTopology: true });

 



// // const Cake = mongoose.model('Cake',{

// //     name: { type: String, required: true },
  
// //     flavour: { type: String, required: true },
  
// //     weight: { type: Number, required: true },
  
// //     layers: { type: Number, required: true },
  
// //     price: { type: Number, required: true },
  
// //     image: { type: String }, // Image URL or path
  
// //     quality: { type: String }, // Example: High, Medium, Low
  
// //     topping: { type: String },
  
// //   });

 

// app.use(bodyParser.json());

 

// app.get('/cakes', async (req, res) => {

//   const cakes = await Cake.find();

//   res.send(cakes);

// });


// app.get('/cakes/:id', async (req, res) => {

//     try {
  
//   const cake = await Cake.findById(req.params.id);
  
//       res.json(cake);
  
//     } catch (error) {
  
//       console.error(error);
  
//       res.status(500).send('Internal Server Error');
  
//     }
  
//   });

 
  
   
  

   
  

 

// // Add endpoints for update and delete here