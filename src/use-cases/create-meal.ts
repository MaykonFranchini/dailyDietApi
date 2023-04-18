import { Meal } from '@prisma/client'
import { MealsRepository } from '../repositories/meals-repository'

interface CreateMealUseCaseRequest {
  name: string
  description: string
  is_on_diet: boolean
  user_id: string | undefined
}

interface CreateMealUseCaseResponse {
  meal: Meal
}

export class CreateMealUseCase {
  constructor(private mealRepository: MealsRepository) {}

  async execute({
    name,
    description,
    is_on_diet,
    user_id,
  }: CreateMealUseCaseRequest): Promise<CreateMealUseCaseResponse> {
    const meal = await this.mealRepository.create({
      name,
      description,
      is_on_diet,
      user_id,
    })

    return { meal }
  }
}
