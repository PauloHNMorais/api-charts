"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteSaleUseCase = void 0;
const zod_1 = require("zod");
const prisma_1 = require("../../lib/prisma");
class DeleteSaleUseCase {
    static async execute(id) {
        zod_1.z.coerce.number().int().gt(0).parse(id);
        return await prisma_1.prisma.sale.delete({
            where: {
                id
            }
        });
    }
}
exports.DeleteSaleUseCase = DeleteSaleUseCase;
