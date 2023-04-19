import { beforeEach, describe, expect, it } from 'vitest'
import { CreateMealUseCase } from './create-meal'
import { InMemoryMealsRepository } from '../repositories/in-memory/in-memory-meal-repository'

let mealRepository: InMemoryMealsRepository
let sut: CreateMealUseCase

describe('Create user use case', () => {
  beforeEach(() => {
    mealRepository = new InMemoryMealsRepository()
    sut = new CreateMealUseCase(mealRepository)
  })

  it('should be able to create a user', async () => {
    const { meal } = await sut.execute({
      name: 'Meal',
      description: 'Meal test',
      is_on_diet: false,
      user_id: 'user-id-1',
    })

    expect(meal.id).toEqual(expect.any(String))
  })

  it('should not be able to create a meal without a user id', async () => {
    await expect(() =>
      sut.execute({
        name: 'Meal',
        description: 'Meal test',
        is_on_diet: false,
        user_id: undefined,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
