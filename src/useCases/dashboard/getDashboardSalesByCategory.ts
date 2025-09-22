import dayjs from "dayjs";
import { prisma } from "../../lib/prisma";

export class GetDashboardSalesByCategoryUseCase {
    static async execute(startDate: Date, endDate: Date) {

        const [sales,] = await Promise.all([
            prisma.sale.findMany({
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

        const data = [] as any[]

        const groupedSales = sales.reduce((acc: any, sale) => {
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
            data.push(item)
        })

        return data
    }
}