const {Router} = require('express');
const bcrypt = require('bcryptjs')
const User = require('../../model/User')
const router = Router();
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')

router.post(
    '/register', 
    [
        check('email', 'Invalible email').isEmail(),
        check('password', 'Invalid password')
            .isLength({min: 6})
    ],
    async (req,res) => {
    try {
        console.log(req.bod)
        const errors = validationResult(req)
        
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Invalid data"
            })
        }
        
        const {email, password} = req.body
        const candidate = await User.findOne({ email })

        if (candidate) {
            return res.status(400).json({message : "User name reserved"})
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({ email, password: hashedPassword})

        await user.save()

        res.status(201).json({ message: "User created"})

    } catch (err) {
        res.status(500).json({message: "error, try later"})
    }
})

router.post(
    '/login',
    [
        check('login', 'Enter valid email').normalizeEmail().isEmail(),
        check('password', 'Enter valid password').exists()
    ],
    async (req,res) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Invalid data"
            })
        }

        const {email, password} = req.body

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ message: 'user dismatch'})
        } 

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({ message: 'password dismatch'})
        }

        const token = jwt.sign(
            { userId: user.id },
            config.get('jwtSecret'),
            { expiresIn: '1h' }
        )

        res.json({ token, userId })
        
    } catch (err) {
        res.status(500).json({message: "error, try later"})
    }
})

module.exports = router