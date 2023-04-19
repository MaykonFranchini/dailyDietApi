import { Meal } from '@prisma/client'
import { MealsRepository } from '../meals-repository'
import { CreateMeal } from '../prisma/prisma-meals-repository'

export class InMemoryMealsRepository implements MealsRepository {
  public items: Meal[] = []

  // async findById(id: string) {
  //   const user = this.items.find((user) => user.id === id)

  //   if (!user) {
  //     return null
  //   }
  //   return user
  // }

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
