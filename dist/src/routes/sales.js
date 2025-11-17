"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.salesRoutes = salesRoutes;
const getSales_1 = require("../useCases/sales/getSales");
const deleteSale_1 = require("../useCases/sales/deleteSale");
const saveSale_1 = require("../useCases/sales/saveSale");
async function salesRoutes(fastify) {
    fastify.get("/sales", async (req, res) => {
        const data = await getSales_1.GetSalesUseCase.execute();
        return data;
    });
    fastify.post("/sales", async (req, res) => {
        const data = await saveSale_1.SaveSaleUseCase.execute(req.body);
        return data;
    });
    fastify.delete("/sales/:id", async (req, res) => {
        const { id } = req.params;
        const data = await deleteSale_1.DeleteSaleUseCase.execute(id);
        return data;
    });
}
