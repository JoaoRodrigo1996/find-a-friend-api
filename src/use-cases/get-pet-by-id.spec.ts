import { InMemoryPetsRepository } from 'test/repositories/in-memory-pets-repository'
import { GetPetByIdUseCase } from './get-pet-by-id'

let inMemoryPetsRepository: InMemoryPetsRepository
let sut: GetPetByIdUseCase

describe('Get pet by id', () => {
  beforeEach(() => {
    inMemoryPetsRepository = new InMemoryPetsRepository()
    sut = new GetPetByIdUseCase(inMemoryPetsRepository)
  })

  it('should be able to get a pet by id', async () => {
    const newPet = await inMemoryPetsRepository.create({
      id: 'id-1',
      name: 'Mila',
      description: 'Labrador',
      org_id: 'org-id-1',
      age_category: 'ADULT',
      level_of_independence: 'HIGH',
      reccommended_envirionment_size: 'BIG',
      size: 'BIG',
      created_at: new Date(),
    })

    const { pet } = await sut.execute({
      id: newPet.id,
    })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.name).toEqual('Mila')
  })
})
