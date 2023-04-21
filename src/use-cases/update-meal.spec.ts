import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryMealsRepository } from '../repositories/in-memory/in-memory-meal-repository'
import { CreateMealUseCase } from './create-meal'
import { UpdateMealUseCase } from './update-meal'

let mealRepository: InMemoryMealsRepository
let sut: UpdateMealUseCase
let auxUseCase: CreateMealUseCase

describe('Update meal use case', () => {
  beforeEach(() => {
    mealRepository = new InMemoryMealsRepository()
    auxUseCase = new CreateMealUseCase(mealRepository)
    sut = new UpdateMealUseCase(mealRepository)
  })

  it('should not be able to update user`s meal with invalid meal id', async () => {
    const { meal } = await auxUseCase.execute({
      name: 'Meal',
      description: 'Meal test',
      is_on_diet: false,
      user_id: 'user-id-1',
    })

    await expect(() =>
      sut.execute({
        id: 'Invalid-id',
        name: 'Updated meal',
        description: meal.description,
        created_at: meal.created_at.toDateString(),
        is_on_diet: meal.is_on_diet,
        user_id: meal.user_id,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should not be able to update a meal that not belongs to the user', async () => {
    const { meal } = await auxUseCase.execute({
      name: 'Meal',
      description: 'Meal test',
      is_on_diet: false,
      user_id: 'user-id-1',
    })

    await expect(() =>
      sut.execute({
        id: meal.id,
        name: 'Updated meal',
        description: meal.description,
        created_at: meal.created_at.toDateString(),
        is_on_diet: meal.is_on_diet,
        user_id: 'invalid-user-id',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
