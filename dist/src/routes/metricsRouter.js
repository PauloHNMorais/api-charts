"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metricsRoutes = metricsRoutes;
const getDatabaseInfo_1 = require("../useCases/metrics/getDatabaseInfo");
async function metricsRoutes(fastify) {
    fastify.get("/metrics", async (req, res) => {
        const data = await getDatabaseInfo_1.MeticsGetDatabaseInfoUseCase.execute();
        return data;
    });
}
