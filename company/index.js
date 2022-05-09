const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const app = express();
const port = 8080;

const companyRoutes = require("./routes/company");

mongoose.connect(
  "mongodb+srv://anas:" +
    process.env.MONGO_ATLAS_PW +
    "@cluster0.gxqhf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const swaggerOptions = {
  swaggerDefinition: {
    components: {},
    info: {
      title: "Company API",
      description: "Company API allows you to Interact with Company Endpoints",
      contact: {
        name: "Anas Shahwan",
      },
      servers: [`http://localhost:${port}`],
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/api/v1.0/market/company", companyRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
