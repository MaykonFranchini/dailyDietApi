import { hash } from 'bcryptjs'
import { prisma } from '../services/prisma'
import { UserAlreadyexistsError } from './errors/user-already-exists-error'
import { UsersRepository } from '../repositories/users-repository'
import { User } from '@prisma/client'
interface CreateUserUseCaseRequest {
  name: string
  email: string
  password: string
}

interface CreateUserUseCaseResponse {
  user: User
}

export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (userWithSameEmail) {
      throw new UserAlreadyexistsError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    })

    return { user }
  }
}
