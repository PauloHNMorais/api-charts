import Fastify from 'fastify';
import { dashboardRoutes } from './routes/dashboard';
import { salesRoutes } from './routes/sales';
import { metricsRoutes } from './routes/metricsRouter';
import { clientsRoutes } from './routes/clients';
import { productsRoutes } from './routes/products';
import { salersRoutes } from './routes/salers';

const port = process.env.PORT ? Number(process.env.PORT) : 3333;

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  });

  // await fastify.register(cors, { origin: true });
  await fastify.register(clientsRoutes);
  await fastify.register(dashboardRoutes);
  await fastify.register(metricsRoutes);
  await fastify.register(productsRoutes);
  await fastify.register(salersRoutes);
  await fastify.register(salesRoutes);

  await fastify.listen({ port, host: '0.0.0.0' });
}

bootstrap();
