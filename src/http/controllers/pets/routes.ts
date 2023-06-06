import { FastifyInstance } from 'fastify'
import { CreatePetController } from './create-pet-controller'
import { FetchPetsByCityController } from './fetch-pets-by-city-controller'
import { GetPetByIdController } from './get-pet-by-id-controller'

const createPetController = new CreatePetController()
const fetchPetsByCityController = new FetchPetsByCityController()
const getPetByIdController = new GetPetByIdController()

export async function petsRoutes(app: FastifyInstance) {
  app.post('/pets/:org_id', createPetController.handle)
  app.get('/pets', fetchPetsByCityController.handle)
  app.get('/pets/:id', getPetByIdController.handle)
}
