const prisma = require("../prisma");
const seed = async () => {
  // TODO: Create Customers, Restaurants and Reservations
  const createCustomers = async () => {
    const customers = [
      { name: "pierre" },
      { name: "mary" },
      { name: "alex" },
      { name: "mathew" },
      { name: "francis" },
    ];
    await prisma.customer.createMany({ data: customers });
  };
  const createRestaurants = async () => {
    const restaurants = [
      { name: "Wingman’s Pub" },
      { name: "The Garden of Eat’n" },
      { name: "Take It Cheesy" },
      { name: "Lettuce Eat Bistro" },
      { name: "Not Your Grandpa’s Grill" },
    ];
    await prisma.restaurant.createMany({ data: restaurants });
  };
  const createReservations = async () => {
    const reservations = [
      {
        customerId: 1,
        restaurantId: 1,
        partyCount: 6,
        date: new Date("2024-07-01"),
      },
      {
        customerId: 2,
        restaurantId: 2,
        partyCount: 10,
        date: new Date("2024-07-02"),
      },
      {
        customerId: 3,
        restaurantId: 3,
        partyCount: 15,
        date: new Date("2024-07-03"),
      },
      {
        customerId: 4,
        restaurantId: 4,
        partyCount: 13,
        date: new Date("2024-07-04"),
      },
      {
        customerId: 5,
        restaurantId: 5,
        partyCount: 5,
        date: new Date("2024-07-05"),
      },
    ];
    await prisma.reservation.createMany({ data: reservations });
  };
  await createCustomers();
  await createRestaurants();
  await createReservations();
};
seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
