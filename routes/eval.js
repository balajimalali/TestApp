const express = require('express')
const router = express.Router()

const database = require('../database')
const prisma = database.prisma

// async function evaluate(paper, soln) {
const evaluate = (paper, soln) => {
    let result = {}
    result.id = soln.id;
    result.title = soln.title;
    result.correct = 0;
    result.wrong = 0;
    result.attempted = 0
    result.notAttempted = 0
    result.section = []
    soln.section.forEach((section, index) => {
        result.section[index] = {};
        result.section[index].id = section.id;
        result.section[index].title = section.title;
        result.section[index].question = []

        section.question.forEach((question, qind) => {
            result.section[index].question[qind] = {};
            result.section[index].question[qind].id = question.id;
            result.section[index].question[qind].question = question.question;
            // result.section[index].question[qind].option = question.option;
            result.section[index].question[qind].option = paper.section[index].question[qind].option;
            result.section[index].question[qind].answer = question.answer;
            // console.log(typeof (paper.section[index]));
            if (paper.section[index].question[qind].choice) {
                result.attempted += 1;
                if (paper.section[index].question[qind].choice == question.answer) {
                    result.correct += 1;
                    result.section[index].question[qind].status = 1
                }
                else {
                    result.wrong += 1;
                    result.section[index].question[qind].status = 0
                }
            } else {
                result.notAttempted += 1;
            }

        })

    });
    result.score = result.correct * soln.positiveMarks + result.wrong * soln.negativeMarks;
    // console.log(soln.negativeMarks);
    return result;
}

router.get('/:id', database.authenticate('user'), async (req, res) => {
    if (!req.user) {
        res.status(403).json({ msg: "Please login" });
        return;
    }
    const user = await prisma.user.findUnique({
        where: {
            id: req.user
        }
    })

    const instance = await prisma.instance.findUnique({ where: { id: req.params.id }, include: { user: true } })

    if (instance && instance.value && instance.user.id == user.id) {
        const value = JSON.parse(instance.value);
        const qpaper = await prisma.qpaper.findUnique({
            where: {
                id: parseInt(value.id)
            },
            include: {
                section: {
                    include: {
                        question: { select: { id: true, question: true, option: true, answer: true } }
                    }
                }
            }
        });

        try {
            let result = evaluate(value, qpaper)
            const status = await prisma.instance.update({
                where: {
                    id: req.params.id
                },
                data: {
                    result: JSON.stringify(result)
                }
            })
            res.json(result)
        } catch (error) {
            res.status(500).json({ msg: 'An error occured while evaluating, please contact administrator.' })
        }
    }
    else {
        res.status(405).json({ msg: 'not authenticated.' })
    }
});

router.get('/', database.authenticate('user'), async (req, res) => {
    if (!req.user) {
        res.status(403).json({ msg: "Please login" });
        return;
    }

    const instances = await prisma.instance.findMany({
        where: {
            userId: req.user
        },
        select: {
            id: true,
            userId: true,
            start: true,
            submited: true,
            end: true,
            result: true,
        }
    })

    res.json(instances)
});


module.exports = router