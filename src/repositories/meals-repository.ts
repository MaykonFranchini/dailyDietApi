import { Prisma, Meal } from '@prisma/client'

export interface MealsRepository {
  create(data: Prisma.MealCreateInput): Promise<Meal>
}
