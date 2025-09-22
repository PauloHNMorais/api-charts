import { prisma } from "../../lib/prisma";

export class GetProductsInfoUseCase {
  static async execute() {
    const sales = await prisma.product.findMany({
      where: {},
      orderBy: {
        name: "asc",
      },
      select: {
        id: true,
        name: true,
      },
    });

    return sales;
  }
}
