
const Product = require('../models/ProductModel')
const Category = require('../models/CategoryModel')
const fs = require('fs')
const {mongooseToObject,mutipleMongooseToObject} = require('../../util/mongoose')

const ProductController ={
  
  deleteProduct: async(req, res, next)=>{
    try {
      await Product.deleteOne({_id: req.params.id})
      return res.redirect('/dashboard/products')
    } catch (error) {
       return res.status(500).json({msg: error})
    }
   
    
  },
  //[PUT] book/id
  updateProduct: async(req, res, next)=>{
    try {    
    if(!req.file)
    {
      const {name,nhacungcap,nhaXB,tacgia,loaibia,image,giaban,soluongton,bo,slug,categoryID} = req.body
       await Product.updateOne({_id: req.params.id},req.body)
       return res.redirect('/dashboard/products')
    }
      else
      {
      //  const imageUpdate = req.file.originalname
      //   const {name,nhacungcap,nhaXB,tacgia,loaibia,image,giaban,soluongton,bo,slug,categoryID} = req.body
      //    if(imageUpdate != image) {
      //      const pathtofile = `src\\public\\img\\${image}`
      //     fs.unlink(pathtofile,(err)=>{
      //       if(err) throw err;
      //       console.log('deleted file!')
      //     })
      //   }
        
      //   await Product.updateOne({_id: req.params.id},{name,nhacungcap,nhaXB,tacgia,loaibia,image: imageUpdate,giaban,soluongton,bo,slug,categoryID})
      //   return res.redirect('/dashboard/products')
      const {name,nhacungcap,nhaXB,tacgia,loaibia,giaban,soluongton,bo,slug,categoryID} = req.body
      const imageUpdate = req.file.originalname
      
      await Product.updateOne({_id: req.params.id},{name,nhacungcap,nhaXB,tacgia,loaibia,image: imageUpdate,giaban,soluongton,bo,slug,categoryID})
       return res.redirect('/dashboard/products')
      }

      
    
    } catch (error) {
       return res.status(500).json({msg: error})
    }
  },
    // [GET => edit book]
  editProduct: async(req, res, next) =>{  
      try {
        const book=await Product.findById(req.params.id)
        const categories = await Category.find({})
        if(!categories) return res.json({msg: "category do not exist!"})
        return res.render('Book_product/edit', {layout: false,books: mongooseToObject(book),categories: mutipleMongooseToObject(categories)})
    
      } catch (error) {
         return res.status(500).json({msg: error})
      }
    }
   ,
//[GET]Create BOOK
    createProduct: async (req, res, next) =>{    
      try {
        const categories = await Category.find({})
        if(!categories) return res.json({msg: "category do not exist!"})
        return res.render('Book_product/create',{layout: false, categories: mutipleMongooseToObject(categories)});
      } catch (error) {
         return res.status(500).json({msg: error})
      }
      
    },
//[POST] create BOOK to DATBASE
    storeProduct: async(req, res, next)=>{    
      try {
        //ten file upload => console.log(req.file) de hieu
        const image = req.file.originalname;
        const {name,nhacungcap,nhaXB,tacgia,loaibia,giaban,soluongton,bo,slug,categoryID} = req.body
        
         const product =new Product(
          {name,nhacungcap,nhaXB,tacgia,loaibia,image,giaban,soluongton,bo,slug,categoryID}
        );
         await product.save()
         return res.redirect('/dashboard/products')
    
      } catch (error) {
         return res.status(500).json({msg: error})
      }
    }
    ,
//[GET]
   show: async(req, res, next)=>{    
    try {
      const books= await Product.findOne({slug: req.params.slug})
      
      const product =  await Product.findOne({slug: req.params.slug})
        if(!product) return res.json({msg: "product does not exist!"})
      const productsRelated = await Product.find({categoryID: product.categoryID}).limit(5)
        if(!productsRelated) return res.json({msg: "product related does not exist!"})
        
      return res.render('Book_product/detail_1',{books: mongooseToObject(books),productsRelated: mutipleMongooseToObject(productsRelated)})
    
    } catch (error) {
       return res.status(500).json({msg: error})
    }
    },
    // show2: async(req, res, next)=>{   
    //   try {
    //     const data =await Fashion.findOne({slug: req.params.slug})
    //     const product =  await Fashion.findOne({slug: req.params.slug})
    //       if(!product) return res.json({msg: "product does not exist!"})
    //     const productsRelated = await Fashion.find({categoryID: product.categoryID}).limit(5)
    //       if(!productsRelated) return res.json({msg: "product related does not exist!"})
    //     return res.render('Book_product/detail_2',{data: mongooseToObject(data),productsRelated: mutipleMongooseToObject(productsRelated)});
    
    //   } catch (error) {
    //      return res.status(500).json({msg: error})
    //   } 
      
    // },
    getProduct: async(req, res)=>{
      const products = await Product.find({})
      return res.json(products)
  },
  getProductRelated: async (req,res)=>{
      const product =  await Product.findOne({slug: req.params.slug})
      if(!product) return res.json({msg: "product does not exist!"})
      const productsRelated = await Product.find({categoryID: product.categoryID})
      if(!productsRelated) return res.json({msg: "product related does not exist!"})
      return res.json(productsRelated)
  },
//TRANG CHU book [GET]
    index: async (req, res, next)=>{    
      try {
        const data =await Product.find({})
        return res.json(data);
    
      } catch (error) {
         return res.status(500).json({msg: error})
      }  

}
}
module.exports = ProductController;