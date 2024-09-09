import prisma from "~/prisma";
import { readFiles } from "h3-formidable";

const runtimeConfig = useRuntimeConfig();

type CarouselMedia = {
  path: string;
};
export default defineEventHandler(async (event) => {
  const media: CarouselMedia[] = [];
  const { fields, files, form } = await readFiles(event, {
    uploadDir: runtimeConfig.public.uploadDir,
    createDirsFromUploads: true,
    filename(name, ext, part, form) {
      let filename = part.originalFilename ?? "image";
      media.push({
        path: `/${runtimeConfig.public.uploadDir}/${filename}`,
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
