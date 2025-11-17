"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetClientsInfoUseCase = void 0;
const prisma_1 = require("../../lib/prisma");
class GetClientsInfoUseCase {
    static async execute() {
        const sales = await prisma_1.prisma.client.findMany({
            where: {},
            orderBy: [{ firstName: "asc" }, { lastName: "asc" }],
            select: {
                id: true,
                firstName: true,
                lastName: true,
            },
        });
        const data = sales.map((client) => ({
            id: client.id,
            name: `${client.firstName} ${client.lastName}`,
        }));
        return data;
    }
}
exports.GetClientsInfoUseCase = GetClientsInfoUseCase;
