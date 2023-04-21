import { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaMealsRepository } from '../../repositories/prisma/prisma-meals-repository'
import { MetricsUseCase } from '../../use-cases/metrics'

export async function metricsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { user_id } = request.cookies
  let metrics

  try {
    const mealRepository = new PrismaMealsRepository()
    const metricsUseCase = new MetricsUseCase(mealRepository)
    metrics = await metricsUseCase.execute({ user_id })
  } catch (err) {
    reply.status(500).send()
  }

  reply.send(metrics)
}
