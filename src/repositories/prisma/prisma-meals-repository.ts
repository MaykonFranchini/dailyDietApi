import { Prisma } from '@prisma/client'
import { MealsRepository } from '../meals-repository'
import { prisma } from '../../services/prisma'

export interface CreateMeal extends Prisma.MealCreateInput {
  user_id: string
}

export class PrismaMealsRepository implements MealsRepository {
  async create(data: CreateMeal) {
    const meal = await prisma.meal.create({
      data: {
        name: data.name,
        description: data.description,
        is_on_diet: data.is_on_diet,
        user_id: data.user_id,
      },
    })

    return meal
  }
}
