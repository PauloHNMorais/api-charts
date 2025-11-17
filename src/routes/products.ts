import { FastifyInstance } from 'fastify';
import { GetProductsInfoUseCase } from '../useCases/products/getProductsInfo';

export async function productsRoutes(fastify: FastifyInstance) {
  fastify.get('/products/info', async (req, res) => {
    const data = await GetProductsInfoUseCase.execute();
    return data;
  });
}
