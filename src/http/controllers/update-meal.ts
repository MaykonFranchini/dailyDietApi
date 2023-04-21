import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PrismaMealsRepository } from '../../repositories/prisma/prisma-meals-repository'
import { UpdateMealUseCase } from '../../use-cases/update-meal'

export async function updateMealController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updateMealBodySchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    is_on_diet: z.boolean(),
    created_at: z.string(),
  })

  const { id, name, description, is_on_diet, created_at } =
    updateMealBodySchema.parse(request.body)

  const { user_id } = request.cookies

  let meal

  try {
    const mealRepository = new PrismaMealsRepository()
    const updateMealUseCase = new UpdateMealUseCase(mealRepository)
    meal = await updateMealUseCase.execute({
      id,
      name,
      description,
      is_on_diet,
      created_at,
      user_id,
    })
  } catch (err) {
    return reply.status(404).send()
  }

  return reply.status(204).send(meal)
}
