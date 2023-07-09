const express = require('express')
const router = express.Router()
const prisma = require('../database').prisma
const generateToken = require('../database').generateToken
const bcrypt = require('bcrypt')

const authenticate = require('../database').authenticate

const hash = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt)
}

const validateNewUser = async (req, res, next) => {
    let t1;
    req.data = {}
    if (req.body.username) {
        t1 = await prisma.user.count({
            where: {
                username: req.body.username
            }
        })
    }
    else {
        res.json({ msg: 'pleade provide username' })
        return;
    }

    if (t1) {
        res.json({ msg: 'username already exists' })
        return;
    }
    req.data.username = req.body.username
    if (req.body.email) {
        t1 = await prisma.user.count({
            where: {
                email: req.body.email
            }
        })
    }
    else {
        res.json({ msg: 'please provide email' })
        return;
    }
    if (t1) {
        res.json({ msg: 'email already exists' })
        return;
    }
    req.data.email = req.body.email
    if ((req.body.password && req.body.confirm) && (req.body.password == req.body.confirm)) {
        req.data.password = await hash(req.body.password);
    }
    else {
        res.json({ msg: 'passwords do not match' })
        return;
    }
    if (req.body.first_name) {
        req.data.first_name = req.body.first_name
    }
    if (req.body.last_name) {
        req.data.last_name = req.body.last_name
    }
    next();
}

router.post('/register', validateNewUser, async (req, res) => {
    try {
        let user = await prisma.user.create({
            data: req.data,
            select: {
                id: true,
                username: true,
                first_name: true,
                last_name: true
            }
        })

        res
            .cookie('jwt', 'Bearer ' + await generateToken(user.id), { expires: new Date(Date.now() + 10 * 60 * 1000) })
            .json(user)
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'An error occured' })
    }
})


const login = async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                username: req.body.username
            }
        })
        if (!user) {
            res.status(401).json({ msg: "wrong credentials" })
            return;
        }

        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err) {
                res.status(500).json({ msg: "An error occured" })
                return
            }
            if (result) {
                res.cookie('jwt', 'Bearer ' + generateToken(user.id), { expires: new Date(Date.now() + 10 * 60 * 1000) })
                req.user = user;
                next();
                return
            }
            res.status(401).json({ msg: "wrong password" })
            return
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'An error occured' })
    }
}

router.post('/login', login, (req, res) => {
    res.status(200).json({
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        username: req.user.username
    })
})

router.post('/init', authenticate('user'), async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.user
            }
        })
        res.status(200).json({
            first_name: user.first_name,
            last_name: user.last_name,
            username: user.username
        })
    }
    catch {
        res.status(404).json({ msg: 'user does not exist' })
    }
})

router.post('/refresh', authenticate('user'), async (req, res) => {
    if (req.user) {
        res
            .cookie('jwt', 'Bearer ' + await generateToken(req.user), { expires: new Date(Date.now() + 10 * 60 * 1000) })
            .json({ msg: "success" })
    } else {
        res.status(403).json({ msg: 'not authenticated' })
    }
});

module.exports = router;