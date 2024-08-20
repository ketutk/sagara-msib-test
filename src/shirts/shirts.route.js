const express = require("express");
const ShirtsController = require("./shirts.controller");
const router = express.Router();
const shirtsController = new ShirtsController();
/* GET home page. */
router.post("/", shirtsController.addShirt);
router.post("/checkout", shirtsController.checkoutShirt);
router.put("/:id", shirtsController.editShirtById);
router.delete("/:id", shirtsController.deleteShirtById);

router.get("/", shirtsController.getAllShirts);
router.get("/:id", shirtsController.getShirtById);

module.exports = router;
