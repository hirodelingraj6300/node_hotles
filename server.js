const express = require('express')
const app = express()
const db = require('./db');
require('dotenv').config();


const bodyParser = require('body-parser');
app.use(bodyParser.json());  // req.body
const PORT = process.env.PORT || 3000;


app.get('/', (req, res) => {
    res.send('🍽️ Welcome to my restaurant — we serve the best food in town!');
  });
  
  
//import the router files
const personRoutes = require('./routes/personRoutes');

const menuRoutes = require('./routes/menuRoutes');

//Use the routers(this is main base file )
app.use('/person',personRoutes);
app.use('/menu-item',menuRoutes);



app.listen(PORT, ()=>{
    console.log(' Server is listening on port 3000')
})