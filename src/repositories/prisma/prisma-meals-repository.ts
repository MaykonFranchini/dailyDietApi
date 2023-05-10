import { Prisma } from '@prisma/client'
import { FindMeal, MealsRepository } from '../meals-repository'
import { prisma } from '../../services/prisma'
import { ResourceNotFoundError } from '../../use-cases/errors/resource-not-found-error'

interface BestSeuqenceData {
  best_day: string
  meals_on_diet: string
}

export interface CreateMeal extends Prisma.MealCreateInput {
  user_id: string
}

export interface UpdateMeal extends Prisma.MealUpdateInput {
  user_id: string | undefined
  id: string
}

export class PrismaMealsRepository implements MealsRepository {
  async metrics(user_id: string) {
    const total_meals = await prisma.meal.count({
      where: {
        user_id,
      },
    })

    const total_meals_on_diet = await prisma.meal.findMany({
      where: {
        user_id,
        is_on_diet: true,
      },
    })

    const result =
      await prisma.$queryRaw`SELECT DATE(created_at) AS best_day, COUNT(meals.is_on_diet ) AS meals_on_diet
    FROM meals
    WHERE user_id = ${user_id} AND meals.is_on_diet = true
    GROUP BY best_day`

    const best_sequence = JSON.stringify(
      result,
      (key, value) => (typeof value === 'bigint' ? value.toString() : value), // return everything else unchanged
    )

    const [best_sequence_on_diet]: BestSeuqenceData[] =
      JSON.parse(best_sequence)

    return {
      total_meals,
      total_meals_on_diet: total_meals_on_diet.length,
      total_meals_off_diet: total_meals - total_meals_on_diet.length,
      best_sequence_on_diet,
    }
  }

  async update(data: UpdateMeal) {
    const meal = await prisma.meal.findUniqueOrThrow({
      where: {
        id: data.id,
      },
    })

    if (meal && meal.user_id === data.user_id) {
      const updatedMeal = await prisma.meal.update({
        where: {
          id: data.id,
        },
        data: {
          name: data.name,
          description: data.description,
          is_on_diet: data.is_on_diet,
          created_at: data.created_at,
        },
      })

      return updatedMeal
    }
    throw new ResourceNotFoundError()
  }

  async delete({ id, user_id }: FindMeal) {
    const meal = await prisma.meal.findUniqueOrThrow({
      where: {
        id,
      },
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
