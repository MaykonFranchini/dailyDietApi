import { Meal } from '@prisma/client'
import { FindMeal, MealsRepository } from '../meals-repository'
import { CreateMeal } from '../prisma/prisma-meals-repository'
import { ResourceNotFoundError } from '../../use-cases/errors/resource-not-found-error'

export class InMemoryMealsRepository implements MealsRepository {
  public items: Meal[] = []

  async findUnique({ id, user_id }: FindMeal) {
    const meal = this.items.find(
      (item) => item.id === id && item.user_id === user_id,
    )

    if (!meal) {
      throw new ResourceNotFoundError()
    }

    return meal
  }

  async listAll(user_id: string) {
    const meals = this.items.filter((meal) => meal.user_id === user_id)

    return meals
  }

  async create(data: CreateMeal) {
    const meal = {
      id: 'meal-1',
      name: data.name,
      description: data.description,
      is_on_diet: data.is_on_diet,
      created_at: new Date(),
      user_id: data.user_id,
    }

    this.items.push(meal)

    return meal
  }
}
