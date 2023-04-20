import { Prisma, Meal } from '@prisma/client'

export interface FindMeal {
  user_id: string
  id: string
}

export interface MealsRepository {
  create(data: Prisma.MealCreateInput): Promise<Meal>
  listAll(user_id: string | undefined): Promise<Meal[]>
  findUnique({ id, user_id }: FindMeal): Promise<Meal | undefined>
}
