const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const amqp = require("amqplib");
const app = express();
const port = 8080;

const companyRoutes = require("./routes/company");

mongoose.connect(
  "mongodb+srv://anas:" +
    process.env.MONGO_ATLAS_PW +
    "@cluster0.gxqhf.mongodb.net/e-market?retryWrites=true&w=majority"
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
async function connect() {
  const msg = { id: 4 };
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    const result = await channel.assertQueue("e-market");
    channel.sendToQueue("e-market", Buffer.from(JSON.stringify(msg)));
    console.log("Job send successfully");
  } catch (ex) {
    console.log(ex);
  }
}

//connect();
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
