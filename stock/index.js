const express = require("express");
const app = express();
const stockRoutes = require("./routes/stocks");

const port = 8081;

app.get("/", (req, res) => {
  res.send("Hello Stock Api");
});

app.use("/stocks", stockRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
