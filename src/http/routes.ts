import { FastifyInstance } from 'fastify'
import { createUserController } from './controllers/create-user'
import { authenticateUserController } from './controllers/authenticate-user'
import { createMealController } from './controllers/create-meal'
import { checkUserIdExists } from './middlewares/check-user-id-exists'
import { listAllMealsController } from './controllers/list-all-meals'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', createUserController)
  app.post('/sessions', authenticateUserController)
  app.post('/meals', { preHandler: [checkUserIdExists] }, createMealController)
  app.get('/meals', { preHandler: [checkUserIdExists] }, listAllMealsController)
}
