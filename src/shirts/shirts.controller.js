const { Size } = require("@prisma/client");
const { response, throwError } = require("../helper/response");
const ShirtsService = require("./shirts.service");
const { ShirtSchema, CheckoutSchema } = require("./shirts.validation");

const shirtsService = new ShirtsService();

class ShirtsController {
  async getAllShirts(req, res, next) {
    try {
      const { color, size, stock_lte } = req.query;

      if (size && !Size[size]) throwError(400, "Invalid size [s,m,l,xl,xxl]");
      if (stock_lte && isNaN(stock_lte)) throwError(400, "stock_lte must be a number");

      const data = await shirtsService.getAllShirts(color?.toLowerCase(), size, stock_lte);

      return response(res, 200, data);
    } catch (e) {
      next(e);
    }
  }

  async getShirtById(req, res, next) {
    try {
      const { id } = req.params;

      const data = await shirtsService.getShirtById(+id);

      return response(res, 200, data);
    } catch (e) {
      next(e);
    }
  }

  async addShirt(req, res, next) {
    try {
      const { name, color, size, price, stock } = req.body;

      if (size && !Size[size]) throwError(400, "Invalid size [s,m,l,xl,xxl]");
      const result = ShirtSchema.safeParse({ name, color, size, price, stock });

      if (!result.success) throwError(400, result.error.issues);
      result.data.color = result.data.color.toLowerCase();

      const data = await shirtsService.addShirt(result.data);

      return response(res, 201, data);
    } catch (e) {
      next(e);
    }
  }

  async editShirtById(req, res, next) {
    try {
      const { id } = req.params;
      const { name, color, size, price, stock } = req.body;

      if (size && !Size[size]) throwError(400, "Invalid size [s,m,l,xl,xxl]");
      const result = ShirtSchema.safeParse({ name, color, size, price, stock });

      if (!result.success) throwError(400, result.error.issues);
      result.data.color = result.data.color.toLowerCase();
      result.data.id = +id;

      const data = await shirtsService.editShirtById(result.data);

      return response(res, 200, data);
    } catch (e) {
      next(e);
    }
  }

  async deleteShirtById(req, res, next) {
    try {
      const { id } = req.params;

      await shirtsService.deleteShirtById(+id);

      return response(res, 200, null);
    } catch (e) {
      next(e);
    }
  }

  async checkoutShirt(req, res, next) {
    try {
      const { shirt_id, total_items } = req.body;

      const result = CheckoutSchema.safeParse({ shirt_id, total_items });
      if (!result.success) throwError(400, result.error.issues);

      const data = await shirtsService.checkoutShirt(result.data);

      return response(res, 201, data);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = ShirtsController;
