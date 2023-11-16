
import express from 'express'
import { Server, Socket } from 'socket.io'
import handlebars from 'express-handlebars'

import { __dirname, __filename } from './utils.js'
import productsRouter from './routes/products.routes.js'
import cartsRouter from './routes/carts.routes.js'
import indexRouter from './routes/index.routes.js'
import realTimeProductsRouter from './routes/realtimeproducts.routes.js'

const PORT = 8080

const app = express()

const httpServer = app.listen(PORT, () => {
    console.log(`Express server active on port ${PORT}`)
})

const io = new Server(httpServer)

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('io', io)

app.use('/', indexRouter)
app.use('/', (req, res, next) => {
    realTimeProductsRouter.io(io);
    next();
}, realTimeProductsRouter);
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.set('views', `${__dirname}/views`)
app.use('/static', express.static(`${__dirname}/public`))
