import { prisma } from "@/src/lib/prisma";

export class MeticsGetDatabaseInfoUseCase {
  static async execute() {
    const [categories, clients, goals, products, sales, salers] =
      await Promise.all([
        prisma.category.count({ where: {} }),
        prisma.client.count({ where: {} }),
        prisma.goal.count({ where: {} }),
        prisma.product.count({ where: {} }),
        prisma.sale.count({ where: {} }),
        prisma.saler.count({ where: {} }),
      ]);

    const data = {
      categories,
      clients,
      goals,
      products,
      sales,
      salers,
    };

    return data;
  }
}
