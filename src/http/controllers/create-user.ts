import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'

import { UserAlreadyexistsError } from '../../use-cases/errors/user-already-exists-error'
import { PrismaUsersRepository } from '../../repositories/prisma/prisma-users-repository'
import { CreateUserUseCase } from '../../use-cases/create-user'

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

  try {
    const userRepository = new PrismaUsersRepository()
    const createUserUseCase = new CreateUserUseCase(userRepository)
    const { user } = await createUserUseCase.execute({ name, email, password })

    reply.cookie('user_id', user.id, {
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    })
  } catch (err) {
    if (err instanceof UserAlreadyexistsError) {
      return reply.status(409).send({ message: err.message })
    }
    throw err
  }

  reply.status(201).send()
}
