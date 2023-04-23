import { describe, expect, beforeEach, it } from 'vitest'
import { InMemoryMealsRepository } from '../repositories/in-memory/in-memory-meal-repository'
import { MetricsUseCase } from './metrics'
import { CreateMealUseCase } from './create-meal'

describe('Metrics use case', async () => {
  let mealRepository: InMemoryMealsRepository
  let sut: MetricsUseCase
  let auxUseCase: CreateMealUseCase

  beforeEach(() => {
    mealRepository = new InMemoryMealsRepository()
    sut = new MetricsUseCase(mealRepository)
    auxUseCase = new CreateMealUseCase(mealRepository)
  })

  it('should be able to get number of all meals created', async () => {
    await auxUseCase.execute({
      name: 'Test meal',
      description: 'Test description',
      is_on_diet: true,
      user_id: 'tester-1',
    })
    await auxUseCase.execute({
      name: 'Test meal',
      description: 'Test description',
      is_on_diet: false,
      user_id: 'tester-1',
    })

    const metrics = await sut.execute({ user_id: 'tester-1' })

    expect(metrics.total_meals).toBe(2)
  })

  it('should be able to get the number of all meals on diet', async () => {
    await auxUseCase.execute({
      name: 'Test meal',
      description: 'Test description',
      is_on_diet: true,
      user_id: 'tester-1',
    })

    const metrics = await sut.execute({ user_id: 'tester-1' })

    expect(metrics.total_meals_on_diet).toBe(1)
  })

  it('should be able to get the number of all meals off diet', async () => {
    await auxUseCase.execute({
      name: 'Test meal',
      description: 'Test description',
      is_on_diet: false,
      user_id: 'tester-1',
    })
    await auxUseCase.execute({
      name: 'Test meal',
      description: 'Test description',
      is_on_diet: true,
      user_id: 'tester-1',
    })

    const metrics = await sut.execute({ user_id: 'tester-1' })

    expect(metrics.total_meals_off_diet).toBe(1)
  })

  it('should be able to get day with more meals on diet', async () => {
    await auxUseCase.execute({
      name: 'Test meal',
      description: 'Test description',
      is_on_diet: true,
      user_id: 'tester-1',
    })
    await auxUseCase.execute({
      name: 'Test meal',
      description: 'Test description',
      is_on_diet: true,
      user_id: 'tester-1',
    })

    const metrics = await sut.execute({ user_id: 'tester-1' })

    expect(metrics.best_sequence_on_diet).toEqual(expect.any(Object))
  })
})
