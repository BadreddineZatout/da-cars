import prisma from "~/prisma";
import { readFiles } from "h3-formidable";
import { firstValues, readBooleans } from "h3-formidable/helpers";

type CarouselMedia = {
  path: string;
};
export default defineEventHandler(async (event) => {
  const media: CarouselMedia[] = [];
  const { fields, files, form } = await readFiles(event, {
    uploadDir: "public/images",
    createDirsFromUploads: true,
    filename(name, ext, part, form) {
      let filename = part.originalFilename ?? "image";
      media.push({
        path: "/images/" + filename,
      });
      return filename;
    },
  });

  media.forEach(async (image) => {
    await prisma.carousel.create({
      data: {
        path: image.path,
      },
    });
  });

  return "Carousel Updated";
});
