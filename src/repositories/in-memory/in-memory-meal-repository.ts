import { Meal } from '@prisma/client'
import { FindMeal, MealsRepository } from '../meals-repository'
import { CreateMeal } from '../prisma/prisma-meals-repository'
import { ResourceNotFoundError } from '../../use-cases/errors/resource-not-found-error'

export class InMemoryMealsRepository implements MealsRepository {
  public items: Meal[] = []

  async update(data: any) {
    const meal = this.items.findIndex(
      (itm) => itm.id === data.id && itm.user_id === data.user_id,
    )

    const updatedMeal = {
      id: data.id,
      name: data.name,
      description: data.description,
      is_on_diet: data.is_on_diet,
      created_at: data.created_at,
      user_id: data.user_id,
    }
    if (meal > -1) {
      this.items.splice(meal, 1, updatedMeal)
      return updatedMeal
    }
    throw new ResourceNotFoundError()
  }

  delete({ id, user_id }: FindMeal): Promise<void> {
    const mealIndex = this.items.findIndex(
      (meal) => meal.id === id && meal.user_id === user_id,
    )

    if (mealIndex > -1) {
      this.items.splice(mealIndex, 1)
    }

    throw new ResourceNotFoundError()
  }

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
