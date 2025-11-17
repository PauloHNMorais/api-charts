import { FastifyInstance } from 'fastify';
import { GetSalersInfoUseCase } from '../useCases/salers/getSalesInfo';

export async function salersRoutes(fastify: FastifyInstance) {
  fastify.get('/salers/info', async (req, res) => {
    const data = await GetSalersInfoUseCase.execute();
    return data;
  });
}
