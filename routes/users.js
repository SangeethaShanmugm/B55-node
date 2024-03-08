import express from "express"
import { genPassword, createUser, getUserByName } from "../helper.js"
const router = express.Router()

//register
router.post('/register', async (req, res) => {
    const { username, password } = req.body
    console.log(username, password)
    const isUserExist = await getUserByName(username)
    console.log(isUserExist)
    //username validation
    if (isUserExist) {
        res.status(400).send({ message: 'Username already exists' })
        return
    }
    const hashedPassword = await genPassword(password)
    console.log(hashedPassword)
    const result = await createUser(username, hashedPassword)
    res.send(result)
})



export const usersRouter = router