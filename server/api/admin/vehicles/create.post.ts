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

type Media = {
  name: string;
  path: string;
};
export default defineEventHandler(async (event) => {
  const media: Media[] = [];
  const { fields, files, form } = await readFiles(event, {
    uploadDir: "public/images",
    createDirsFromUploads: true,
    filename(name, ext, part, form) {
      let filename = part.originalFilename ?? "image";
      media.push({
        name: filename,
        path: "/images/" + filename,
      });
      return filename;
    },
  });

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
      isPremium: fieldsSingle.isPremium?.toString() == "true",
      rating: data.rating,
      owner: data.owner,
      media: {
        create: media,
      },
    },
    include: {
      media: true,
    },
  });
});
