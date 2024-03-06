import prisma from "~/prisma";
export default defineEventHandler(async (event) => {
  const reservations = await prisma.reservation.count();
  const services = await prisma.service.count();
  const vehicles = await prisma.vehicle.count();

  return {
    reservation: {
      title: "Total Reservations",
      value: reservations,
    },
    service: {
      title: "Total Services",
      value: services,
    },
    vehicle: {
      title: "Total Vehicles",
      value: vehicles,
    },
  };
});
