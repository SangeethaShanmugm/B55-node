import { client } from "./index.js";
import bcrypt from "bcrypt"

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

export async function genPassword(password) {
    const salt = await bcrypt.genSalt(10)//bcrypt.genSalt(no. of rounds)
    // console.log(salt)
    const hashedPassword = await bcrypt.hash(password, salt)
    // console.log(hashedPassword)
    return hashedPassword
}


export async function createUser(username, hashedPassword) {
    return await client.db("b55-node").collection("users")
        .insertOne({ username: username, password: hashedPassword });
}




export async function getUserByName(username) {
    return await client.db("b55-node").collection("users")
        .findOne({ username: username });
}

