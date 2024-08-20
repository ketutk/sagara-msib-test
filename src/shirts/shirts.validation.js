const { z } = require("zod");

const ShirtSchema = z.object({
  name: z.string().min(1),
  color: z.string().min(1),
  size: z.string().min(1),
  price: z.number().min(0),
  stock: z.number().min(0),
});

const CheckoutSchema = z.object({
  shirt_id: z.number().min(1),
  total_items: z.number().min(1),
});

module.exports = { ShirtSchema, CheckoutSchema };
