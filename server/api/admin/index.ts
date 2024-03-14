import prisma from "~/prisma";
export default defineEventHandler(async (event) => {
  const reservations = await prisma.reservation.count();
  const services = await prisma.service.count();
  const vehicles = await prisma.vehicle.count();

  return {
    reservation: {
      title: "reservations_total",
      value: reservations,
    },
    service: {
      title: "services_total",
      value: services,
    },
    vehicle: {
      title: "vehicles_total",
      value: vehicles,
    },
  };
});
