"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetDashboardSalesBySalerUseCase = void 0;
const prisma_1 = require("../../lib/prisma");
class GetDashboardSalesBySalerUseCase {
    static async execute(startDate, endDate) {
        const [sales, salers] = await Promise.all([
            prisma_1.prisma.sale.groupBy({
                by: ["salerId"],
                where: {
                    date: {
                        gte: startDate,
                        lte: endDate
                    }
                },
                _sum: {
                    value: true
                },
                orderBy: {
                    _sum: {
                        value: "desc"
                    }
                }
            }),
            prisma_1.prisma.saler.findMany({
                where: {},
            }),
        ]);
        const data = sales.map(sale => ({
            sales: sale._sum.value,
            saler: salers.find(saler => saler.id === sale.salerId)
        }));
        return data;
    }
}
exports.GetDashboardSalesBySalerUseCase = GetDashboardSalesBySalerUseCase;
