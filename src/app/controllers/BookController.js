
const Book = require('../models/Book')
const Fashion = require('../models/Fashion')
const Category = require('../models/CategoryModel')
const fs = require('fs')
const {mongooseToObject,mutipleMongooseToObject} = require('../../util/mongoose')

const BookController ={
  
  deleteBook: async(req, res, next)=>{
    try {
      await Book.deleteOne({_id: req.params.id})
      return res.redirect('/me/stored/books')
    } catch (error) {
       return res.status(500).json({msg: error})
    }
   
    
  },
  //[PUT] book/id
  updateBook: async(req, res, next)=>{
    try {    
    if(!req.file)
    {
      const {name,nhacungcap,nhaXB,tacgia,loaibia,image,giaban,soluongton,bo,slug,categoriesID} = req.body
      await Book.updateOne({_id: req.params.id},{name,nhacungcap,nhaXB,tacgia,loaibia,image,giaban,soluongton,bo,slug,categoriesID})
      return res.redirect('/dashboard/products')
    }
      else
      {
       const imageUpdate = req.file.originalname
        const {name,nhacungcap,nhaXB,tacgia,loaibia,image,giaban,soluongton,bo,slug,categoriesID} = req.body
         if(imageUpdate != image) {
           const pathtofile = `src\\public\\img\\${image}`
          fs.unlink(pathtofile,(err)=>{
            if(err) throw err;
            console.log('deleted file!')
          })
        }
        
        await Book.updateOne({_id: req.params.id},{name,nhacungcap,nhaXB,tacgia,loaibia,image: imageUpdate,giaban,soluongton,bo,slug,categoriesID})
        return res.redirect('/dashboard/products')
      // //console.log(image== imageUpdate)
      // res.json({isckech: image != imageUpdate})
      }

      
    
    } catch (error) {
       return res.status(500).json({msg: error})
    }
  },
    // [GET => edit book]
  editBook: async(req, res, next) =>{  
      try {
        const book=await Book.findById(req.params.id)
        return res.render('Book_product/edit', {layout: false,books: mongooseToObject(book)})
    
      } catch (error) {
         return res.status(500).json({msg: error})
      }
    }
   ,
//[GET]Create BOOK
    createBook: async (req, res, next) =>{    
      try {
        const categories = await Category.find({})
        if(!categories) return res.json({msg: "category do not exist!"})
        return res.render('Book_product/create',{layout: false, categories: mutipleMongooseToObject(categories)});
      } catch (error) {
         return res.status(500).json({msg: error})
      }
      
    },
//[POST] create BOOK to DATBASE
    storeBook: async(req, res, next)=>{    
      try {
        //ten file upload => console.log(req.file) de hieu
        const image = req.file.originalname;
        const {name,nhacungcap,nhaXB,tacgia,loaibia,giaban,soluongton,bo,slug,categoriesID} = req.body
        //res.json({name,nhacungcap,nhaXB,tacgia,loaibia,giaban,soluongton,bo,slug,categoriesID,image})
        //res.json(req.body)
         const book =new Book(
          {name,nhacungcap,nhaXB,tacgia,loaibia,image,giaban,soluongton,bo,slug,categoriesID}
        );
         await book.save()
         return res.redirect('/')
    
      } catch (error) {
         return res.status(500).json({msg: error})
      }
    }
    ,
//[GET]
   show: async(req, res, next)=>{    
    try {
      const books= await Book.findOne({slug: req.params.slug})
      
      const product =  await Book.findOne({slug: req.params.slug})
        if(!product) return res.json({msg: "product does not exist!"})
      const productsRelated = await Book.find({categoryID: product.categoryID}).limit(5)
        if(!productsRelated) return res.json({msg: "product related does not exist!"})
        //return res.json(productsRelated)
        //res.json(books)
      return res.render('Book_product/detail_1',{books: mongooseToObject(books),productsRelated: mutipleMongooseToObject(productsRelated)})
    
    } catch (error) {
       return res.status(500).json({msg: error})
    }
    },
    show2: async(req, res, next)=>{   
      try {
        const data =await Fashion.findOne({slug: req.params.slug})
        const product =  await Fashion.findOne({slug: req.params.slug})
          if(!product) return res.json({msg: "product does not exist!"})
        const productsRelated = await Fashion.find({categoryID: product.categoryID}).limit(5)
          if(!productsRelated) return res.json({msg: "product related does not exist!"})
        return res.render('Book_product/detail_2',{data: mongooseToObject(data),productsRelated: mutipleMongooseToObject(productsRelated)});
    
      } catch (error) {
         return res.status(500).json({msg: error})
      } 
      
    },
//TRANG CHU book [GET]
    index: async (req, res, next)=>{    
      try {
        const data =await Book.find({})
        return res.json(data);
    
      } catch (error) {
         return res.status(500).json({msg: error})
      }  

}
}
module.exports = BookController;