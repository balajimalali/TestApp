const express = require('express')
const router = express.Router()

const database = require('../database')
const prisma = database.prisma

router.get('/', database.authenticate('user'), async (req, res) => {
    if (!req.user) {
        res.status(403).json({ msg: "Please login" });
        return;
    }

    const qpaper = await prisma.qpaper.findMany({

    })
    res.json(qpaper)
})

router.get('/:id', database.authenticate('user'), async (req, res) => {
    if (!req.user) {
        res.status(403).json({ msg: "Please login" });
        return;
    }
    const qpaper = await prisma.qpaper.findUnique({
        where: {
            id: parseInt(req.params.id)
        },
        include: {
            section: {
                include: {
                    question:
                        { select: { id: true, question: true, option: true } }
                }
            }
        }
    }
    )

    const user = await prisma.user.findUnique({
        where: {
            id: req.user
        },
        select: {
            first_name: true,
            last_name: true
        }
    })




    if (qpaper) {
        const instance = await prisma.instance.create({
            data: {
                userId: req.user,
                start: Date().toString()
            }
        })
        const token = database.jwtToken(instance.id, qpaper.time + 2)
        res.cookie('tst', 'Bearer ' + token, { expires: new Date(Date.now() + (qpaper.time + 2) * 60 * 1000) })
        res.json({ qpaper: qpaper, user: user, start: instance.start })
    }
    else {
        res.status(404).json({ msg: "not found" })
    }
})

router.post('/sync/:id', database.authenticate('instance'), async (req, res) => {
    const instance = req.instance;
    if (instance) {
        if (req.body.submit) {
            await prisma.instance.update({
                where: {
                    id: instance
                },
                data: {
                    value: JSON.stringify(req.body.test),
                    end: Date().toString(),
                    submited: true
                }
            })
            res.status(200).json({ msg: 'submitted successfully' })
        } else {
            await prisma.instance.update({
                where: {
                    id: instance
                },
                data: {
                    value: JSON.stringify(req.body.test),
                    end: Date().toString(),
                }
            })
            res.status(200).json({ msg: 'synced successfully' })

        }
    } else {
        res.status(404).json({ msg: 'an error occured' })
    }

})

module.exports = router