const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const users = require('../users');
const SECRET_KEY = 'group3ProjectEcommerce'
const authenticateToken = require('../middlewares/authMiddleware')


router.get('/', authenticateToken, (req, res) => {
    res.json({user: req.user})
})

router.post('/signup', (req, res) => {
    const { username, password } = req.body;

    if (users.find((user) => user.username === username))
        return res.status(409).json({ error: 'user exists' })

    // create new user
    users.push({ username, password });

    // create jwt
    const token = jwt.sign({ username, password }, SECRET_KEY);
    res.json({ message: "success", token, user: username })
})

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!users.find(user => user.username === username && user.password === password))
        return res.status(401).json({ error: "No user found" })

    const token = jwt.sign({ username, password }, SECRET_KEY);
    res.json({ message: 'Login Success', token, user: username })
})

router.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: "access granted", user: req.user })
})

module.exports = router