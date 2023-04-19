import { Meal } from '@prisma/client'
import { MealsRepository } from '../repositories/meals-repository'

interface ListAllMealsUseCaseRequest {
  user_id: string | undefined
}

interface ListAllMealsUseCaseResponse {
  meals: Meal[]
}

export class ListAllMealsUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute({
    user_id,
  }: ListAllMealsUseCaseRequest): Promise<ListAllMealsUseCaseResponse> {
    const meals = await this.mealsRepository.listAll(user_id)

    return { meals }
  }
}
