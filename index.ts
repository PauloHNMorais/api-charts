import Fastify from "fastify";
import { clientsRoutes } from "@/src/routes/clients";
import { dashboardRoutes } from "@/src/routes/dashboard";
import { metricsRoutes } from "@/src/routes/metricsRouter";
import { productsRoutes } from "@/src/routes/products";
import { salersRoutes } from "@/src/routes/salers";
import { salesRoutes } from "@/src/routes/sales";

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
  await fastify.listen({ port, host: "0.0.0.0" });
}

bootstrap();
