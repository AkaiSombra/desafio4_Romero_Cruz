
import express from 'express'
import { Server, Socket } from 'socket.io'
import hnadlebars from 'express-handlebars'

import productsRouter from './routes/products.routes.js'
import cartsRouter from './routes/carts.routes.js'

const PORT = 8080

const app = express()

const httpServer = app.listen(PORT, () => {
    console.log(`Express server active on port ${PORT}`)
})

const socketServer = new Server(httpServer)

socketServer.on('connection', socket => {

})

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
