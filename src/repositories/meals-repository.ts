import { Prisma, Meal } from '@prisma/client'
import { UpdateMeal } from './prisma/prisma-meals-repository'

export interface FindMeal {
  user_id: string
  id: string
}

export interface MealsRepository {
  create(data: Prisma.MealCreateInput): Promise<Meal>
  listAll(user_id: string | undefined): Promise<Meal[]>
  findUnique({ id, user_id }: FindMeal): Promise<Meal | undefined>
  delete({ id, user_id }: FindMeal): Promise<void>
  update(data: UpdateMeal): Promise<Meal>
}
