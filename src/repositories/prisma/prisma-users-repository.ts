import { Prisma } from '@prisma/client'
import { UsersRepository } from '../users-repository'
import { prisma } from '../../services/prisma'

export class PrismaUsersRepository implements UsersRepository {
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    if (!user) {
      return null
    }
    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password_hash: data.password_hash,
      },
    })

    return user
  }
}
