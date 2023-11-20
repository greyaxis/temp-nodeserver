const express = require("express");

const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
  res.send("Hello User!");
});

app.listen(5000, () => {
  console.log("listening");
});
