import prisma from "~/prisma";
import { z } from "zod";
import { Status } from "~/enum";

const bodySchema = z.object({
  first_name: z.coerce.string(),
  last_name: z.coerce.string(),
  phone_number: z.string(),
  email: z.coerce.string().optional(),
  serviceId: z.coerce.number().positive(),
  itemId: z.coerce.number().positive(),
  date: z.coerce.string(),
});

export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, (params) =>
    bodySchema.safeParse(params),
  );

  if (!result.success) return { errors: result.error.issues };
  const data = result.data;
  return await prisma.reservation.create({
    data: { ...data, status: Status.PENDING },
  });
});
