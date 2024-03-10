import prisma from "~/prisma";
import { z } from "zod";
import { readFiles } from "h3-formidable";
import { firstValues, readBooleans } from "h3-formidable/helpers";
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
  const { fields, files, form } = await readFiles(event);

  const fieldsSingle = firstValues(form, fields, []);
  const fieldsWithBooleans = readBooleans(fieldsSingle, ["isPremium"]);
  const result = bodySchema.safeParse(fieldsWithBooleans);

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
