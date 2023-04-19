import { Meal } from '@prisma/client'
import { MealsRepository } from '../meals-repository'
import { CreateMeal } from '../prisma/prisma-meals-repository'

export class InMemoryMealsRepository implements MealsRepository {
  public items: Meal[] = []

  async listAll(user_id: string) {
    const meals = this.items.filter((meal) => meal.user_id === user_id)

    return meals
  }

  async create(data: CreateMeal) {
    const meal = {
      id: 'user-1',
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
