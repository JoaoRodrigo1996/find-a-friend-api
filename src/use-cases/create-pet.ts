import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface CreatePetUseCaseRequest {
  name: string
  description: string
  age_category: 'YOUNG' | 'ADULT' | 'ELDERLY'
  size: 'SMALL' | 'MEDIUM' | 'BIG'
  level_of_independence: 'LOW' | 'MEDIUM' | 'HIGH'
  reccommended_envirionment_size: 'SMALL' | 'MEDIUM' | 'BIG'
  org_id: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    name,
    description,
    age_category,
    level_of_independence,
    reccommended_envirionment_size,
    size,
    org_id,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const pet = await this.petsRepository.create({
      name,
      description,
      age_category,
      level_of_independence,
      reccommended_envirionment_size,
      size,
      created_at: new Date(),
      org_id,
    })

    return { pet }
  }
}
