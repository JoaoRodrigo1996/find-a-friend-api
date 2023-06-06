import { randomUUID } from 'node:crypto'

import { Prisma, Pet } from '@prisma/client'
import {
  FindManyByCityParams,
  PetsRepository,
} from '@/repositories/pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      name: data.name,
      description: data.description,
      age_category: data.age_category,
      size: data.size,
      level_of_independence: data.level_of_independence,
      reccommended_envirionment_size: data.reccommended_envirionment_size,
      created_at: new Date(),
      org_id: data.org_id,
    }

    this.items.push(pet)

    return pet
  }

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async findManyByCity({ city, additionalFilters }: FindManyByCityParams) {
    const pets = this.items.filter((item) => {
      const orgCity = item.org_id

      if (additionalFilters) {
        const filters = Object.keys(
          additionalFilters,
        ) as (keyof typeof additionalFilters)[]
        for (const filter of filters) {
          if (item[filter] !== additionalFilters[filter]) {
            return false
          }
        }
      }

      return orgCity === city
    })

    return pets
  }
}
