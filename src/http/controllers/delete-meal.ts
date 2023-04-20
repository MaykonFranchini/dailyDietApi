import { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaMealsRepository } from '../../repositories/prisma/prisma-meals-repository'
import { DeleteMealUseCase } from '../../use-cases/delete-meal'
import { z } from 'zod'

export async function deleteMealController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const findMealRouteParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = findMealRouteParamsSchema.parse(request.params)

  const { user_id } = request.cookies

  try {
    const mealRepository = new PrismaMealsRepository()
    const deleteMealUseCase = new DeleteMealUseCase(mealRepository)

    await deleteMealUseCase.execute({ user_id, id })
  } catch (err) {
    console.error({
      err,
    })
    reply.status(404).send()
  }

  return reply.status(204).send('Meal deleted successfully')
}
