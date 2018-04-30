// importing modules

var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');

var app = express();

const route = require('./route/route');

//connect to mongoDb
mongoose.connect('mongodb://localhost:27017/contactlist');

//successful connection
mongoose.connection.on('connected',() => {
   console.log('Connected to database mongodb @ 27017');
});

//error during connection
mongoose.connection.on('error', (error) => {
   if(error){
      console.log('Error in db connection: '+error)
   }
});

//port number
const port = 3000;

//add middleware to parse data
app.use(cors());
app.use(bodyparser.json());

//static files
app.use(express.static(path.join(__dirname,'public')));


//routes
app.use('/api', route);

//test server
app.get('/', (req, res)=>{
   res.send('foobar');
});

//bind server to the port
app.listen(port,()=>{
   console.log('Server started at port: '+port);
});