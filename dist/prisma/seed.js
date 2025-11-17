"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../generated/prisma");
const data_json_1 = __importDefault(require("./mock/data.json"));
function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}
const prisma = new prisma_1.PrismaClient();
async function main() {
    await prisma.sale.deleteMany({ where: {} });
    await prisma.product.deleteMany({ where: {} });
    await prisma.goal.deleteMany({ where: {} });
    await prisma.saler.deleteMany({ where: {} });
    await prisma.category.deleteMany({ where: {} });
    await prisma.client.deleteMany({ where: {} });
    const [clients, categories, salers] = await Promise.all([
        prisma.client.createMany({ data: data_json_1.default.Client }),
        prisma.category.createMany({ data: data_json_1.default.Category }),
        prisma.saler.createMany({ data: data_json_1.default.Saler }),
    ]);
    const products = await prisma.product.createMany({ data: data_json_1.default.Product });
    const sales = await prisma.sale.createMany({
        data: data_json_1.default.Sale.map((item) => ({
            value: data_json_1.default.Product.find((prod) => +prod.id === +item.productId)?.price || 0,
            date: new Date(item.date),
            clientId: +item.clientId,
            productId: +item.productId,
            salerId: +item.salerId,
            id: +item.id,
            rating: randomIntFromInterval(0, 5),
        })),
    });
    const goals = await prisma.goal.createMany({ data: data_json_1.default.Goal });
}
main();
