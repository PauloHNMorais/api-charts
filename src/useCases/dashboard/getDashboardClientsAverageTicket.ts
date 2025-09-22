import dayjs from "dayjs";
import lodash from "lodash"
import { prisma } from "../../lib/prisma";

export class GetDashboardClientsAverageTicketUseCase {
    static async execute(startDate: Date, endDate: Date) {

        const [sales] = await Promise.all([
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

        ]);

        const vendasAgrupadas: { [anoMes: string]: { soma: number; quantidade: number } } = {};

        sales.forEach((venda) => {
            const data = new Date(venda.date);
            const anoMes = `${data.getFullYear()}-${(data.getMonth() + 1).toString().padStart(2, '0')}`;

            if (!vendasAgrupadas[anoMes]) {
                vendasAgrupadas[anoMes] = { soma: 0, quantidade: 0 };
            }

            vendasAgrupadas[anoMes].soma += venda.value;
            vendasAgrupadas[anoMes].quantidade++;
        });

        const resultado: { date: string; average: number }[] = [];

        for (const date in vendasAgrupadas) {
            const average = vendasAgrupadas[date].soma / vendasAgrupadas[date].quantidade;
            resultado.push({
                date: dayjs(date).format("MMM/YY"),
                average: Number(average.toFixed(2))
            });
        }

        console.log(resultado)

        return resultado
    }
}