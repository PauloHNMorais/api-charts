"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const dashboard_1 = require("./routes/dashboard");
const sales_1 = require("./routes/sales");
const metricsRouter_1 = require("./routes/metricsRouter");
const clients_1 = require("./routes/clients");
const products_1 = require("./routes/products");
const salers_1 = require("./routes/salers");
const port = process.env.PORT ? Number(process.env.PORT) : 3333;
async function bootstrap() {
    const fastify = (0, fastify_1.default)({
        logger: true,
    });
    // await fastify.register(cors, { origin: true });
    await fastify.register(clients_1.clientsRoutes);
    await fastify.register(dashboard_1.dashboardRoutes);
    await fastify.register(metricsRouter_1.metricsRoutes);
    await fastify.register(products_1.productsRoutes);
    await fastify.register(salers_1.salersRoutes);
    await fastify.register(sales_1.salesRoutes);
    await fastify.listen({ port, host: '0.0.0.0' });
}
bootstrap();
