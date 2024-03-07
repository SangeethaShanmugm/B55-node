import express from "express"
import { getAllProducts, getProductById, deleteProductById, addProducts, updateProducts } from "../helper.js"

const router = express.Router()

//get all products
router.get('/', async (req, res) => {
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
    const result = await getAllProducts(req)

    res.send(result)
})

//get product by id
router.get('/:id', async (req, res) => {
    const { id } = req.params
    console.log(req.params, id)
    const product = await getProductById(id)
    // products.find((pd) => pd.id === id)
    product ? res.send(product) : res.status(404).send({ message: "No product found" })
})


//delete product by id
router.delete('/:id', async (req, res) => {
    const { id } = req.params
    console.log(req.params, id)
    const product = await deleteProductById(id)
    res.send(product)
})

//add products

router.post('/', async (req, res) => {
    const newProduct = req.body
    const result = await addProducts(newProduct)
    res.send(result)
})

//update products
router.put('/:id', async (req, res) => {
    const { id } = req.params
    const updatedProduct = req.body
    const result = await updateProducts(id, updatedProduct)
    res.send(result)
})


export const productRouter = router