import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import { clientsRoutes } from "@/src/routes/clients";
import { dashboardRoutes } from "@/src/routes/dashboard";
import { metricsRoutes } from "@/src/routes/metricsRouter";
import { productsRoutes } from "@/src/routes/products";
import { salersRoutes } from "@/src/routes/salers";
import { salesRoutes } from "@/src/routes/sales";

const port = process.env.PORT ? Number(process.env.PORT) : 3333;

async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const authHeader = request.headers.authorization;

  // 1. Verifica se o cabeçalho Authorization está presente
  if (!authHeader) {
    return reply
      .status(401)
      .send({ message: "Token de autorização não fornecido." });
  }

  // 2. Verifica o formato do token (espera-se 'Bearer <token>')
  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    return reply
      .status(401)
      .send({ message: "Formato de token inválido. Use 'Bearer <token>'." });
  }

  // 3. **Implementação de Validação REAL do Token**
  //    Abaixo está um EXEMPLO SIMPLES de verificação.
  //    Em produção, você usaria uma biblioteca como `jsonwebtoken` para validar um JWT.

  // Exemplo de verificação simples:
  if (token !== process.env.API_SECRET) {
    return reply.status(401).send({ message: "Token inválido ou incorreto." });
  }

  // Se for bem-sucedido, a requisição continua.
}

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  });

  // await fastify.register(cors, { origin: true });
  fastify.addHook("preHandler", authenticate);
  await fastify.register(clientsRoutes);
  await fastify.register(dashboardRoutes);
  await fastify.register(metricsRoutes);
  await fastify.register(productsRoutes);
  await fastify.register(salersRoutes);
  await fastify.register(salesRoutes);
  await fastify.listen({ port, host: "0.0.0.0" });
}

bootstrap();
