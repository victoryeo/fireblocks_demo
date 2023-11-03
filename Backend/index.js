const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();
const port = 8090;

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);

app.get("/", (req, res) => {
  res.send(
    `Welcome to your backend Fireblocks SDK server! There are ${Object.keys(apiPath).length
    } routes available: ${Object.values(apiPath).join(" and ")}.`
  );
});


const server = app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

const apiPath = {
  helloworld: "/api/helloworld",
};

app.get(apiPath.helloworld, (req, res) => {
  return res.status(200).set("Content-Type", "application/json").send("helloworld\n");
});
