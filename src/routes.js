const express = require("express");
const router = express.Router();
const shirtRoute = require("./shirts/shirts.route");
/* GET home page. */
router.use("/shirts", shirtRoute);

module.exports = router;
