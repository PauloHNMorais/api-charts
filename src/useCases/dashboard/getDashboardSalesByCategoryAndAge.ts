import { prisma } from "@/src/lib/prisma";
import dayjs from "dayjs";
import lodash from "lodash";

export class GetDashboardSalesByCategoryAndAgeUseCase {
  static async execute(startDate: Date, endDate: Date) {
    const [sales] = await Promise.all([
      prisma.sale.findMany({
        where: {
          date: {
            gte: startDate,
            lte: endDate,
          },
        },
        include: {
          Client: true,
          Product: {
            include: {
              Category: true,
            },
          },
        },
        orderBy: {
          value: "desc",
        },
      }),
    ]);

    const categoryGroup = lodash.groupBy(
      sales,
      (sale) => sale.Product.categoryId
    );

    const data = [] as any[];

    Object.entries(categoryGroup).forEach(([categoryId, sales]) => {
      const ageGroup = lodash.groupBy(sales, (sale) => {
        const age = Math.ceil(
          dayjs().diff(sale.Client.birthDate, "years", true)
        );
        if (age <= 17) {
          return "Até 17 anos";
        } else if (age >= 18 && age <= 29) {
          return "Entre 18 e 29 anos";
        } else if (age >= 30 && age <= 44) {
          return "Entre 30 e 44 anos";
        } else if (age >= 45 && age <= 59) {
          return "Entre 45 e 59 anos";
        } else {
          return "60 anos ou mais";
        }
      });

      const agesGroup = {
        "Até 17 anos": lodash.sumBy(
          ageGroup["Até 17 anos"],
          (sale) => sale.value
        ),
        "Entre 18 e 29 anos": lodash.sumBy(
          ageGroup["Entre 18 e 29 anos"],
          (sale) => sale.value
        ),
        "Entre 30 e 44 anos": lodash.sumBy(
          ageGroup["Entre 30 e 44 anos"],
          (sale) => sale.value
        ),
        "Entre 45 e 59 anos": lodash.sumBy(
          ageGroup["Entre 45 e 59 anos"],
          (sale) => sale.value
        ),
        "60 anos ou mais": lodash.sumBy(
          ageGroup["60 anos ou mais"],
          (sale) => sale.value
        ),
      };

      const ages = Object.entries(agesGroup).map(([age, sales]) => ({
        age,
        sales,
      }));

      data.push({
        category: sales[0].Product.Category,
        ages,
      });
    });

    return data;
  }
}
