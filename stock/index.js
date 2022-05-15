const express = require("express");
const app = express();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const stockRoutes = require("./routes/stocks");
const bodyParser = require("body-parser");
const mySqlConnection = require("./helpers/mysql-connection");
const port = 8081;
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
  const sql =
    "CREATE TABLE stocks (id int primary key NOT NULL AUTO_INCREMENT, company_code VARCHAR(255) NOT NULL, stock_price DOUBLE, create_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP)";
  mySqlConnection.query(sql, function (err, result) {
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
