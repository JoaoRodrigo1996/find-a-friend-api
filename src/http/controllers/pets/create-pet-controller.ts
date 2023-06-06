import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export class CreatePetController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const createPetBodySchema = z.object({
      name: z.string(),
      description: z.string(),
      age_category: z.enum(['YOUNG', 'ADULT', 'ELDERLY']).default('ADULT'),
      level_of_independence: z
        .enum(['LOW', 'MEDIUM', 'HIGH'])
        .default('MEDIUM'),
      reccommended_envirionment_size: z
        .enum(['SMALL', 'MEDIUM', 'BIG'])
        .default('MEDIUM'),
      size: z.enum(['SMALL', 'MEDIUM', 'BIG']).default('MEDIUM'),
    })

    const createPetParamsSchema = z.object({
      org_id: z.string().uuid(),
    })

    const {
      name,
      age_category,
      description,
      level_of_independence,
      reccommended_envirionment_size,
      size,
    } = createPetBodySchema.parse(request.body)
    const { org_id } = createPetParamsSchema.parse(request.params)

    try {
      const createPetUseCase = makeCreatePetUseCase()
      await createPetUseCase.execute({
        name,
        age_category,
        description,
        level_of_independence,
        reccommended_envirionment_size,
        size,
        org_id,
      })
    } catch (error) {
      console.log(error)
    }

    return reply.status(201).send()
  }
}
