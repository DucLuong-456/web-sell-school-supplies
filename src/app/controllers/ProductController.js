const Product1 = require('../models/Book')
const Product2 = require('../models/Fashion')
const { find } = require('../models/userModel')

const productController = {
    getProduct: async(req, res)=>{
        const products = await Product1.find({})
        return res.json(products)
    },
    getProductRelated: async (req,res)=>{
        const product =  await Product1.findOne({slug: req.params.slug})
        if(!product) return res.json({msg: "product does not exist!"})
        const productsRelated = await Product1.find({categoryID: product.categoryID})
        if(!productsRelated) return res.json({msg: "product related does not exist!"})
        return res.json(productsRelated)
    }
}

module.exports = productController;
