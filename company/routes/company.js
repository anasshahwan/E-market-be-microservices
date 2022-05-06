const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Company = require("../models/company.js");

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Get all companies",
  });
});

router.post("/", (req, res, next) => {
  console.log(req.body);
  const company = new Company({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
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

router.get("/:companyId", (req, res, next) => {
  const id = req.params.companyId;
  res.status(200).json({
    message: "Get a Company By " + id,
  });
});

router.patch("/:companyId", (req, res, next) => {
  const id = req.params.companyId;
  res.status(200).json({
    message: "Update a Company By " + id,
  });
});

router.delete("/:companyId", (req, res, next) => {
  const id = req.params.companyId;
  res.status(200).json({
    message: "Delete a Company By " + id,
  });
});
module.exports = router;
