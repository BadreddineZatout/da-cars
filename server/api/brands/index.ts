import prisma from "~/prisma";
export default defineEventHandler(async (event) => {
  const allBrands = await prisma.brand.findMany({
    where: {
      parentId: null,
    },
    include: {
      subBrands: true,
    },
  });
  return allBrands;
});
