const mongoose = require('mongoose')
const Schema = mongoose.Schema
const lotSchema =  new Schema({
      localisation :{
        type: String,
        required: false
      } ,
      description :{
        type: String,
        required: false
      } ,
      price :{
        type: String,
        required: false
      } ,
      contact :{
        type: String,
        required: false
      } ,
      picture: {
        type: String,
        required: true,
        default : "No Picture"
      } 
})

module.exports = mongoose.model('Lot',lotSchema)
