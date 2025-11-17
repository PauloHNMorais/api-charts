"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetDashboardClientsAverageTicketUseCase = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const prisma_1 = require("../../lib/prisma");
class GetDashboardClientsAverageTicketUseCase {
    static async execute(startDate, endDate) {
        const [sales] = await Promise.all([
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
        ]);
        const vendasAgrupadas = {};
        sales.forEach((venda) => {
            const data = new Date(venda.date);
            const anoMes = `${data.getFullYear()}-${(data.getMonth() + 1).toString().padStart(2, '0')}`;
            if (!vendasAgrupadas[anoMes]) {
                vendasAgrupadas[anoMes] = { soma: 0, quantidade: 0 };
            }
            vendasAgrupadas[anoMes].soma += venda.value;
            vendasAgrupadas[anoMes].quantidade++;
        });
        const resultado = [];
        for (const date in vendasAgrupadas) {
            const average = vendasAgrupadas[date].soma / vendasAgrupadas[date].quantidade;
            resultado.push({
                date: (0, dayjs_1.default)(date).format("MMM/YY"),
                average: Number(average.toFixed(2))
            });
        }
        console.log(resultado);
        return resultado;
    }
}
exports.GetDashboardClientsAverageTicketUseCase = GetDashboardClientsAverageTicketUseCase;
