import bcrypt from "bcryptjs";
import prisma from "~/prisma";
import { z } from "zod";

const bodySchema = z.object({
  name: z.coerce.string(),
  email: z.coerce.string().email(),
  password: z.coerce.string().min(8),
});

export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, (params) =>
    bodySchema.safeParse(params),
  );

  if (!result.success) return { errors: result.error.issues };
  const data = result.data;
  return await prisma.user.create({
    data: {
      ...data,
      password: bcrypt.hashSync(data.password, 8),
    },
  });
});
