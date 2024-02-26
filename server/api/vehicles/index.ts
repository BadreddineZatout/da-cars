import prisma from "~/prisma";
import { z } from "zod";

const querySchema = z.object({
  take: z.coerce.number().default(20),
  skip: z.coerce.number().default(0),
});

export default defineEventHandler(async (event) => {
  const result = await getValidatedQuery(event, (params) =>
    querySchema.safeParse(params),
  );

  if (!result.success) throw result.error.issues;

  const query = result.data;

  return await prisma.vehicle.findMany({
    skip: query.skip * query.take,
    take: query.take,
    orderBy: [
      {
        id: "desc",
      },
    ],
    include: {
      media: true,
      brand: true,
    },
  });
});
