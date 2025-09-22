import { FastifyInstance } from "fastify";
import { GetSalesUseCase } from "../useCases/sales/getSales";
import { DeleteSaleUseCase } from "../useCases/sales/deleteSale";
import { z } from "zod";
import { SaveSaleUseCase } from "../useCases/sales/saveSale";

export async function salesRoutes(fastify: FastifyInstance) {
  fastify.get("/sales", async (req, res) => {
    const data = await GetSalesUseCase.execute();
    return data;
  });

  fastify.post("/sales", async (req, res) => {
    const data = await SaveSaleUseCase.execute(req.body);
    return data;
  });

  fastify.delete("/sales/:id", async (req, res) => {
    const { id } = req.params as any;
    const data = await DeleteSaleUseCase.execute(id);
    return data;
  });
}
