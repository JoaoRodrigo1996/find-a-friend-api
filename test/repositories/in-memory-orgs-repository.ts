import { randomUUID } from 'node:crypto'

import { Org, Prisma } from '@prisma/client'
import { OrgsRepository } from '@/repositories/orgs-repository'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []

  async create(data: Prisma.OrgUncheckedCreateInput) {
    const org = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      zip_code: data.zip_code,
      address: data.address,
      city: data.city,
      federal_unit: data.federal_unit,
      phone: data.phone,
    }

    this.items.push(org)

    return org
  }

  async findByEmail(email: string) {
    const org = this.items.find((item) => item.email === email)

    if (!org) {
      return null
    }

    return org
  }
}
