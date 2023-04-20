import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryMealsRepository } from '../repositories/in-memory/in-memory-meal-repository'
import { ListAllMealsUseCase } from './list-all-meals'
import { CreateMealUseCase } from './create-meal'

let mealRepository: InMemoryMealsRepository
let sut: ListAllMealsUseCase
let auxUseCase: CreateMealUseCase

describe('List all meals use case', () => {
  beforeEach(() => {
    mealRepository = new InMemoryMealsRepository()
    auxUseCase = new CreateMealUseCase(mealRepository)
    sut = new ListAllMealsUseCase(mealRepository)
  })

  it('should be able to list all meal from a specific user', async () => {
    await auxUseCase.execute({
      name: 'Meal',
      description: 'Meal test',
      is_on_diet: false,
      user_id: 'user-id-1',
    })

    const { meals } = await sut.execute({ user_id: 'user-id-1' })

    expect(meals[0].name).toEqual('Meal')
  })
})
