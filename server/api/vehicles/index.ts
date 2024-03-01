import prisma from "~/prisma";
import { z } from "zod";

const querySchema = z.object({
  take: z.coerce.number().default(20),
  skip: z.coerce.number().default(0),
  brand: z.coerce.number().optional(),
});

export default defineEventHandler(async (event) => {
  const query = await getValidatedQuery(event, (params) =>
    querySchema.parse(params),
  );

  return await prisma.vehicle.findMany({
    skip: query.skip * query.take,
    take: query.take,
    where: {
      brandId: query.brand,
    },
    orderBy: [
      {
        id: "desc",
      },
    ],
    include: {
      media: true,
      brand: true,
      features: true,
    },
  });
});
