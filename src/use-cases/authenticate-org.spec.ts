import { hash } from 'bcryptjs'

import { InMemoryOrgsRepository } from 'test/repositories/in-memory-orgs-repository'
import { AuthenticateOrgUseCase } from './authenticate-org'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let inMemoryOrgsRepository: InMemoryOrgsRepository
let sut: AuthenticateOrgUseCase

describe('Authenticate Org', () => {
  beforeEach(() => {
    inMemoryOrgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateOrgUseCase(inMemoryOrgsRepository)
  })

  it('should be able to authenticate a org', async () => {
    await inMemoryOrgsRepository.create({
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
      city: 'Barra Mansa',
      address: 'Brazil',
      federal_unit: 'RJ',
      name: 'Org name',
      phone: '999999999',
      zip_code: '27331340',
    })

    const { org } = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await inMemoryOrgsRepository.create({
      name: 'Org name',
      address: 'Brazil',
      city: 'Barra Mansa',
      federal_unit: 'RJ',
      zip_code: '27331340',
      phone: '999999999',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '654321',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
