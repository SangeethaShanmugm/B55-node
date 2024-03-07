// const express = require('express')//third party package
// const { MongoClient } = require('mongodb');
import express from "express"
import * as dotenv from 'dotenv'
import { MongoClient } from "mongodb"
import { productRouter } from "./routes/products.js"
const app = express()
dotenv.config()


const PORT = process.env.PORT

// req => what we send to server
// res => what we receive from server


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

export const client = await createConnection()

// (async () => {
//     const client = await createConnection()
// })()



app.get('/', (req, res) => {
    res.send('Hello Everyone😀')
})

app.use("/products", productRouter)

app.listen(PORT, () => console.log("Server is starting on port", PORT))


