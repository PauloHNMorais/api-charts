"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.salersRoutes = salersRoutes;
const getSalesInfo_1 = require("../useCases/salers/getSalesInfo");
async function salersRoutes(fastify) {
    fastify.get("/salers/info", async (req, res) => {
        const data = await getSalesInfo_1.GetSalersInfoUseCase.execute();
        return data;
    });
}
