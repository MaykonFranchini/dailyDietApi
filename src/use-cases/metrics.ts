import { MealsRepository } from '../repositories/meals-repository'

interface MetricsUseCaseRequest {
  user_id: string | undefined
}

interface MetricsUseCaseResponse {
  total_meals: number
  total_meals_on_diet: number
  total_meals_off_diet: number
  best_sequence_on_diet?: Object
}

export class MetricsUseCase {
  constructor(private mealRepository: MealsRepository) {}

  async execute({
    user_id,
  }: MetricsUseCaseRequest): Promise<MetricsUseCaseResponse> {
    const metrics = await this.mealRepository.metrics(user_id)

    return metrics
  }
}
