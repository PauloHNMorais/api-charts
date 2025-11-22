import { prisma } from "@/src/lib/prisma";
import { z } from "zod";

export class DeleteSaleUseCase {
  static async execute(id: any) {
    z.coerce.number().int().gt(0).parse(id);

    return await prisma.sale.delete({
      where: {
        id,
      },
    });
  }
}
