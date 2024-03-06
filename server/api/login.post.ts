import prisma from "~/prisma";
import { z } from "zod";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const bodySchema = z.object({
  email: z.string(),
  password: z.string(),
});

export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, (params) =>
    bodySchema.safeParse(params),
  );

  if (!result.success) return { errors: result.error.issues };
  const data = result.data;
  const user = await prisma.user.findFirst({
    where: { email: data.email },
  });
  if (!user) return { errors: [{ message: "User Not Found" }] };
  const passwordIsValid = bcrypt.compareSync(data.password, user.password);
  if (!passwordIsValid) {
    return { errors: [{ message: "Invalid Password" }] };
  }

  const token = jwt.sign({ id: user.id }, "da-cars", {
    expiresIn: 60 * 60 * 24 * 90, // 90 days
  });

  return { user, token };
});
