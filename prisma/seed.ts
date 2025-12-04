import { PrismaClient } from '../generated/prisma/client'
import dotenv from 'dotenv'

dotenv.config()

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')

  await prisma.order.deleteMany()
  await prisma.customer.deleteMany()
  await prisma.restaurant.deleteMany()

  await prisma.$executeRawUnsafe('ALTER SEQUENCE customer_id_seq RESTART WITH 1')
  await prisma.$executeRawUnsafe('ALTER SEQUENCE restaurant_id_seq RESTART WITH 1')
  await prisma.$executeRawUnsafe('ALTER SEQUENCE order_id_seq RESTART WITH 1')

  const customer1 = await prisma.customer.create({
    data: {
      name: 'John Doe',
      phone: '081234567890'
    }
  })

  const customer2 = await prisma.customer.create({
    data: {
      name: 'Jane Smith',
      phone: '081234567891'
    }
  })

  const customer3 = await prisma.customer.create({
    data: {
      name: 'Bob Johnson',
      phone: '081234567892'
    }
  })

  const restaurant1 = await prisma.restaurant.create({
    data: {
      name: 'Pizza Palace',
      description: 'Best pizza in town with authentic Italian recipes',
      is_opened: true
    }
  })

  const restaurant2 = await prisma.restaurant.create({
    data: {
      name: 'Burger King',
      description: 'Delicious burgers and fries',
      is_opened: true
    }
  })

  const restaurant3 = await prisma.restaurant.create({
    data: {
      name: 'Sushi Bar',
      description: 'Fresh sushi and Japanese cuisine',
      is_opened: false
    }
  })

  await prisma.order.create({
    data: {
      customer_id: customer1.id,
      restaurant_id: restaurant1.id,
      item_amount: 2
    }
  })

  await prisma.order.create({
    data: {
      customer_id: customer1.id,
      restaurant_id: restaurant2.id,
      item_amount: 3
    }
  })

  await prisma.order.create({
    data: {
      customer_id: customer2.id,
      restaurant_id: restaurant1.id,
      item_amount: 1
    }
  })

  await prisma.order.create({
    data: {
      customer_id: customer2.id,
      restaurant_id: restaurant2.id,
      item_amount: 4
    }
  })

  await prisma.order.create({
    data: {
      customer_id: customer3.id,
      restaurant_id: restaurant1.id,
      item_amount: 2
    }
  })

  console.log('Seeding completed!')
}

main()
  .catch((e) => {
    console.error('Error seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })