import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PrismaUsersRepository } from '../../repositories/prisma/prisma-users-repository'
import { AuthenticateUserUseCase } from '../../use-cases/authenticate-user'
import { InvalidCredentialsError } from '../../use-cases/errors/invalid-credentials-error'

export async function authenticateUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string(),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const userRepository = new PrismaUsersRepository()
    const authenticateUseCase = new AuthenticateUserUseCase(userRepository)
    const {
      name,
      email: validEmail,
      id,
      created_at,
    } = await authenticateUseCase.execute({
      email,
      password,
    })

    reply.cookie('user_id', id, {
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    })

    return reply.status(200).send({ name, validEmail, id, created_at })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }
    throw err
  }
}
