import { InMemoryPetsRepository } from 'test/repositories/in-memory-pets-repository'
import { FetchPetsByCityUseCase } from './fetch-pets-by-city'

let inMemoryPetsRepository: InMemoryPetsRepository
let sut: FetchPetsByCityUseCase

describe('Fetch pets by city', () => {
  beforeEach(() => {
    inMemoryPetsRepository = new InMemoryPetsRepository()
    sut = new FetchPetsByCityUseCase(inMemoryPetsRepository)
  })

  it('should be able to fetch pets by city', async () => {
    await inMemoryPetsRepository.create({
      name: 'Mila',
      age_category: 'ADULT',
      description: 'Labrador',
      level_of_independence: 'HIGH',
      org_id: 'Barra Mansa',
      reccommended_envirionment_size: 'BIG',
      size: 'BIG',
    })

    await inMemoryPetsRepository.create({
      name: 'Guga',
      age_category: 'ADULT',
      description: 'Labrador',
      level_of_independence: 'HIGH',
      org_id: 'Barra Mansa',
      reccommended_envirionment_size: 'BIG',
      size: 'BIG',
    })

    const { pets } = await sut.execute({
      city: 'Barra Mansa',
    })

    expect(pets).toHaveLength(2)
  })

  it('should be able to fetch pets by age category', async () => {
    await inMemoryPetsRepository.create({
      name: 'Pépa',
      age_category: 'ADULT',
      description: 'Labrador',
      level_of_independence: 'HIGH',
      org_id: 'Barra Mansa',
      reccommended_envirionment_size: 'BIG',
      size: 'BIG',
    })

    await inMemoryPetsRepository.create({
      name: 'Guga',
      age_category: 'YOUNG',
      description: 'Labrador',
      level_of_independence: 'HIGH',
      org_id: 'Barra Mansa',
      reccommended_envirionment_size: 'BIG',
      size: 'BIG',
    })

    const { pets } = await sut.execute({
      city: 'Barra Mansa',
      additionalFilters: {
        age_category: 'ADULT',
      },
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([
      expect.objectContaining({
        name: 'Pépa',
      }),
    ])
  })

  it('should be able to fetch pets by level of independence', async () => {
    await inMemoryPetsRepository.create({
      name: 'Zé',
      age_category: 'YOUNG',
      description: 'Labrador',
      level_of_independence: 'LOW',
      org_id: 'Barra Mansa',
      reccommended_envirionment_size: 'BIG',
      size: 'BIG',
    })

    await inMemoryPetsRepository.create({
      name: 'Guga',
      age_category: 'YOUNG',
      description: 'Labrador',
      level_of_independence: 'HIGH',
      org_id: 'Barra Mansa',
      reccommended_envirionment_size: 'BIG',
      size: 'BIG',
    })

    const { pets } = await sut.execute({
      city: 'Barra Mansa',
      additionalFilters: {
        age_category: 'YOUNG',
        level_of_independence: 'LOW',
      },
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([
      expect.objectContaining({
        name: 'Zé',
      }),
    ])
  })

  it('should be able to fetch pets by size', async () => {
    await inMemoryPetsRepository.create({
      name: 'Éd',
      age_category: 'YOUNG',
      description: 'Labrador',
      level_of_independence: 'LOW',
      org_id: 'Barra Mansa',
      reccommended_envirionment_size: 'BIG',
      size: 'BIG',
    })

    await inMemoryPetsRepository.create({
      name: 'Guga',
      age_category: 'YOUNG',
      description: 'Labrador',
      level_of_independence: 'HIGH',
      org_id: 'Barra Mansa',
      reccommended_envirionment_size: 'BIG',
      size: 'SMALL',
    })

    const { pets } = await sut.execute({
      city: 'Barra Mansa',
      additionalFilters: {
        age_category: 'YOUNG',
        level_of_independence: 'LOW',
        size: 'BIG',
      },
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([
      expect.objectContaining({
        name: 'Éd',
      }),
    ])
  })
})
