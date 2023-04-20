import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryMealsRepository } from '../repositories/in-memory/in-memory-meal-repository'
import { CreateMealUseCase } from './create-meal'
import { FindMealUseCase } from './find-meal'

let mealRepository: InMemoryMealsRepository
let sut: FindMealUseCase
let auxUseCase: CreateMealUseCase

describe('Find meal use case', () => {
  beforeEach(() => {
    mealRepository = new InMemoryMealsRepository()
    auxUseCase = new CreateMealUseCase(mealRepository)
    sut = new FindMealUseCase(mealRepository)
  })

  it('should be able to get a specific user meal`s', async () => {
    await auxUseCase.execute({
      name: 'Meal',
      description: 'Meal test',
      is_on_diet: false,
      user_id: 'user-id-1',
    })

    const { meal } = await sut.execute({ user_id: 'user-id-1', id: 'meal-1' })

    expect(meal?.id).toEqual('meal-1')
  })

  it('should not be able to get a specific meal that not belongs to the user', async () => {
    await auxUseCase.execute({
      name: 'Meal',
      description: 'Meal test',
      is_on_diet: false,
      user_id: 'user-id-1',
    })

    await expect(() =>
      sut.execute({ user_id: 'user-id-2', id: 'meal-1' }),
    ).rejects.toBeInstanceOf(Error)
  })
})
