import { makeCreateOrgUseCase } from '@/use-cases/factories/make-create-org-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export class CreateOrgController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const createOrgBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      city: z.string(),
      federal_unit: z.string(),
      password_hash: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
      zip_code: z.string(),
      address: z.string(),
      phone: z.string(),
    })

    const {
      address,
      city,
      email,
      federal_unit,
      name,
      password_hash,
      phone,
      zip_code,
    } = createOrgBodySchema.parse(request.body)

    try {
      const createOrgUseCase = makeCreateOrgUseCase()
      await createOrgUseCase.execute({
        name,
        email,
        city,
        address,
        federal_unit,
        password_hash,
        phone,
        zip_code,
      })
    } catch (error) {
      console.log(error)
    }

    return reply.status(201).send()
  }
}
