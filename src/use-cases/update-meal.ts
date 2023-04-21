import { Meal } from '@prisma/client'
import { MealsRepository } from '../repositories/meals-repository'

interface UpdateMealUseCaseRequest {
  id: string
  name: string
  description: string
  created_at: string
  is_on_diet: boolean
  user_id: string | undefined
}

interface UpdateMealUseCaseResponse {
  meal: Meal
}

export class UpdateMealUseCase {
  constructor(private mealRepository: MealsRepository) {}

  async execute({
    id,
    is_on_diet,
    name,
    description,
    created_at,
    user_id,
  }: UpdateMealUseCaseRequest): Promise<UpdateMealUseCaseResponse> {
    const meal = await this.mealRepository.update({
      id,
      is_on_diet,
      name,
      description,
      created_at,
      user_id,
    })

    return { meal }
  }
}
