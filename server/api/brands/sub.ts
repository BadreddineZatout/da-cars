import prisma from "~/prisma";
export default defineEventHandler(async (event) => {
  const allBrands = await prisma.brand.findMany({
    where: {
      NOT: {
        parentId: null,
      },
    },
  });
  return allBrands;
});
