const Cakes=require('../model/Cakes');

exports.getCakes=async(req,res)=>{

    try{
      const cakes=await Cakes.find({});
      res.status(200).json(cakes);
  
  }
  catch(error)
  {
    console.log(error.message);
      res.status(400).json({message:error.message});
  }
  
  
  }

  //get cake by id
  exports.getCakeById=async(req,res)=>{

    try{
        const {id}=req.params;
        const cakes=await Cakes.findById(id);
        res.status(200).json(cakes);
    }
    catch(error){
      res.status(400).json({message:"Invalid Request"});
    }
  }

  exports.createCake= async (req, res) => {

    try {
  
      const newCake = await Cakes.create(req.body);
  
      res.json(newCake);
  
    } catch (error) {
  
      console.error(error);
  
      res.status(500).send('Internal Server Error');
  
    }
  
  };

  exports.updateCakeById=async (req, res) => {
  
    try {
  
  const updatedCake = await Cakes.findByIdAndUpdate(req.params.id, req.body, { new: true });
  
      res.json(updatedCake);
  
    } catch (error) {
  
      console.error(error);
  
      res.status(500).send('Internal Server Error');
  
    }
  
  };


  exports.delteCakeById=async (req, res) => {
  
    try {
  
  const deletedCake = await Cakes.findByIdAndDelete(req.params.id);
  
      res.json(deletedCake);
  
    } catch (error) {
  
      console.error(error);
  
      res.status(500).send('Internal Server Error');
  
    }
  
  };
