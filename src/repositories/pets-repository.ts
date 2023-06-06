import { Pet, Prisma } from '@prisma/client'

export interface FindManyByCityParams {
  city: string
  additionalFilters?: {
    age_category?: 'YOUNG' | 'ADULT' | 'ELDERLY'
    size?: 'SMALL' | 'MEDIUM' | 'BIG'
    level_of_independence?: 'LOW' | 'MEDIUM' | 'HIGH'
    reccommended_envirionment_size?: 'SMALL' | 'MEDIUM' | 'BIG'
  }
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  findManyByCity(params: FindManyByCityParams): Promise<Pet[] | null>
}
