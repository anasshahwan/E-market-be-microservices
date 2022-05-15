const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const mysql = require("mysql2");
const mySqlConnection = require("../helpers/mysql-connection");

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

router.post("/add/:company_code", async (req, res, next) => {
  const stock_price = req.body.stock_price;
  const company_code = req.params.company_code;

  var sql = `INSERT INTO stocks (company_code, stock_price) VALUES ("${company_code}", ${stock_price})`;
  mySqlConnection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
  res.status(200).json({
    message: "Add a Stock to company " + req.params.company_code,
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
