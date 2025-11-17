"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardRoutes = dashboardRoutes;
const zod_1 = require("zod");
const getDashboardSales_1 = require("../useCases/dashboard/getDashboardSales");
const getDashboardClientsAverageTicket_1 = require("../useCases/dashboard/getDashboardClientsAverageTicket");
const getDashboardSalesByCategory_1 = require("../useCases/dashboard/getDashboardSalesByCategory");
const getDashboardSalesBySaler_1 = require("../useCases/dashboard/getDashboardSalesBySaler");
const getDashboardSalesByCategoryAndAge_1 = require("../useCases/dashboard/getDashboardSalesByCategoryAndAge");
async function dashboardRoutes(fastify) {
    fastify.get('/dashboard/sales', async (req, res) => {
        const params = zod_1.z.object({
            startDate: zod_1.z.coerce.date(),
            endDate: zod_1.z.coerce.date()
        }).parse(req.query);
        const data = await getDashboardSales_1.GetDashboardSalesUseCase.execute(params.startDate, params.endDate);
        return data;
    });
    fastify.get('/dashboard/clientsAverageTicket', async (req, res) => {
        const params = zod_1.z.object({
            startDate: zod_1.z.coerce.date(),
            endDate: zod_1.z.coerce.date()
        }).parse(req.query);
        const data = await getDashboardClientsAverageTicket_1.GetDashboardClientsAverageTicketUseCase.execute(params.startDate, params.endDate);
        return data;
    });
    fastify.get('/dashboard/salesByCategory', async (req, res) => {
        const params = zod_1.z.object({
            startDate: zod_1.z.coerce.date(),
            endDate: zod_1.z.coerce.date()
        }).parse(req.query);
        const data = await getDashboardSalesByCategory_1.GetDashboardSalesByCategoryUseCase.execute(params.startDate, params.endDate);
        return data;
    });
    fastify.get('/dashboard/salesBySaler', async (req, res) => {
        const params = zod_1.z.object({
            startDate: zod_1.z.coerce.date(),
            endDate: zod_1.z.coerce.date()
        }).parse(req.query);
        const data = await getDashboardSalesBySaler_1.GetDashboardSalesBySalerUseCase.execute(params.startDate, params.endDate);
        return data;
    });
    fastify.get('/dashboard/salesByCategoryAndAge', async (req, res) => {
        const params = zod_1.z.object({
            startDate: zod_1.z.coerce.date(),
            endDate: zod_1.z.coerce.date()
        }).parse(req.query);
        const data = await getDashboardSalesByCategoryAndAge_1.GetDashboardSalesByCategoryAndAgeUseCase.execute(params.startDate, params.endDate);
        return data;
    });
}
