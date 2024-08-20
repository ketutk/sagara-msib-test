const { PrismaClient } = require("@prisma/client");
const { ShirtsSeeder } = require("./shirts.seed");
const prisma = new PrismaClient();
async function main() {
  const createShirts = await ShirtsSeeder();
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
