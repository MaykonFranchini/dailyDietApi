import { Meal } from '@prisma/client'
import { MealsRepository } from '../repositories/meals-repository'

interface FindMealUseCaseRequest {
  id: string
  user_id: string | undefined
}

interface FindMealUseCaseResponse {
  meal: Meal | undefined
}

export class FindMealUseCase {
  constructor(private mealRepository: MealsRepository) {}

  async execute({
    id,
    user_id,
  }: FindMealUseCaseRequest): Promise<FindMealUseCaseResponse> {
    if (!user_id) {
      throw new Error('Missing user id.')
    }
    const meal = await this.mealRepository.findUnique({ id, user_id })

    return { meal }
  }
}
