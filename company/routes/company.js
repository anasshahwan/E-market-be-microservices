const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Get all companies",
  });
});

router.post("/", (req, res, next) => {
  res.status(200).json({
    message: "Post all companies",
  });
});

module.exports = router;
