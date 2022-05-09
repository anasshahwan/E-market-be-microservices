const express = require("express");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Stocks
 *   description: The books managing API
 */

/**
 * @swagger
 * /api/v1.0/market/stock/get/{company_code}/{start_date}/{end_date}:
 *  get:
 *    tags: [Stocks]
 *    description: Use to demo
 *    responses:
 *      '200':
 *        description: A Successfull Response
 */
router.get("/get/:company_code/:start_date/:end_date", (req, res, next) => {
  res.status(200).json({
    message: "Get all Stocks",
  });
});

router.post("/add/:company_code", (req, res, next) => {
  res.status(200).json({
    message: "Add a Stock",
  });
});

router.get("/:stockId", (req, res, next) => {
  const id = req.params.stockId;
  res.status(200).json({
    message: "Get a Stock By " + id,
  });
});

router.patch("/:stockId", (req, res, next) => {
  const id = req.params.stockId;
  res.status(200).json({
    message: "Update a Stock By " + id,
  });
});

router.delete("/:stockId", (req, res, next) => {
  const id = req.params.companyId;
  res.status(200).json({
    message: "Delete a Stock By " + id,
  });
});
module.exports = router;
