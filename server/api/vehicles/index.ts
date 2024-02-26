import prisma from "~/prisma";
export default defineEventHandler(async (event) => {
  const allBrands = await prisma.vehicle.findMany({
    include: {
      media: true,
      brand: true,
    },
  });
  return allBrands;
});
