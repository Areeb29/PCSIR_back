const mongodbConnect = require ('./src/db');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileupload = require('express-fileupload');

mongodbConnect();
const app = express();
const port = process.env.PORT || 80;
// var corsOptions = {
//     origin: "http://localhost:3000"
//   };
  
app.use(cors({origin:true, credentials: true,}))
app.use(express.json())
app.use(fileupload());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.use(express.static(__dirname+"\\files"));

//Available Routes

app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "https://glittering-brigadeiros-6e995d.netlify.app/");
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
    res.setHeader("Access-Control-Allow-Methods","GET, POST, PUT, PATCH, POST, DELETE, OPTIONS")
    next();
  });
  

app.use('//', (req, res)=>res.send("Hello World!"))
app.use('/image',require('./src/routes/image'));
app.use('/data',require('./src/routes/prescription'));
app.use('/user',require('./src/routes/doctors'));

// app.use('/images/nonReviewed', express.static(__dirname+"\\files\\nonReviewed"))
// app.use('/images/differ', express.static(__dirname+"\\files\\Differ"))
// app.use('/images/partial', express.static(__dirname+"\\files\\PartialReviewed"))
// app.use('/images/review', express.static(__dirname+"\\files\\Reviewed"))
app.listen(port,()=>{
    console.log('connnected to port ',port)
})