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
    isPremium: z.coerce.number().optional(),
  })
  .refine(
    (schema) => {
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
  const result = await getValidatedQuery(event, (params) =>
    querySchema.safeParse(params),
  );

  if (!result.success) return { errors: result.error.issues };
  const query = result.data;
  return await prisma.vehicle.findMany({
    skip: query.skip * query.take,
    take: query.take,
    where: getWhereFilter(query),
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

const getWhereFilter = (query: any) => {
  let where: any = {};
  if (query.search)
    where.name = {
      contains: query.search,
    };
  if (query.brand) where.brandId = query.brand;
  if (query.minPrice || query.maxPrice)
    where.price = {
      gte: query.minPrice,
      lte: query.maxPrice,
    };
  if (query.rating) where.rating = query.rating;
  if (query.isPremium) where.isPremium = query.isPremium == 1;
  return where;
};
