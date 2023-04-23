import { Meal } from '@prisma/client'
import { FindMeal, MealsRepository } from '../meals-repository'
import { CreateMeal } from '../prisma/prisma-meals-repository'
import { ResourceNotFoundError } from '../../use-cases/errors/resource-not-found-error'
import { bestSequenceOnDiet } from '../../utils/best-sequence-on-diet'

export class InMemoryMealsRepository implements MealsRepository {
  public items: Meal[] = []

  async metrics(user_id: string | undefined) {
    const total_meals_list = this.items.filter(
      (meal) => meal.user_id === user_id,
    )

    const meals_on_diet_list = total_meals_list.filter(
      (meal) => meal.is_on_diet === true,
    )

    const best_sequence_on_diet = bestSequenceOnDiet(total_meals_list)

    return {
      total_meals: total_meals_list.length,
      total_meals_on_diet: meals_on_diet_list.length,
      total_meals_off_diet: total_meals_list.length - meals_on_diet_list.length,
      best_sequence_on_diet,
    }
  }

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
