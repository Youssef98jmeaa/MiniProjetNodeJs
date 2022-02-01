
const httpPort = 3000;
const express = require('express')
const app = express()
/*
var bodyParser = require('body-parser')
const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://youssef:0000@cluster0.fv0jh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
const db = mongoose.connection
db.on('error',(error)=>console.error(error))
db.once('open',()=>console.log('connected to database'))
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
	  extended: false,
	})
  );
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
const UsersRouter = require('./routes/Users.js')

app.use('/users',UsersRouter)
app.use('/uploads',express.static('uploads'))
//app.use('/uploads',express.static(path.join(__dirname,'uploads')))
*/

//app.use('/users/lot/search',UsersRouter)

app.listen(httpPort,() => {
	console.log("Server is running on port " + httpPort);
})
//app.listen(3000, ()=> console.log('server start'))
//skander.chamakhi