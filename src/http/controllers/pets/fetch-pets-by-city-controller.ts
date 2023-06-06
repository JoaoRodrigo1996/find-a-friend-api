import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found'
import { makeFetchPetsByCity } from '@/use-cases/factories/make-fetch-pets-by-city'

export class FetchPetsByCityController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const fetchPetsByCityBodySchema = z.object({
      city: z.string(),
      age_category: z.enum(['YOUNG', 'ADULT', 'ELDERLY']).optional(),
      size: z.enum(['SMALL', 'MEDIUM', 'BIG']).optional(),
      level_of_independence: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
      reccommended_envirionment_size: z
        .enum(['SMALL', 'MEDIUM', 'BIG'])
        .optional(),
    })

    const {
      city,
      age_category,
      level_of_independence,
      size,
      reccommended_envirionment_size,
    } = fetchPetsByCityBodySchema.parse(request.query)

    try {
      const fetchPetsByCityUseCase = makeFetchPetsByCity()
      const { pets } = await fetchPetsByCityUseCase.execute({
        city,
        additionalFilters: {
          age_category,
          level_of_independence,
          size,
          reccommended_envirionment_size,
        },
      })

      return reply.status(200).send({ pets })
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return reply.status(400).send({ message: error.message })
      }
      throw error
    }
  }
}
