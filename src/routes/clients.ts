import { FastifyInstance } from 'fastify';
import { GetClientsInfoUseCase } from '../useCases/clients/getClientsInfo';

export async function clientsRoutes(fastify: FastifyInstance) {
  fastify.get('/clients/info', async (req, res) => {
    const data = await GetClientsInfoUseCase.execute();
    return data;
  });
}
