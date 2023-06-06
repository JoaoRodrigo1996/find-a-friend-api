import { makeGetPetByIdUseCase } from '@/use-cases/factories/make-get-pet-by-id-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export class GetPetByIdController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const getPetByIdParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = getPetByIdParamsSchema.parse(request.params)

    const getPetByIdUseCase = makeGetPetByIdUseCase()

    const { pet } = await getPetByIdUseCase.execute({ id })

    return reply.status(200).send({ pet })
  }
}
