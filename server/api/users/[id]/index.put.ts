import bcrypt from "bcryptjs";
import prisma from "~/prisma";
import { z } from "zod";

const bodySchema = z.object({
  name: z.coerce.string(),
  email: z.coerce.string().email(),
  password: z.coerce.string().min(8).optional(),
});

export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, (params) =>
    bodySchema.safeParse(params),
  );

  const id = getRouterParam(event, "id");

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "ID is required",
    });
  }

  if (!result.success) return { errors: result.error.issues };
  let data = {};
  if (result.data.password) {
    data = {
      ...result.data,
      password: bcrypt.hashSync(result.data.password),
    };
  } else {
    data = result.data;
  }
  return await prisma.user.update({
    where: {
      id: parseInt(id),
    },
    data: data,
  });
});
