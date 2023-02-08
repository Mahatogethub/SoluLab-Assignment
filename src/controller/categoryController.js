const categoryModel = require('../model/categoryModel') ;


const createCategory = async (req,res) => {
    try{

    const data = req.body ;

    let {categoryName } = data ;
//------------------------------------some data is present or not in body----------------------------------------------
    if(Object.keys(data).length = 0){
        return res.status(400).send({stattus : false , message : `Please provide some data in body`})
    }
//----------------------------------------------------------------------------------------------------------------------

//-----------------------------categoryName is Mandatory--------------------------------------------------------------------------
    if(!categoryName){
        return res.status(400).send({status : false , message : `categoryName is mendatory ,please provide categoryName `})
    }
//-----------------------------------------------------------------------------------------------------------------------

//-----------------------------creating  categoryName -----------------------------------------------------------------
     const create = await categoryModel.create(data)

     return res.status(201).send({status : true , message : 'Created Successfully' , data : create})
 //--------------------------------------------------------------------------------------------------------------------    
 }

 catch(err){
    return res.status(500).send({status : false , message : err.message})
 }

}

module.exports = {createCategory}