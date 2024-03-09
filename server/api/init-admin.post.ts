import prisma from "~/prisma";
import bcrypt from "bcryptjs";

export default defineEventHandler(async () => {
  const user = await prisma.user.findFirst({
    where: {
      email: "admin@admin.com",
    },
  });

  if (user) {
    return "Admin user already exists";
  }
  return await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@admin.com",
      password: bcrypt.hashSync("12345678", 8),
    },
  });
});
