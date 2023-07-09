
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    let user = await prisma.user.deleteMany({})
    let question = await prisma.question.deleteMany({})
    console.log(user);
    console.log(question);
}

main()