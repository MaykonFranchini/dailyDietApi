import { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaMealsRepository } from '../../repositories/prisma/prisma-meals-repository'
import { ListAllMealsUseCase } from '../../use-cases/list-all-meals'

export async function listAllMealsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { user_id } = request.cookies
  let meals

  try {
    const mealRepository = new PrismaMealsRepository()
    const createMealUseCase = new ListAllMealsUseCase(mealRepository)

    meals = await createMealUseCase.execute({ user_id })
  } catch (err) {
    return reply.status(500).send()
  }

  reply.status(200).send(meals)
}
