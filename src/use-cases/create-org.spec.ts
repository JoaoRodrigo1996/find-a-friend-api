import { InMemoryOrgsRepository } from 'test/repositories/in-memory-orgs-repository'
import { CreateOrgUseCase } from './create-org'

let inMemoryOrgsRepository: InMemoryOrgsRepository
let sut: CreateOrgUseCase

describe('Create a new org', () => {
  beforeEach(() => {
    inMemoryOrgsRepository = new InMemoryOrgsRepository()
    sut = new CreateOrgUseCase(inMemoryOrgsRepository)
  })

  it('should be able to create a new org', async () => {
    const { org } = await sut.execute({
      name: 'Org 1',
      address: 'Barra Mansa',
      phone: '999999999',
      city: 'Barra Mansa',
      email: 'org@example.com',
      federal_unit: 'RJ',
      password_hash: '123456',
      zip_code: '27331340',
    })

    expect(org.id).toEqual(expect.any(String))
  })
})
