const express = require("express");
const app = express();
const PORT = 3000;

const prisma = require("./prisma");

app.use(express.json());
app.use(require("morgan")("dev"));

////////////////////////////////////////////////
// GET CUSTOMER ROUTE
app.get("/api/customers", async (req, res, next) => {
  try {
    const customer = await prisma.customer.findMany();
    res.json(customers);
  } catch (error) {
    next(error);
  }
});
// GET RESTAURANT ROUTE
app.get("/api/restaurants", async (req, res, next) => {
  try {
    const restaurants = await prisma.restaurant.findMany();
    res.json(restaurants);
  } catch (error) {
    next(error);
  }
});
// GET RESERVATION ROUTE
app.get("/api/reservations", async (req, res, next) => {
  try {
    const reservations = await prisma.reservation.findMany();
    res.json(reservations);
  } catch (error) {
    next(error);
  }
});

// POST RESERVATION ROUTE
app.post("/api/customers/:id/reservations", async (req, res, next) => {
  try {
    const customerId = +req.params.id;
    const { restaurantId, data, partyCount } = req.body;
    const reservation = await prisma.reservation.create({
      data: { customersId, restaurantId, data, partyCount },
    });
    res.json(reservation);
  } catch (error) {
    next(error);
  }
});
// DELETE CUSTOMER RESERVATION ROUTE
app.delete(
  "/api/customers/:customerId/reservations/:id",
  async (req, res, next) => {
    try {
      const id = +req.params.id;
      const { reservationId, data } = req.body;
      const reservationExists = await prisma.reservation.findFirst({
        where: { id },
      });

      if (!reservationExists) {
        return next({
          status: 404,
          message: `Could not find reservation with id ${id}`,
        });
      }
      await prisma.reservation.delete({ where: { id } });
      res.status(204);
    } catch (error) {
      next(error);
    }
  }
);

// ERROR HANDLING
app.use((error, req, res, next) => {
  res.status(res.status || 500).send({ error: error });
});
// LISTENING TO PORT ON SERVER
app.listen(PORT, () => {
  console.log(`server listening on port${PORT}`);
});
