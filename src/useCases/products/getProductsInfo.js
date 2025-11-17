"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetProductsInfoUseCase = void 0;
const prisma_1 = require("../../lib/prisma");
class GetProductsInfoUseCase {
    static async execute() {
        const sales = await prisma_1.prisma.product.findMany({
            where: {},
            orderBy: {
                name: "asc",
            },
            select: {
                id: true,
                name: true,
            },
        });
        return sales;
    }
}
exports.GetProductsInfoUseCase = GetProductsInfoUseCase;
