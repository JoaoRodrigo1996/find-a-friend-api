import { FastifyInstance } from 'fastify'
import { CreateOrgController } from './create-org-controller'
import { AuthenticateOrgController } from './authenticate-org-controller'
import { RefreshTokenController } from './refresh-token-controller'

const createOrgController = new CreateOrgController()
const authenticateOrgController = new AuthenticateOrgController()
const refreshTokenController = new RefreshTokenController()

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', createOrgController.handle)
  app.post('/session', authenticateOrgController.handle)

  app.patch('/refresh', refreshTokenController.handle)
}
