import { MealsRepository } from '../repositories/meals-repository'

interface DeleteMealUseCaseRequest {
  id: string
  user_id: string | undefined
}

export class DeleteMealUseCase {
  constructor(private mealRepository: MealsRepository) {}

  async execute({ id, user_id }: DeleteMealUseCaseRequest): Promise<void> {
    if (!user_id) {
      throw new Error('Missing user id.')
    }

    await this.mealRepository.delete({ id, user_id })
  }
}
