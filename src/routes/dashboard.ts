import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { GetDashboardSalesUseCase } from '../useCases/dashboard/getDashboardSales';
import { GetDashboardClientsAverageTicketUseCase } from '../useCases/dashboard/getDashboardClientsAverageTicket';
import { GetDashboardSalesByCategoryUseCase } from '../useCases/dashboard/getDashboardSalesByCategory';
import { GetDashboardSalesBySalerUseCase } from '../useCases/dashboard/getDashboardSalesBySaler';
import { GetDashboardSalesByCategoryAndAgeUseCase } from '../useCases/dashboard/getDashboardSalesByCategoryAndAge';


export async function dashboardRoutes(fastify: FastifyInstance) {
    fastify.get(
        '/dashboard/sales',
        async (req, res) => {
            const params = z.object({
                startDate: z.coerce.date(),
                endDate: z.coerce.date()
            }).parse(req.query);

            const data = await GetDashboardSalesUseCase.execute(params.startDate, params.endDate)
            return data
        }
    );

    fastify.get(
        '/dashboard/clientsAverageTicket',
        async (req, res) => {
            const params = z.object({
                startDate: z.coerce.date(),
                endDate: z.coerce.date()
            }).parse(req.query);

            const data = await GetDashboardClientsAverageTicketUseCase.execute(params.startDate, params.endDate)
            return data
        }
    );

    fastify.get(
        '/dashboard/salesByCategory',
        async (req, res) => {
            const params = z.object({
                startDate: z.coerce.date(),
                endDate: z.coerce.date()
            }).parse(req.query);

            const data = await GetDashboardSalesByCategoryUseCase.execute(params.startDate, params.endDate)
            return data
        }
    );

    fastify.get(
        '/dashboard/salesBySaler',
        async (req, res) => {
            const params = z.object({
                startDate: z.coerce.date(),
                endDate: z.coerce.date()
            }).parse(req.query);

            const data = await GetDashboardSalesBySalerUseCase.execute(params.startDate, params.endDate)
            return data
        }
    );


    fastify.get(
        '/dashboard/salesByCategoryAndAge',
        async (req, res) => {
            const params = z.object({
                startDate: z.coerce.date(),
                endDate: z.coerce.date()
            }).parse(req.query);

            const data = await GetDashboardSalesByCategoryAndAgeUseCase.execute(params.startDate, params.endDate)
            return data
        }
    );
}