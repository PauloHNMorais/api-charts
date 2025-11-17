"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientsRoutes = clientsRoutes;
const getClientsInfo_1 = require("../useCases/clients/getClientsInfo");
async function clientsRoutes(fastify) {
    fastify.get("/clients/info", async (req, res) => {
        const data = await getClientsInfo_1.GetClientsInfoUseCase.execute();
        return data;
    });
}
