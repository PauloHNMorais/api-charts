"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeticsGetDatabaseInfoUseCase = void 0;
const prisma_1 = require("../../lib/prisma");
class MeticsGetDatabaseInfoUseCase {
    static async execute() {
        const [categories, clients, goals, products, sales, salers] = await Promise.all([
            prisma_1.prisma.category.count({ where: {} }),
            prisma_1.prisma.client.count({ where: {} }),
            prisma_1.prisma.goal.count({ where: {} }),
            prisma_1.prisma.product.count({ where: {} }),
            prisma_1.prisma.sale.count({ where: {} }),
            prisma_1.prisma.saler.count({ where: {} }),
        ]);
        const data = {
            categories,
            clients,
            goals,
            products,
            sales,
            salers
        };
        return data;
    }
}
exports.MeticsGetDatabaseInfoUseCase = MeticsGetDatabaseInfoUseCase;
