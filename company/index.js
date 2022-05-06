const express = require("express");
const app = express();
const port = 8080;

const companyRoutes = require("./routes/company");

app.get("/", (req, res) => {
  res.send("Hello Company Api");
});

app.use("/companies", companyRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
