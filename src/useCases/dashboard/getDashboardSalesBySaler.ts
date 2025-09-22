import dayjs from "dayjs";
import { prisma } from "../../lib/prisma";

export class GetDashboardSalesBySalerUseCase {
    static async execute(startDate: Date, endDate: Date) {

        const [sales, salers] = await Promise.all([
            prisma.sale.groupBy({
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
            prisma.saler.findMany({
                where: {},
            }),
        ]);

        const data = sales.map(sale => ({
            sales: sale._sum.value,
            saler: salers.find(saler => saler.id === sale.salerId)
        }))


        return data
    }
}