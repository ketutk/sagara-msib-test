const { PrismaClient, Size } = require("@prisma/client");
const prisma = new PrismaClient();
exports.ShirtsSeeder = async () => {
  return new Promise(async (resolve, reject) => {
    const datas = [
      {
        name: "AeroShirts Lengan Panjang",
        color: "jingga",
        size: Size.l,
        price: 100000,
        stock: 999,
      },
      {
        name: "Enigma Shirts",
        color: "hitam",
        size: Size.xl,
        price: 100000,
        stock: 999,
      },
      {
        name: "Invoker Limited Edition",
        color: "ungu",
        size: Size.xl,
        price: 100000,
        stock: 999,
      },
      {
        name: "Sven Rage Shirts",
        color: "merah",
        size: Size.xxl,
        price: 100000,
        stock: 999,
      },
    ];

    try {
      await prisma.shirts.deleteMany({});

      await prisma.shirts.createMany({
        data: datas,
      });
      resolve("Success create shirt seeds");
    } catch (error) {
      reject(error.message);
    }
  });
};
