import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryMealsRepository } from '../repositories/in-memory/in-memory-meal-repository'
import { CreateMealUseCase } from './create-meal'

import { DeleteMealUseCase } from './delete-meal'

let mealRepository: InMemoryMealsRepository
let sut: DeleteMealUseCase
let auxUseCase: CreateMealUseCase

describe('Delete meal use case', () => {
  beforeEach(() => {
    mealRepository = new InMemoryMealsRepository()
    auxUseCase = new CreateMealUseCase(mealRepository)
    sut = new DeleteMealUseCase(mealRepository)
  })

  it('should not be able to delete user`s meal with invalid  meal id', async () => {
    await auxUseCase.execute({
      name: 'Meal',
      description: 'Meal test',
      is_on_diet: false,
      user_id: 'user-id-1',
    })

    await expect(() =>
      sut.execute({ user_id: 'user-id-2', id: 'meal-2' }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should not be able to delete a meal that not belongs to the user', async () => {
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
