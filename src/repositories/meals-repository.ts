import { Prisma, Meal } from '@prisma/client'
import { UpdateMeal } from './prisma/prisma-meals-repository'

export interface FindMeal {
  user_id: string
  id: string
}

export interface Metrics {
  total_meals: number
  total_meals_on_diet: number
  total_meals_off_diet: number
  best_sequence_on_diet?: Object
}

export interface MealsRepository {
  create(data: Prisma.MealCreateInput): Promise<Meal>
  listAll(user_id: string | undefined): Promise<Meal[]>
  findUnique({ id, user_id }: FindMeal): Promise<Meal | undefined>
  delete({ id, user_id }: FindMeal): Promise<void>
  update(data: UpdateMeal): Promise<Meal>
  metrics(user_id: string | undefined): Promise<Metrics>
}
