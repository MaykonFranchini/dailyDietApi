import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { createUserUseCase } from '../../use-cases/createUser'
import { UserAlreadyexistsError } from '../../use-cases/errors/user-already-exists-error'

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
    user = await createUserUseCase({ name, email, password })
  } catch (err) {
    if (err instanceof UserAlreadyexistsError) {
      return reply.status(409).send()
    }
    return reply.status(500).send()
  }

  reply.status(201).send({ user })
}
