import { Prisma } from '@prisma/client'
import { UsersRepository } from '../users-repository'
import { prisma } from '../../services/prisma'

export class PrismaUsersRepository implements UsersRepository {
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
