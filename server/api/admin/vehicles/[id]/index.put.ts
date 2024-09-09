import prisma from "~/prisma";
import { z } from "zod";
import { readFiles } from "h3-formidable";
import { firstValues, readBooleans } from "h3-formidable/helpers";

const bodySchema = z.object({
  name: z.coerce.string(),
  description: z.coerce.string(),
  brandId: z.coerce.number(),
  price: z.coerce.number().min(0, "Price must be greater than 0"),
  phone: z.coerce.string(),
  address: z.coerce.string(),
  owner: z.coerce.string(),
  rating: z.coerce.number(),
  isPremium: z.coerce.boolean(),
});

type Media = {
  name: string;
  path: string;
};

export default defineEventHandler(async (event) => {
  const media: Media[] = [];
  const { fields, files, form } = await readFiles(event, {
    uploadDir: process.env.IMG_UPLOAD_DIR,
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

  const id = getRouterParam(event, "id");
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "ID is required",
    });
  }
  if (media.length) {
    media.forEach(async (image) => {
      await prisma.vehicleMedia.create({
        data: {
          name: image.name,
          path: image.path,
          vehicleId: parseInt(id),
        },
      });
    });
  }

  return await prisma.vehicle.update({
    where: {
      id: parseInt(id),
    },
    data: {
      name: data.name,
      description: data.description,
      brandId: data.brandId,
      price: data.price,
      phone: data.phone,
      address: data.address,
      isPremium: fieldsSingle.isPremium?.toString() == "true",
      rating: data.rating,
      owner: data.owner,
    },
  });
});
