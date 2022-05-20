async function listenToQueue() {
  var data = [];
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    console.log("run everytime sever Starts");

    channel.consume("e-market", (msg) => {
      console.log("run when you consume..");
      let company_code = msg.content.toString();
      const sql = `select stock_price,create_at from stocks where company_code="${company_code}"`;
      mySqlConnection.query(sql, async function (err, result) {
        if (err) throw err;
        console.log("Fetch the Stocks");
        console.log(result);
        data.push(result);
        console.log("0as-dsa--sad-as-da-das");
        channel.ack(msg);
        console.log(" First Queue Was Acknowledge");
        /// send stock prices  t o company
      });
    });
  } catch (ex) {
    console.log(ex);
  }

  try {
    console.log("Data inside", data);
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    channel.sendToQueue(
      "send-stock-prices",
      Buffer.from(JSON.stringify(data)),
      { persistent: true }
    );
    console.log("Sending Stock (Second Job) successfully");
  } catch (ex) {
    console.log(ex);
  }
}
// async function connect() {
//   const msg = { id: 4 };
//   try {
//     const connection = await amqp.connect("amqp://localhost:5672");
//     const channel = await connection.createChannel();
//     //    const result = await channel.assertQueue("e-market");
//     channel.consume("e-market", (msg) => {
//       let company_code = msg.content.toString();

//       const sql = `select stock_price,create_at from stocks where company_code="${company_code}"`;
//       mySqlConnection.query(sql, async function (err, result) {
//         if (err) throw err;
//         console.log("Fetch the Stocks");
//         console.log(result);
//         channel.ack(msg);
//         console.log(" First Queue Was Acknowledge");
//         /// send stock prices  to company

//         const createChannel = await channel.assertQueue("send-stock-prices");
//         channel.sendToQueue(
//           "send-stock-prices",
//           Buffer.from(JSON.stringify(result)),
//           { persistent: true }
//         );
//         console.log("Job send successfully");
//       });
//     });
//   } catch (ex) {
//     console.log(ex);
//   }
// }

//connect();
//listenToQueue();
