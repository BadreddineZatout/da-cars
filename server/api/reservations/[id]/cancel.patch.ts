import prisma from "~/prisma";
import { Status } from "~/enum";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "ID is required",
    });
  }

  return await prisma.reservation.update({
    where: {
      id: parseInt(id),
    },
    data: {
      status: Status.CANCELLED,
    },
  });
});
