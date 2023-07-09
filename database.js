const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const jwt = require('jsonwebtoken')

const generateToken = (userId) => {
    return jwt.sign({ data: { user: userId }, exp: Math.floor(Date.now() / 1000) + (10 * 60) }, process.env.TOKEN_SECRET);
}

const jwtToken = (Id, time) => {
    return jwt.sign({ data: { instance: Id }, exp: Math.floor(Date.now() / 1000) + (time * 60) }, process.env.TOKEN_SECRET);
}

const authenticate = (type) => {
    return (req, res, next) => {
        if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            jwt.verify(req.headers.authorization.split(' ')[1], process.env.TOKEN_SECRET, (err, data) => {
                if (err) {
                    req[type] = undefined;
                }
                else {
                    req[type] = data.data[type]
                }
            })
            next();
        }
        else {
            res.status(405).send({ msg: 'send cookie' })
        }
    }
}

module.exports = {
    generateToken: generateToken,
    jwtToken: jwtToken,
    prisma: prisma,
    authenticate: authenticate
}