const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class ShirtsRepository {
  async getAllShirts(whereClause) {
    try {
      return await prisma.shirts.findMany({
        where: whereClause,
      });
    } catch (e) {
      throw e;
    }
  }

  async getShirtById(id) {
    try {
      return await prisma.shirts.findUnique({ where: { id } });
    } catch (e) {
      throw e;
    }
  }

  async addShirt(data) {
    try {
      return await prisma.shirts.create({
        data: data,
      });
    } catch (e) {
      throw e;
    }
  }

  async editShirtById(id, data) {
    try {
      return await prisma.shirts.update({
        where: { id: id },
        data: data,
      });
    } catch (e) {
      throw e;
    }
  }

  async deleteShirtById(id) {
    try {
      return await prisma.shirts.delete({ where: { id } });
    } catch (e) {
      throw e;
    }
  }
}

module.exports = ShirtsRepository;
