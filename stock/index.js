const express = require("express");
const app = express();
const port = 8081;

app.get("/", (req, res) => {
  res.send("Hello Stock Api");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
