const express = require('express')
const router = express.Router();

const Person = require('./../models/person');

router.post('/',  async(req, res) =>{
    try{
        const data = req.body // assuming the request body constains the person data

        // Create a new Person doucment using the Mongoose model
        const newPerson = new Person(data)

        // save the  new Person to the database
        const response = await newPerson.save();
        console.log('data saved');
            res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }

})

router.get('/', async(req, res) => {
    try{
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);

    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }

    
  })

  router.get('/:workType', async(req,res)=>{
    try{
      const workType = req.params.workType; // extract the work type from the URL paramenter
      if(workType == 'chef' || workType == 'manager'|| workType=='waiter'){
          
          const response = await Person.find({work:workType});
          console.log('response fetched')
          res.status(200).json(response);
  
      }else{
          res.status(404).json({error:'Invalid work type'});
      }
      
    }catch(err){
          console.error(err);
          res.status(500).json({ error: 'Internal Server Error' });
  
    }    
  })

  router.put('/:id', async (req, res) => {
    try {
      const personId = req.params.id; // Extract the ID from URL
      const updatedPersonData = req.body; // Data to update
  
      const updatedPerson = await Person.findByIdAndUpdate(
        personId,
        updatedPersonData,
        {
          new: true,          // Return the updated document
          runValidators: true // Run schema validation
        }
      );
  
      if (!updatedPerson) {
        return res.status(404).json({ error: 'Person not found' });
      }
  
      console.log('Data updated');
      res.status(200).json(updatedPerson);
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
router.delete('/:id', async (req, res) =>{
  try{
    const personId = req.params.id; // Extract the ID from URL

    // Assuming you have a Person model
    const response = await Person.findByIdAndDelete(personId);
     if (!response) {
        return res.status(404).json({ error: 'Person not found' });
      }
       console.log('Data deleted');
      res.status(200).json({message:"person Deleted Successfully"});

  }catch(err){
     console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });

  }

})


module.exports = router;
