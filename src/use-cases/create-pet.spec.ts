import { InMemoryPetsRepository } from 'test/repositories/in-memory-pets-repository'
import { CreatePetUseCase } from './create-pet'

let inMemoryPetsRepository: InMemoryPetsRepository
let sut: CreatePetUseCase

describe('Create pet', () => {
  beforeEach(() => {
    inMemoryPetsRepository = new InMemoryPetsRepository()
    sut = new CreatePetUseCase(inMemoryPetsRepository)
  })

  it('should be able to create a new pet', async () => {
    const { pet } = await sut.execute({
      name: 'Mila',
      description: 'description-test',
      age_category: 'ADULT',
      level_of_independence: 'HIGH',
      reccommended_envirionment_size: 'MEDIUM',
      size: 'MEDIUM',
      org_id: 'org-id-1',
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
