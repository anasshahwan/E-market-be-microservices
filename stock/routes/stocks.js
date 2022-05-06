const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Get all Stocks",
  });
});

router.post("/", (req, res, next) => {
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
