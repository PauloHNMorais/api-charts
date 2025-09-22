import { prisma } from "../../lib/prisma";

export class GetSalersInfoUseCase {
  static async execute() {
    const sales = await prisma.saler.findMany({
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
