import { hash } from 'bcryptjs'
import { prisma } from '../services/prisma'
import { UserAlreadyexistsError } from './errors/user-already-exists-error'

interface CreateUserUseCaseRequest {
  name: string
  email: string
  password: string
}

export async function createUserUseCase({
  name,
  email,
  password,
}: CreateUserUseCaseRequest) {
  const password_hash = await hash(password, 6)

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userWithSameEmail) {
    throw new UserAlreadyexistsError()
  }

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
    },
  })

  return user
}
