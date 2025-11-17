"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsRoutes = productsRoutes;
const getProductsInfo_1 = require("../useCases/products/getProductsInfo");
async function productsRoutes(fastify) {
    fastify.get("/products/info", async (req, res) => {
        const data = await getProductsInfo_1.GetProductsInfoUseCase.execute();
        return data;
    });
}
