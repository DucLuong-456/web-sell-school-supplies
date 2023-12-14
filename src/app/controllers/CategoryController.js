
const Category = require('../models/CategoryModel')
const Product = require('../models/ProductModel')
const {mongooseToObject,mutipleMongooseToObject} = require('../../util/mongoose')

const CategoryController ={
  
    getCategory: async(req, res, next)=>{
    try {
      const categories= await Category.find({})
      return res.render('dashboard/manage_category',{layout:false, categories: mutipleMongooseToObject(categories)})
    } catch (error) {
       return res.status(500).json({msg: error})
    }
   
    
  },
  getCreateCategory: async(req, res, next)=>{
    try {
         return res.render('dashboard/createCategory',{layout:false})

     } catch (error) {
       return res.status(500).json({msg: error})
    }
  },
  //[PUT] category/:id
  updateCategory: async(req, res, next)=>{
    try {
      await Category.updateOne({_id: req.params.id}, req.body)
      return res.redirect('/dashboard/categories')
    
    } catch (error) {
       return res.status(500).json({msg: error})
    }
  },
    // [GET => edit category]
  getUpdateCategory: async(req, res, next) =>{  
      try {
        const category=await Category.findById(req.params.id)
        return res.render('dashboard/editCategory', {layout: false,category: mongooseToObject(category)})
      } catch (error) {
         return res.status(500).json({msg: error})
      }
    }
   ,
//[POST] BOOK to DATBASE
createCategory: async(req, res, next)=>{    
      try {
        const category =new Category(req.body);
        await category.save()
        return res.redirect('/dashboard/categories')
    
      } catch (error) {
         return res.status(500).json({msg: error})
      }
    }
    ,
    deleteCategory: async(req, res, next)=>{
        try {
          let categoryID = req.params.id
          const product = await Product.find({})
          if(product) return res.status(500).json({msg: "Do not delete category!"})
          await Category.deleteOne({_id: req.params.id})
          return res.redirect('/dashboard/categories')
        } catch (error) {
           return res.status(500).json({msg: error})
        }  
      }
}
module.exports = CategoryController;