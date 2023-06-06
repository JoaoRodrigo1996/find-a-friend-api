import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { GetPetByIdUseCase } from '../get-pet-by-id'

export function makeGetPetByIdUseCase() {
  const petsRepositoryUseCase = new PrismaPetsRepository()
  const useCase = new GetPetByIdUseCase(petsRepositoryUseCase)

  return useCase
}
