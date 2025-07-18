const express = require('express')
const app = express()
const db = require('./db');
require('dotenv').config();
const passport = require('./auth')
const bodyParser = require('body-parser');
app.use(bodyParser.json());  // req.body
const PORT = process.env.PORT || 3000;

//  middleware example
const logRequest = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
  next(); // move to the next phase
}

app.use(logRequest);

app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local',{session:false})


app.get('/', function (req, res) {
    res.send('🍽️ Welcome to Sree Ram Restaurant — We Serve The Best Food in Town!');
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