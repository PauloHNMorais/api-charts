import { prisma } from "../../lib/prisma";

export class GetClientsInfoUseCase {
  static async execute() {
    const sales = await prisma.client.findMany({
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
