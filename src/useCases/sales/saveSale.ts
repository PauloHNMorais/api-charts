import { prisma } from "@/src/lib/prisma";
import { z } from "zod";

export class SaveSaleUseCase {
  static async execute(params: any) {
    params.id ||= 0;

    z.object(
      params.id
        ? {
            id: z.coerce.number().int(),
            clientId: z.coerce.number().int().gte(1).nullish(),
            productId: z.coerce.number().int().gte(1).nullish(),
            salerId: z.coerce.number().int().gte(1).nullish(),
            value: z.coerce.number().gt(0).nullish(),
            rating: z.coerce.number().int().gte(0).lte(5).nullish(),
          }
        : {
            clientId: z.coerce.number().int().gte(1),
            productId: z.coerce.number().int().gte(1),
            salerId: z.coerce.number().int().gte(1),
            value: z.coerce.number().gt(0),
            rating: z.coerce.number().int().gte(0).lte(5).nullish(),
          }
    ).parse(params);

    return await prisma.sale.upsert({
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
