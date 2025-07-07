import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email = 'ilumeo@ilumeo.com'
  const password = '123456'
  const hashedPassword = await bcrypt.hash(password, 10)

  let user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) {
    user = await prisma.user.create({
      data: {
        name: 'Ilumeo',
        email,
        password: hashedPassword,
      },
    })
  }

  const existingShifts = await prisma.workShift.count({
    where: { userId: user.id },
  })

  if (existingShifts < 50) {
    console.log('Inserindo registros de ponto...')

    const now = new Date()
    const shifts = Array.from({ length: 50 }).map((_, i) => {
      const date = new Date(now)
      date.setDate(now.getDate() - i)
      const start = new Date(date.setHours(9, 0, 0, 0))
      const end = new Date(date.setHours(17, 0, 0, 0))
      return {
        userId: user.id,
        start,
        end,
      }
    })

    await prisma.workShift.createMany({ data: shifts })
    console.log('Registros de ponto criados.')
  } else {
    console.log('Registros de ponto já existentes.')
  }

  console.log('✅ Seed finalizado com sucesso!')
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
