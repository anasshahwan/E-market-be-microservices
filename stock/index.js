const express = require("express");
const mysql = require("mysql");
const app = express();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const stockRoutes = require("./routes/stocks");
const port = 8081;
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });

var con = mysql.createConnection({
  port: "3306",
  user: process.env.AWS_MYSQL_USER,
  password: process.env.AWS_MYSQL_PASS,
  host: process.env.AWS_MYSQL_HOST,
  database: process.env.AWS_MYSQL_DB_NAME,
});

con.connect((err) => {
  if (err) {
    console.log(err.message);
    return;
  }
  console.log("connected:D");
});

const swaggerOptions = {
  swaggerDefinition: {
    components: {},
    info: {
      title: "Stock Api",
      description: "Stock Api allows you to get all the stocks",
      contact: {
        name: "Anas Shahwan",
      },
      servers: ["http://localhost:8081"],
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const createStocksTable = () => {
  const sql = "CREATE TABLE stocks (name VARCHAR(255), price INT)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
};

app.get("/", (req, res) => {
  res.send("Hello Stock Api");
});

app.use("/api/v1.0/market/stock", stockRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
