import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PrismaMealsRepository } from '../../repositories/prisma/prisma-meals-repository'
import { CreateMealUseCase } from '../../use-cases/create-meal'

export async function createMealController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createMealBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    is_on_diet: z.boolean(),
  })

  const { name, description, is_on_diet } = createMealBodySchema.parse(
    request.body,
  )

  const { user_id } = request.cookies

  try {
    const mealRepository = new PrismaMealsRepository()
    const createMealUseCase = new CreateMealUseCase(mealRepository)

    await createMealUseCase.execute({ name, description, is_on_diet, user_id })
  } catch (err) {
    return reply.status(500).send()
  }

  reply.status(201).send()
}
