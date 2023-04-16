import fastify from 'fastify'
import { prisma } from './services/prisma'

export const app = fastify()

const user = prisma.user.create({
  data: {
    name: 'Maykon Franchini',
    email: 'maykon@franchini.com',
  },
})

console.log(user)
