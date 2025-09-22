import dayjs from "dayjs";
import { prisma } from "../../lib/prisma";

export class GetDashboardSalesUseCase {
    static async execute(startDate: Date, endDate: Date) {

        const [sales, goals] = await Promise.all([
            prisma.sale.findMany({
                where: {
                    date: {
                        gte: startDate,
                        lte: endDate
                    }
                },
                orderBy: {
                    date: "desc"
                }
            }),
            prisma.goal.groupBy({
                by: ["year", "month"],
                _sum: {
                    totalGoal: true
                },
                where: {
                    year: {
                        gte: +dayjs(startDate).format("YYYY"),
                        lte: +dayjs(endDate).format("YYYY"),
                    },
                    // month: {
                    //     gte: +dayjs(params.startDate).format("MM"),
                    //     lte: +dayjs(params.endDate).format("MM"),
                    // },
                }
            }),
        ]);

        const groupedSales = sales.reduce((acc: any, sale) => {
            const date = new Date(sale.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1; // Adiciona 1 porque os meses começam do índice 0
            const key = `${year}-${String(month).padStart(2, '0')}`; // Formato "YYYY-MM"

            if (!acc[key]) {
                acc[key] = 0;
            }
            acc[key] += sale.value || 0;

            return acc;
        }, {});

        const resultsSales = Object.entries(groupedSales).map(([period, totalValue]) => ({
            period,
            totalValue,
        }));

        const data = resultsSales.map(sale => ({
            date: dayjs(sale.period).format("MMM/YY"),
            sales: sale.totalValue,
            goal: goals.find(x =>
                x.year === +dayjs(sale.period).format("YYYY")
                && x.month === +dayjs(sale.period).format("MM")
            )?._sum.totalGoal || 0 / 2
        }))

        data.forEach(item => {
            item.goal /= 3
        })

        return data
    }
}