
import { Router } from "express"
import fs from 'fs'
import { type } from "os"
import { parse } from "path"
import { pid, title } from "process"

const router = Router()

const jsonPath = '../ProductManager.json'

class ProductManager{
    static products = []

    constructor(id, title, description, code, price, status, stock, category, thumbnail){
        this.id = id
        this.title = title
        this.description = description
        this.code = code
        this.price = price
        this.status = status
        this.stock = stock
        this.category = category
        this.thumbnail = thumbnail
    }    
  }

router.get('/', async (req, res) => {
    try {
        const dataJSON = await fs.promises.readFile(jsonPath, { encoding: 'utf-8'}, (err, data) => {
            return data
        }) 
        ProductManager.products = JSON.parse(dataJSON)
        const products = ProductManager.products
        res.render('index', {
            title: 'List of products',
            products: products
        })
    } catch(error){
        res.status(400).send(error.message)
      }
})

export default router