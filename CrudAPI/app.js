const express = require('express')
const mongoose = require('mongoose')
const url =  'mongodb://localhost/CrudData'
const app = express()

const cors = require('cors');
const bodyParser = require("body-parser");


mongoose.connect(url, {useNewUrlParser:true})
const con  = mongoose.connection

con.on('open', () => {
    console.log('connected...')
})
app.use(cors());
app.use(express.json())

//app.use(bodyParser.urlencoded({ extended: false }));
const requestRouter = require('./router/request')
app.use('/request', requestRouter)

app.listen(9000, () =>{
    console.log('Server Started')
})

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
  });
  // app.use(function (req, res, next) {
  //   var cookie = req.cookies.jwtToken;
  //   if (!cookie) {
  //     res.cookie('jwtToken', theJwtTokenValue, { maxAge: 900000, httpOnly: true });
  //   } else {
  //     console.log('lets check that this is a valid cookie');
  //     // send cookie along to the validation functions...
  //   }
  //   next();
  // });