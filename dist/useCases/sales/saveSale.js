"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveSaleUseCase = void 0;
const zod_1 = require("zod");
const prisma_1 = require("../../lib/prisma");
class SaveSaleUseCase {
    static async execute(params) {
        params.id || (params.id = 0);
        zod_1.z.object(params.id
            ? {
                id: zod_1.z.coerce.number().int(),
                clientId: zod_1.z.coerce.number().int().gte(1).nullish(),
                productId: zod_1.z.coerce.number().int().gte(1).nullish(),
                salerId: zod_1.z.coerce.number().int().gte(1).nullish(),
                value: zod_1.z.coerce.number().gt(0).nullish(),
                rating: zod_1.z.coerce.number().int().gte(0).lte(5).nullish(),
            }
            : {
                clientId: zod_1.z.coerce.number().int().gte(1),
                productId: zod_1.z.coerce.number().int().gte(1),
                salerId: zod_1.z.coerce.number().int().gte(1),
                value: zod_1.z.coerce.number().gt(0),
                rating: zod_1.z.coerce.number().int().gte(0).lte(5).nullish(),
            }).parse(params);
        return await prisma_1.prisma.sale.upsert({
            create: {
                ...params,
                date: new Date(),
            },
            update: params,
            where: {
                id: params.id,
            },
        });
    }
}
exports.SaveSaleUseCase = SaveSaleUseCase;
