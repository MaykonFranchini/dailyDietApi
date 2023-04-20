import { Prisma } from '@prisma/client'
import { FindMeal, MealsRepository } from '../meals-repository'
import { prisma } from '../../services/prisma'
import { ResourceNotFoundError } from '../../use-cases/errors/resource-not-found-error'

export interface CreateMeal extends Prisma.MealCreateInput {
  user_id: string
}

export class PrismaMealsRepository implements MealsRepository {
  async delete({ id, user_id }: FindMeal) {
    const meal = await prisma.meal.findUniqueOrThrow({
      where: {
        id,
      },
    })

    console.log({
      meal,
      id,
      user_id,
    })

    if (meal && meal.user_id === user_id) {
      await prisma.meal.delete({
        where: {
          id,
        },
      })
      return
    }

    throw new ResourceNotFoundError()
  }

  async findUnique({ id, user_id }: FindMeal) {
    const meal = await prisma.meal.findUniqueOrThrow({
      where: {
        id,
      },
    })

    if (!meal || meal.user_id !== user_id) {
      throw new Error('Meal not found')
    }
    return meal
  }

  async listAll(user_id: string | undefined) {
    const meals = await prisma.meal.findMany({
      where: {
        user_id,
      },
    })
    return meals
  }

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
