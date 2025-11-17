"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSalersInfoUseCase = void 0;
const prisma_1 = require("../../lib/prisma");
class GetSalersInfoUseCase {
    static async execute() {
        const sales = await prisma_1.prisma.saler.findMany({
            where: {},
            orderBy: [{ firstName: "asc" }, { lastName: "asc" }],
            select: {
                id: true,
                firstName: true,
                lastName: true,
            },
        });
        return sales;
    }
}
exports.GetSalersInfoUseCase = GetSalersInfoUseCase;
