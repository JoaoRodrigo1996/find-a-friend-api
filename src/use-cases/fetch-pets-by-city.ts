import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found'

interface FetchPetsByCityUseCaseRequest {
  city: string
  additionalFilters?: {
    age_category?: 'YOUNG' | 'ADULT' | 'ELDERLY'
    size?: 'SMALL' | 'MEDIUM' | 'BIG'
    level_of_independence?: 'LOW' | 'MEDIUM' | 'HIGH'
    reccommended_envirionment_size?: 'SMALL' | 'MEDIUM' | 'BIG'
  }
}

interface FetchPetsByCityUseCaseResponse {
  pets: Pet[]
}

export class FetchPetsByCityUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    additionalFilters,
  }: FetchPetsByCityUseCaseRequest): Promise<FetchPetsByCityUseCaseResponse> {
    const pets = await this.petsRepository.findManyByCity({
      city,
      additionalFilters,
    })

    if (!pets) {
      throw new ResourceNotFoundError()
    }

    return { pets }
  }
}
