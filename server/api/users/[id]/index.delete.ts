import prisma from "~/prisma";
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "ID is required",
    });
  }
  return await prisma.user.delete({
    where: {
      id: parseInt(id),
    },
  });
});
