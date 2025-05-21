const express = require('express')
const router = express.Router();

const MenueItem = require('./../models/MenueItem');


  // POST /menu-item - Add a new menu item
  router.post('/', async (req, res) => {
    try {
        const data = req.body;

        // Create new MenuItem document
        const newItem = new MenueItem(data);

        // Save to DB
        const response = await newItem.save();
        console.log('Menu item saved');
        res.status(200).json(response);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET /menu-item - Get all menu items
router.get('/', async (req, res) => {
    try {
        const data = await MenueItem.find();
        console.log('Menu items fetched');
        res.status(200).json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/:taste', async (req, res) => {
    try {
      const taste = req.params.taste; // Extract taste from URL
  
      if (taste === 'sweet' || taste === 'sour' || taste === 'spice') {
        const response = await MenueItem.find({ taste: taste }); //  correct field name
        console.log('Menu items with taste:', taste, 'fetched');
        res.status(200).json(response);
      } else {
        res.status(404).json({ error: 'Invalid taste type' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const updated = await MenueItem.findByIdAndUpdate(id, data, { new: true, runValidators: true });

    if (!updated) {
      return res.status(404).json({ error: 'Menu item not found' });
    }

    res.status(200).json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/:id', async (req, res) =>{
  try{
    const menuItemId= req.params.id; // Extract the ID from URL

    // Assuming you have a Person model
    const response = await MenueItem.findByIdAndDelete(menuItemId);
     if (!response) {
        return res.status(404).json({ error: 'menue not found' });
      }
       console.log('Data deleted');
      res.status(200).json({message:"menue  Deleted Successfully"});

  }catch(err){
     console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });

  }

})
  
// commnet add for testing purpose 
// commnet add for testing purpose 
module.exports = router;