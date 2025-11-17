"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetDashboardSalesUseCase = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const prisma_1 = require("../../lib/prisma");
class GetDashboardSalesUseCase {
    static async execute(startDate, endDate) {
        const [sales, goals] = await Promise.all([
            prisma_1.prisma.sale.findMany({
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
            prisma_1.prisma.goal.groupBy({
                by: ["year", "month"],
                _sum: {
                    totalGoal: true
                },
                where: {
                    year: {
                        gte: +(0, dayjs_1.default)(startDate).format("YYYY"),
                        lte: +(0, dayjs_1.default)(endDate).format("YYYY"),
                    },
                    // month: {
                    //     gte: +dayjs(params.startDate).format("MM"),
                    //     lte: +dayjs(params.endDate).format("MM"),
                    // },
                }
            }),
        ]);
        const groupedSales = sales.reduce((acc, sale) => {
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
            date: (0, dayjs_1.default)(sale.period).format("MMM/YY"),
            sales: sale.totalValue,
            goal: goals.find(x => x.year === +(0, dayjs_1.default)(sale.period).format("YYYY")
                && x.month === +(0, dayjs_1.default)(sale.period).format("MM"))?._sum.totalGoal || 0 / 2
        }));
        data.forEach(item => {
            item.goal /= 3;
        });
        return data;
    }
}
exports.GetDashboardSalesUseCase = GetDashboardSalesUseCase;
