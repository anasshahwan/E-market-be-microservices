const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const amqp = require("amqplib");

const Company = require("../models/company.js");

/**
 * @swagger
 * components:
 *   schemas:
 *     Company:
 *       type: object
 *       required:
 *         - company_code
 *         - company_name
 *         - company_ceo
 *         - company_turnover
 *         - company_website
 *         - stock_exchange
 *
 *       properties:
 *         company_code:
 *           type: string
 *           description: The Company Code
 *         company_name:
 *           type: string
 *           description: The Company Name
 *         company_ceo:
 *           type: string
 *           description: The Company CEO
 *         company_turnover:
 *           type: string
 *           description: The Company CEO
 *         company_website:
 *           type: string
 *           description: The Company WebSite
 *         stock_exchange:
 *           type: string
 *           description: The Company StockExchange
 *       example:
 *         company_code: APPL
 *         company_name: APPLE
 *         company_ceo: Tim Cook
 *         company_turnover: 11%
 *         company_website: www.apple.com
 *         stock_exchange: NASQAD
 *
 *
 */

/**
 * @swagger
 * tags:
 *   name: Company
 *   description: The Company managing API
 */

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Welcome To Company API",
  });
});

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Create a new Company
 *     tags: [Company]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Company'
 *     responses:
 *       200:
 *         description: The Company was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Company'
 *       500:
 *         description: Some server error
 */

router.post("/register", (req, res, next) => {
  console.log(req.body);
  const company = new Company({
    _id: new mongoose.Types.ObjectId(),
    company_code: req.body.company_code,
    company_name: req.body.company_name,
    company_ceo: req.body.company_ceo,
    company_turnover: req.body.company_turnover,
    company_website: req.body.company_website,
    stock_exchange: req.body.company_website,
    create_at: new Date().getDate(),
  });
  company
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Company Was Successfully Added ",
        createdCompany: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.get("/info/:company_code", async (req, res, next) => {
  const company_code = req.params.company_code;

  const result = await Company.find({ company_code }).exec();

  const msg = { company_code };
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    // const result = await channel.assertQueue("e-market");
    channel.sendToQueue("e-market", Buffer.from(company_code));
    console.log("Job send successfully");

    /// now its time to listen
    channel.consume("send-stock-prices", (msg) => {
      const data = msg.content.toString();
      console.log(typeof data);
      let js = eval(data);
      channel.ack(msg);
      res.status(200).json({
        message: "Get a Company By " + company_code,
        company_details: result,
        stock_prices: js,
      });
    });
  } catch (ex) {
    console.log(ex);
  }
});

router.get("/getall", async (req, res, next) => {
  const id = req.params.companyId;
  const companies = await Company.find({});
  res.status(200).json({ companies });
  // TODO get the stocks that related to the company..
});
router.patch("/:companyId", (req, res, next) => {
  const id = req.params.companyId;
  res.status(200).json({
    message: "Update a Company By " + id,
  });
});

router.delete("/delete/:company_code", (req, res, next) => {
  const id = req.params.company_code;

  Company.findOneAndDelete({ company_code: id }, function (err) {
    if (err) console.log(err);
    res.status(200).json({
      message: "Delete a Company By " + id,
    });
  });

  // TODO Remove the stock prices related to Company_code
  // Send an event to rabbitMQ. with the ID.
});
module.exports = router;
