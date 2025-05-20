const express = require('express')
const app = express()
const db = require('./db');


const bodyParser = require('body-parser');
app.use(bodyParser.json());  // req.body


app.get('/', (req, res) => {
    res.send('🍽️ Welcome to my restaurant — we serve the best food in town!');
  });
  
  
//import the router files
const personRoutes = require('./routes/personRoutes');

const menuRoutes = require('./routes/menuRoutes');

//Use the routers(this is main base file )
app.use('/person',personRoutes);
app.use('/menu-item',menuRoutes);

app.listen(3000, ()=>{
    console.log(' Server is listening on port 3000')
})