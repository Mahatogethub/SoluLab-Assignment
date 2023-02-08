const mongoose = require('mongoose') ;

//const ObjectId = mongoose.Schema.Types.ObjectId ;

const categorySchema = new mongoose.Schema({

   	
   categoryName : {
     type : String ,
     trim : true ,
     required : true ,
   },		



},{timestamps : true})

module.exports = mongoose.model('category' , categorySchema)