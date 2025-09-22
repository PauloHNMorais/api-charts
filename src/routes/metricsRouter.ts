import { FastifyInstance } from "fastify";
import { MeticsGetDatabaseInfoUseCase } from "../useCases/metrics/getDatabaseInfo";

export async function metricsRoutes(fastify: FastifyInstance) {
  fastify.get("/metrics", async (req, res) => {
    const data = await MeticsGetDatabaseInfoUseCase.execute();
    return data;
  });
}
