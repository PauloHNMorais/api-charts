import { PrismaClient } from "../generated/prisma";
import data from "./mock/data.json";

function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const prisma = new PrismaClient();

async function main() {
  await prisma.sale.deleteMany({ where: {} });
  await prisma.product.deleteMany({ where: {} });
  await prisma.goal.deleteMany({ where: {} });
  await prisma.saler.deleteMany({ where: {} });
  await prisma.category.deleteMany({ where: {} });
  await prisma.client.deleteMany({ where: {} });

  const [clients, categories, salers] = await Promise.all([
    prisma.client.createMany({ data: data.Client }),
    prisma.category.createMany({ data: data.Category }),
    prisma.saler.createMany({ data: data.Saler }),
  ]);
  const products = await prisma.product.createMany({ data: data.Product });
  const sales = await prisma.sale.createMany({
    data: data.Sale.map((item) => ({
      value:
        data.Product.find((prod) => +prod.id === +item.productId)?.price || 0,
      date: new Date(item.date),
      clientId: +item.clientId,
      productId: +item.productId,
      salerId: +item.salerId,
      id: +item.id,
      rating: randomIntFromInterval(0, 5),
    })),
  });
  const goals = await prisma.goal.createMany({ data: data.Goal });
}

main();
