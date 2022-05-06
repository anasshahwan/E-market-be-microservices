const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Get all companies",
  });
});

router.post("/", (req, res, next) => {
  res.status(200).json({
    message: "Add a Company",
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
