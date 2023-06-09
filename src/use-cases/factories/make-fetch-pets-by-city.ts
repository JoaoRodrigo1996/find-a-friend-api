import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FetchPetsByCityUseCase } from '../fetch-pets-by-city'

export function makeFetchPetsByCity() {
  const petsRepository = new PrismaPetsRepository()
  const useCase = new FetchPetsByCityUseCase(petsRepository)

  return useCase
}
