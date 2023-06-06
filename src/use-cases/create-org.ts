import { hash } from 'bcryptjs'

import { Org } from '@prisma/client'
import { OrgsRepository } from '@/repositories/orgs-repository'

interface CreateOrgUseCaseRequest {
  name: string
  email: string
  password_hash: string
  zip_code: string
  address: string
  city: string
  federal_unit: string
  phone: string
}

interface CreateOrgUseCaseResponse {
  org: Org
}

export class CreateOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    name,
    email,
    city,
    federal_unit,
    password_hash,
    zip_code,
    address,
    phone,
  }: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse> {
    const password_hashed = await hash(password_hash, 6)

    const org = await this.orgsRepository.create({
      name,
      email,
      city,
      federal_unit,
      password_hash: password_hashed,
      zip_code,
      address,
      phone,
    })

    return { org }
  }
}
