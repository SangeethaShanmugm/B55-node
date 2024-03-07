// const express = require('express')//third party package
// const { MongoClient } = require('mongodb');
import express from "express"
import * as dotenv from 'dotenv'
import { MongoClient } from "mongodb"
const app = express()
const PORT = process.env.PORT
// req => what we send to server
// res => what we receive from server
dotenv.config()

//Inbuilt middleware => interceptor => converting body data to JSON
app.use(express.json())

// console.log(process.env.MONGO_URL)
//Mongodb connection 

const MONGO_URL = process.env.MONGO_URL
//"mongodb://127.0.0.1:27017"
//"mongodb://localhost:27017"


async function createConnection() {
    const client = new MongoClient(MONGO_URL)
    await client.connect()
    console.log("Mongodb is connected")
    return client;
}

const client = await createConnection()

// (async () => {
//     const client = await createConnection()
// })()



app.get('/', (req, res) => {
    res.send('Hello Everyone😀')
})

// Task

// /products =  all the products ✅
// /products?category=mobile => only category mobile ✅
// /products?rating=4.9=> products with rating 4.9 ✅
// /products?category=mobile&rating=5 ✅

//get all products
app.get('/products', async (req, res) => {
    const { category, rating } = req.query
    console.log(req.query, category);
    console.log(req)

    // let filteredProducts = products //copy by reference  => same address

    // if (category) {
    //     filteredProducts = filteredProducts.filter((pd) => pd.category === category)
    // }
    // if (rating) {
    //     filteredProducts = filteredProducts.filter((pd) => pd.rating === +rating)
    // }
    const result = await client.db("b55-node").collection("products").find(req.query).toArray()

    res.send(result)
})

//get product by id
app.get('/products/:id', async (req, res) => {
    const { id } = req.params
    console.log(req.params, id)
    const product = await client.db("b55-node").collection("products").findOne({ id: id })
    // products.find((pd) => pd.id === id)
    product ? res.send(product) : res.status(404).send({ message: "No product found" })
})


//delete product by id
app.delete('/products/:id', async (req, res) => {
    const { id } = req.params
    console.log(req.params, id)
    const product = await client.db("b55-node").collection("products").deleteOne({ id: id })
    res.send(product)
})

//add products

app.post('/products', async (req, res) => {
    const newProduct = req.body
    const result = await client.db("b55-node").collection("products").insertMany(newProduct)
    res.send(result)
})


app.listen(PORT, () => console.log("Server is starting on port", PORT))