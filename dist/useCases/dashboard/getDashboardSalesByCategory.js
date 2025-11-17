"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetDashboardSalesByCategoryUseCase = void 0;
const prisma_1 = require("../../lib/prisma");
class GetDashboardSalesByCategoryUseCase {
    static async execute(startDate, endDate) {
        const [sales,] = await Promise.all([
            prisma_1.prisma.sale.findMany({
                where: {
                    date: {
                        gte: startDate,
                        lte: endDate
                    }
                },
                orderBy: {
                    date: "desc"
                },
                include: {
                    Product: {
                        include: {
                            Category: true
                        }
                    }
                }
            }),
        ]);
        const data = [];
        const groupedSales = sales.reduce((acc, sale) => {
            const key = sale.Product.categoryId?.toString() || "0"; // Formato "YYYY-MM"
            if (!acc[key]) {
                acc[key] = {
                    value: 0,
                    category: sale.Product.Category
                };
            }
            acc[key].value += Number(Number((sale.value || 0) / 1000).toFixed(2));
            return acc;
        }, {});
        Object.values(groupedSales).forEach(item => {
            data.push(item);
        });
        return data;
    }
}
exports.GetDashboardSalesByCategoryUseCase = GetDashboardSalesByCategoryUseCase;
