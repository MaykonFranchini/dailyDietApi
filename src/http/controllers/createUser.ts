import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'

import { UserAlreadyexistsError } from '../../use-cases/errors/user-already-exists-error'
import { PrismaUsersRepository } from '../../repositories/prisma/prisma-users-repository'
import { CreateUserUseCase } from '../../use-cases/createUser'

export async function createUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createUserBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = createUserBodySchema.parse(request.body)
  let user
  try {
    const userRepository = new PrismaUsersRepository()
    const createUserUseCase = new CreateUserUseCase(userRepository)
    await createUserUseCase.execute({ name, email, password })
  } catch (err) {
    if (err instanceof UserAlreadyexistsError) {
      return reply.status(409).send({ message: err.message })
    }
    throw err
  }

  reply.status(201).send({ user })
}
