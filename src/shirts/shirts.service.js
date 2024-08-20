const { response, throwError } = require("../helper/response");
const ShirtsRepository = require("./shirts.repository");

const shirtsRepository = new ShirtsRepository();

class ShirtsService {
  async getAllShirts(color, size, stock_lte) {
    try {
      const where = {};

      if (color)
        where.color = {
          contains: color,
          mode: "insensitive",
        };
      if (size) where.size = size;
      if (stock_lte != null) where.stock = { lte: +stock_lte };

      return await shirtsRepository.getAllShirts(where);
    } catch (e) {
      throw e;
    }
  }

  async getShirtById(id) {
    try {
      const res = await shirtsRepository.getShirtById(id);
      if (!res) throwError(404, "Data not found");

      return res;
    } catch (e) {
      throw e;
    }
  }

  async addShirt(data) {
    try {
      return await shirtsRepository.addShirt(data);
    } catch (e) {
      throw e;
    }
  }

  async editShirtById(data) {
    try {
      const { id, ...addData } = data;

      const isExist = await shirtsRepository.getShirtById(id);
      if (!isExist) throwError(404, "Data not found");

      return await shirtsRepository.editShirtById(id, addData);
    } catch (e) {
      throw e;
    }
  }

  async deleteShirtById(id) {
    try {
      const isExist = await shirtsRepository.getShirtById(id);
      if (!isExist) throwError(404, "Data not found");

      return await shirtsRepository.deleteShirtById(id);
    } catch (e) {
      throw e;
    }
  }

  async checkoutShirt(data) {
    try {
      const shirtData = await shirtsRepository.getShirtById(data.shirt_id);

      if (!shirtData) throwError(404, "Data not found");
      if (data.total_items > shirtData.stock) throwError(400, `Out of stock. Stock left : ${shirtData.stock}`);

      const total_payments = shirtData.price * data.total_items;
      const { id, createdAt, updatedAt, ...editData } = shirtData;
      editData.stock -= data.total_items;
      const res = await shirtsRepository.editShirtById(id, editData);

      return {
        payment: {
          item: shirtData.name,
          total_items: data.total_items,
          total_payments,
        },
        item: res,
      };
    } catch (e) {
      throw e;
    }
  }
}

module.exports = ShirtsService;
