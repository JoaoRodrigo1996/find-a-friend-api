import request from 'supertest'

import { app } from '@/app'
import { randomUUID } from 'node:crypto'

describe('Create controller (e2e)', () => {
  beforeEach(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create', async () => {
    const response = await request(app.server).post('/pets').send({
      name: 'Mila',
      age_category: 'ADULT',
      description: 'Labrador',
      level_of_independence: 'MEDIUM',
      reccommended_envirionment_size: 'MEDIUM',
      size: 'BIG',
      org_id: randomUUID(),
    })

    expect(response.statusCode).toEqual(201)
  })
})
