import prisma from "~/prisma";
import { z } from "zod";

const bodySchema = z.object({
  name: z.coerce.string(),
  description: z.coerce.string(),
  brand: z.coerce.number(),
  price: z.coerce.number().min(0, "Price must be greater than 0"),
  phone: z.coerce.string(),
  address: z.coerce.string(),
  owner: z.coerce.string(),
  rating: z.coerce.number(),
  isPremium: z.coerce.boolean().default(false),
});

export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, (params) =>
    bodySchema.safeParse(params),
  );

  if (!result.success) return { errors: result.error.issues };
  const data = result.data;
  return await prisma.vehicle.create({
    data: {
      name: data.name,
      description: data.description,
      brandId: data.brand,
      price: data.price,
      phone: data.phone,
      address: data.address,
      isPremium: data.isPremium,
      rating: data.rating,
      owner: data.owner,
    },
  });
});
