import { client } from "./index.js";

export async function getAllProducts(req) {
    return await client.db("b55-node").collection("products").find(req.query).toArray();
}
export async function getProductById(id) {
    return await client.db("b55-node").collection("products").findOne({ id: id });
}
export async function deleteProductById(id) {
    return await client.db("b55-node").collection("products").deleteOne({ id: id });
}
export async function addProducts(newProduct) {
    return await client.db("b55-node").collection("products").insertMany(newProduct);
}


export async function updateProducts(id, updatedProduct) {
    return await client.db("b55-node").collection("products")
        .updateOne({ id: id }, { $set: updatedProduct });
}

