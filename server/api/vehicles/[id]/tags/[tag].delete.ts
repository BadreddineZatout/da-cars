import prisma from "~/prisma";
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const tag = getRouterParam(event, "tag");
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "ID is required",
    });
  }
  if (!tag) {
    throw createError({
      statusCode: 400,
      statusMessage: "Tag ID is required",
    });
  }
  return await prisma.tagsOnVehicles.delete({
    where: {
      vehicleId_tagId: {
        tagId: parseInt(tag),
        vehicleId: parseInt(id),
      },
    },
  });
});
