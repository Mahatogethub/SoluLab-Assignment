const express = require('express') ;

const router = express.Router() ;

const productModel = require('../controller/productController')
const categoryModel = require('../controller/categoryController')


router.post('/category' , categoryModel.createCategory)

router.post('/product' , productModel.createProduct)

router.get('/product' , productModel.getProduct)

router.put('/product/:productId' , productModel.updateProduct)

router.delete('/product/:productId' , productModel.deleteProduct)

// router.get('/*' , (req,res) =>{
//     return res.status(200).send({status : true , message:'properly connected'})
// })

module.exports = router