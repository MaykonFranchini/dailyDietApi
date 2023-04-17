import { FastifyInstance } from 'fastify'
import { createUserController } from './controllers/register'
// import { checkUserIdExists } from './middlewares/check-user-id-exists'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', createUserController)
}

//, { preHandler: [checkUserIdExists] }
