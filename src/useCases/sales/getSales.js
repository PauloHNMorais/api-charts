"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSalesUseCase = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const prisma_1 = require("../../lib/prisma");
class GetSalesUseCase {
    static async execute() {
        const sales = await prisma_1.prisma.sale.findMany({
            where: {},
            orderBy: {
                date: "desc",
            },
            include: {
                Client: true,
                Saler: true,
                Product: {
                    include: {
                        Category: true,
                    },
                },
            },
            take: 100,
        });
        const data = sales.map((sale) => ({
            id: sale.id,
            clientName: sale.Client.firstName,
            clientEmail: sale.Client.email,
            clientProfilePhotoURL: sale.Client.profilePhotoURL,
            value: sale.value.toFixed(2).replace(".", ","),
            productName: sale.Product.name,
            categoryName: sale.Product.Category?.name,
            salerName: sale.Saler.firstName,
            salerProfilePhotoURL: sale.Saler.profilePhotoURL,
            dateSale: (0, dayjs_1.default)(sale.date).format("DD/MM/YYYY HH:mm"),
            rating: sale.rating,
        }));
        return data;
    }
}
exports.GetSalesUseCase = GetSalesUseCase;
