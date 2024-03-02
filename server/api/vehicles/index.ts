import prisma from "~/prisma";
import { z } from "zod";

const querySchema = z
  .object({
    take: z.coerce.number().default(20),
    skip: z.coerce.number().default(0),
    search: z.string().optional(),
    brand: z.coerce.number().optional(),
    minPrice: z.coerce.number().positive().optional(),
    maxPrice: z.coerce.number().positive().optional(),
    rating: z.coerce.number().positive().lte(5).optional(),
    isPremium: z.coerce.boolean().optional(),
  })
  .refine(
    (schema) => {
      console.log(schema.isPremium);
      if (schema.minPrice && schema.maxPrice) {
        return schema.maxPrice >= schema.minPrice;
      }
      return true;
    },
    {
      message: "minPrice must be less than or equal to maxPrice",
    },
  );

export default defineEventHandler(async (event) => {
  const query = await getValidatedQuery(event, (params) =>
    querySchema.parse(params),
  );
  return await prisma.vehicle.findMany({
    skip: query.skip * query.take,
    take: query.take,
    where: {
      brandId: query.brand,
      name: {
        contains: query.search,
      },
      price: {
        gte: query.minPrice,
        lte: query.maxPrice,
      },
      rating: query.rating,
      isPremium: query.isPremium,
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
