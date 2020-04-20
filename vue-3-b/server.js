const express = require("express");
var app = express();
const cors = require("cors");
const port = 3000;
const bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.json());
var messages = ["Hello", "Hi"];

app.get("/messages", (req, res) => {
  res.send(messages);
});
app.post("/messages", (req, res) => {
  let msg = req.body;
  messages.push(msg.message);
  console.log(msg.message);
  res.json(msg.message);
});
app.listen(port, () => console.log("Listening "));
