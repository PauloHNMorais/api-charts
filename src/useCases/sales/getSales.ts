import { prisma } from "@/src/lib/prisma";
import dayjs from "dayjs";

export class GetSalesUseCase {
  static async execute() {
    const sales = await prisma.sale.findMany({
      where: {},
      orderBy: {
        date: "desc",
      },
      include: {
        Client: true,
        Saler: true,
        Product: {
          include: {
            Category: true,
          },
        },
      },
      take: 100,
    });

    const data = sales.map((sale) => ({
      id: sale.id,
      clientName: sale.Client.firstName,
      clientEmail: sale.Client.email,
      clientProfilePhotoURL: sale.Client.profilePhotoURL,
      value: sale.value.toFixed(2).replace(".", ","),
      productName: sale.Product.name,
      categoryName: sale.Product.Category?.name,
      salerName: sale.Saler.firstName,
      salerProfilePhotoURL: sale.Saler.profilePhotoURL,
      dateSale: dayjs(sale.date).format("DD/MM/YYYY HH:mm"),
      rating: sale.rating,
    }));

    return data;
  }
}
