import express from "express"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
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

//login 

router.post('/login', async (req, res) => {
    const { username, password } = req.body
    console.log(username, password)
    const userFromDB = await getUserByName(username)
    console.log(userFromDB)
    //username validation
    if (!userFromDB) {
        res.status(400).send({ message: 'Invalid Credentials' })
        return
    }

    const storedDbPassword = userFromDB.password
    const isPasswordMatch = await bcrypt.compare(password, storedDbPassword)
    if (!isPasswordMatch) {
        res.status(400).send({ message: 'Invalid Credentials' })
        return
    }
    const token = jwt.sign({ id: userFromDB._id }, process.env.SECRET_KEY)
    res.send({ message: "Successfully Logged In", token: token })
})



export const usersRouter = router