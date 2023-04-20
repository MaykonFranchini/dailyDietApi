import { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaMealsRepository } from '../../repositories/prisma/prisma-meals-repository'
import { FindMealUseCase } from '../../use-cases/find-meal'
import { z } from 'zod'

export async function FindMealController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const findMealRouteParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = findMealRouteParamsSchema.parse(request.params)

  const { user_id } = request.cookies
  let meal

  try {
    const mealRepository = new PrismaMealsRepository()
    const findMealUseCase = new FindMealUseCase(mealRepository)

    meal = await findMealUseCase.execute({ user_id, id })
  } catch (err) {
    return reply.status(404).send()
  }

  reply.status(200).send(meal)
}
