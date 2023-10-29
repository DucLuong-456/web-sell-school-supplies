
const homeRouter = require('./homeRouter')
const bookRouter =require('./bookRouter')
const meRouter =require('./meRouter')
const userRouter= require('./userRouter')
const cartRouter= require('./cartRouter')
const menuRouter= require('./menuRouter')
const productRouter = require('./productRouter')
const dashboardRouter = require('./dashboardRouter')
const categoryRouter = require('./categoryRouter')
function routes(app){
    app.use('/book',bookRouter)
    app.use('/me',  meRouter)
    app.use('/user',userRouter)
    app.use('/cart',cartRouter)
    app.use('/menu',menuRouter)
    app.use('/product',productRouter)
    app.use('/dashboard',dashboardRouter)
    app.use('/category',categoryRouter)

    app.use('/',homeRouter)

}

module.exports = routes