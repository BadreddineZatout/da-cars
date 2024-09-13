import prisma from "~/prisma";
import { Status } from "~/enum";

const { sendMail } = useNodeMailer();

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "ID is required",
    });
  }

  const reservation = await prisma.reservation.update({
    where: {
      id: parseInt(id),
    },
    data: {
      status: Status.ACCEPTED,
    },
    include: {
      service: true,
      item: true,
    },
  });
  return sendMail({
    subject: "Reservation Accepté",
    text: ``,
    to: "hb_zatout@esi.dz",
    html: `
    <h1>Hallo ${reservation.first_name} ${reservation.last_name}</h1>
    <p>Ihre Reservierung für den Dienst <strong>${reservation.service.name_de} - ${reservation.item.name_de}</strong> am Datum  <strong>${reservation.date}</strong> wurde akzeptiert</p>
    <p>Mit freundlichen Grüßen,<br>Da Cars</p>
    <br>
    <br>
    <h1>Bonjour ${reservation.first_name} ${reservation.last_name}</h1>
    <p>Votre réservation pour le service <strong>${reservation.service.name_fr} - ${reservation.item.name_fr}</strong> à la date <strong>${reservation.date}</strong> a été accepté</p>
    <p>Cordialement,<br>Da Cars</p>
    
  `,
  });
});
