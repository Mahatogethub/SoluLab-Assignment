const mongoose = require('mongoose') ;

const ObjectId = mongoose.Schema.Types.ObjectId ;

const productSchema = new mongoose.Schema({
 
productName : {
    type : String ,
    trim :true ,
    required : true ,
},	

qtyPerUnit : {
    type:Number ,
    required : true 
},	
	
unitPrice : {
    type : Number ,
    required : true ,
},			         

unitInStock : {
    type : Number,
    min:1,
   // default : 1 ,
},		

discontinued :  {
    type : Boolean ,
    default : false ,
},		

categoryId : {
    type : ObjectId ,
    ref : 'category' ,
    required : true
},	

isDeleted :{
    type : Boolean ,
    default : false
}

},{timestamps : true})

module.exports = mongoose.model('product',productSchema)