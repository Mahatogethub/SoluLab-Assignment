const mongoose= require('mongoose');
let ObjectId = mongoose.Types.ObjectId ;

const productModel = require('../model/productModel')
const categoryModel = require('../model/categoryModel');




const createProduct = async (req,res) =>{
    try{
    const data = req.body ;

//-------------------------------------------destructuring------------------------------------------------------
    let {productName , qtyPerUnit , unitPrice , categoryId } = data
//----------------------------------------------------------------------------------------------------------------

//--------------------------data is present in body or not--------------------------------------------------------
    if(Object.keys(data).length ==0){
        return res.status(400).send({status:false , message : `please provide some data in body`})
    }
//---------------------------------------------------------------------------------------------------------------

//-----------------------------productName is present on body or not -------------------------------------------------
    if(!productName){
        return res.status(400).send({status:false , message : `productName is mandatory , Please provide product name`})
    }
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------qtyPerUnit is present on body or not------------------------------------------------
    if(!qtyPerUnit){
        return res.status(400).send({status:false , message : ` qtyPerUnit is mandatory , Please provide quantity`})
    }

//----------------------------------------------------------------------------------------------------------------------

//------------------------------------unitPrice is present on body or not -----------------------------------------
    if(!unitPrice){
        return res.status(400).send({status:false , message : ` unitPrice is mandatory , Please provide price`})
    }
 //----------------------------------------------------------------------------------------------------------------   

 //------------------------------------------categoryId is present on body or not -------------------------------------
    if(!categoryId){
        return res.status(400).send({status:false , message : ` categoryId is mandatory , Please provide categoryId`})
    }
//-------------------------------------------------------------------------------------------------------------------

//----------------------------------- ibjectId is valid or not ---------------------------------------------------
    if(!ObjectId.isValid(categoryId)){
        return res.status(400).send({status:false , message : `categoryId is invalid , Please provide correct categoryId`})
    }

//-----------------------------------------------------------------------------------------------------------------

//-----------------------------------create product--------------------------------------------------------------
    const create = await productModel.create(data)

    return res.status(201).send({status: true , message : 'Created successfully' , data : create})
 //--------------------------------------------------------------------------------------------------------------

 }
 catch(err){
    return res.status(500).send({status : false , message : err.message})
 }

}


const getProduct= async (req,res) =>{
      try{
    //--------------------------------destructuring ------------------------------------------------------------
     const {productName , qtyPerUnit , unitPrice , categoryId} =req.query ;
    //----------------------------------------------------------------------------------------------------------

     const obj = {isDeleted : false , discontinued : false}
     
    //------------------------------filter ----------------------------------------------------------------
     if(productName){obj.productName = productName}
     if(qtyPerUnit){obj.qtyPerUnit = qtyPerUnit}
     if(unitPrice){obj.unitPrice = unitPrice}
     if(categoryId){obj.categoryId = categoryId}
    //------------------------------------------------------------------------------------------------------
     
     const get = await productModel.find(obj)

    //----------------------------------product doessnot exist in db---------------------------------------- 
     if(!get){
        return res.status(400).send({status: true , message : `Product doesnot exist` })
     }
    //------------------------------------------------------------------------------------------------------

//-------------------------if we need selected data -------------------------------------------------------------
    const categoryData = await categoryModel.findOne({id : get._id }).select({_id : 1 , categoryName : 1})
//---------------------------------------------------------------------------------------------------------------

//------------------------------category doesnot exist ------------------------------------------------------
     if(!categoryData){
        return res.status(400).send({status: true , message : `Category doesnot exist` })
     }
//------------------------------------------------------------------------------------------------------------

//----------------------------------------fetching data---------------------------------------------------------
     return res.status(200).send(
        {
         status : true ,
         getData :{
            get : get ,
            categoryData : categoryData,
         },
        })
//----------------------------------------------------------------------------------------------------------------

      }
      catch(err){
        return res.status(500).send({status:false ,message : err.message})
      }
}


const updateProduct = async (req,res) => {
   try{
    let data = req.body ;
    let inputId = req.params.productId ;
    let {productName , qtyPerUnit , unitPrice , discontinued} = data ;

//---------------------------some data is present in body for update or not --------------------------------------------
    if(Object.keys(data).length == 0){
        return res.status(400).send({status:false , message : 'Please provide some data to update'})
      }
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------ProductId is valid or not ---------------------------------------------------------------
      if(!ObjectId.isValid(inputId)){
        return res.status(400).send({status : false , message : 'Product Id should be valid , Please provide valid product id '})
     }
 //-----------------------------------------------------------------------------------------------------------------------    

//---------------------------Product does not exist----------------------------------------------------------
const productNotfound = await productModel.findById(inputId)
 
if(!productNotfound){
   return res.status(404).send({ status: false, message: `no such product exist with this Id` })
}
//-------------------------------------------------------------------------------------------------------------

//----------------------------------updating the product-------------------------------------------------------------
      let update = await productModel.findOneAndUpdate(
        {_id : inputId},
        {
            $set : {
                productName : productName, 
                qtyPerUnit :qtyPerUnit , 
                unitPrice : unitPrice ,
                discontinued : discontinued ,
            },
        },
        {new : true} 
      );
      
      return res.status(200).send({status:true,message : 'Updated successfull' , data :update})
//----------------------------------------------------------------------------------------------------------------------
        }
        catch(err){
           return res.status(500).send({status:false ,message : err.message})
        }
}


const deleteProduct = async (req , res) => {
    try{
     const productId = req.params.productId ;

//------------------------------Product Id is mendatory in path params-------------------------------------------------
     if(!productId){
        return res.status(400).send({status : false , message : 'Product Id is required through path params '})
     }
//---------------------------------------------------------------------------------------------------------------------

//----------------------------------ObjectId is valid or not-----------------------------------------------------------------------
     if(!ObjectId.isValid(productId)){
        return res.status(400).send({status : false , message : 'Product Id should be valid , Please provide valid product id '})
     }
//----------------------------------------------------------------------------------------------------------------------------------

//---------------------------Product does not exist----------------------------------------------------------
     const productNotfound = await productModel.findById(productId)
 
     if(!productNotfound){
        return res.status(404).send({ status: false, message: `no such product exist with this Id` })
     }
//-------------------------------------------------------------------------------------------------------------

//----------------------Product Deletation------------------------------------------------------------
     await productModel.findOneAndUpdate({ _id: productId }, { $set: { isDeleted: true} }, { new: true })

     return res.status(200).send({ status: true, message: `product is deleted successfully` })
 //-------------------------------------------------------------------------------------------------------

    }
    catch(err){
        return res.status(500).send({status:false ,message : err.message})
    }
}

//-------------------------------------------exporting -------------------------------------------------------

module.exports = {createProduct , getProduct, updateProduct, deleteProduct}

//--------------------------------------------------------------------------------------------------------