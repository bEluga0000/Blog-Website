import express from 'express'
import { User } from '../db';
import { authentication, secretKey } from '../middleware/jwt';
import { z } from 'zod';
import jwt from 'jsonwebtoken'
import { authVariables } from '../zodVariables/authvariable';
const router = express.Router()

router.post('/signup', async (req, res) => {
    const parsedInput = authVariables.safeParse(req.body);
    if (!parsedInput.success) {
        res.status(401).json({ message: 'Wrong Inputs' })
    }
    else {
        const { username, password } = parsedInput.data
        const user = await User.findOne({ username })
        if (user) {
            res.status(401).json({ message: 'User alredy exist' })
        }
        else {
            const newUser = new User({ username, password });
            const token = jwt.sign({ id: newUser._id }, secretKey, { expiresIn: '1h' })
            await newUser.save();
            res.status(201).json({ message: 'User Created successfully', token })
        }
    }

})
router.post('/signin', async (req, res) => {
    const parsedInput = authVariables.safeParse(req.body)
    if (!parsedInput.success) {
        res.status(401).json({ message: 'Wrong credentials' })
    }
    else {
        const { username, password } = parsedInput.data
        const user = await User.findOne({ username, password })
        if (user) {
            const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '1h' });
            res.status(201).json({ message: 'User signed in successfully', token })
        }
        else {

            res.status(404).json({ message: 'User not found' })
        }
    }


})
router.get('/me', authentication, async (req, res) => {
    const userId = req.headers["userId"]
    console.log(userId)
    const user = await User.findById(userId)
    if (user) {
        res.status(201).json({ username: user.username })
    }
    else {
        res.status(404).json({ message: 'User not found' })
    }
})
export default router