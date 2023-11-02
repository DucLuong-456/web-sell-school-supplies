
const homeRouter = require('./homeRouter')
const productRouter =require('./productRouter')
const userRouter= require('./userRouter')
const cartRouter= require('./cartRouter')
const menuRouter= require('./menuRouter')
const dashboardRouter = require('./dashboardRouter')
const categoryRouter = require('./categoryRouter')
const paymentRouter = require('./paymentRouter')
function routes(app){
    app.use('/book',productRouter)
    app.use('/user',userRouter)
    app.use('/cart',cartRouter)
    app.use('/menu',menuRouter)
    app.use('/dashboard',dashboardRouter)
    app.use('/category',categoryRouter)
    app.use('/payment',paymentRouter)

    app.use('/',homeRouter)

}

module.exports = routes