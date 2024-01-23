const express = require("express");
const axios = require("axios");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
  res.send(`<div class="heytorus-login-btn-wr">
    <button onclick="location.href = 'http://myaccount.heytorus.loc:3000/login/?next=' + encodeURIComponent('http://health.heytorus.loc:5000/token-verification');" class="heytorus-login-btn" type="button">Login with HeyTorus</button>
  </div>`);
});

app.get("/token-verification", async (req, res) => {
  try {
    const r = await axios({
      url: `http://myaccount.heytorus.loc:3000/api/auth/verify/?token=${req.query.token}`,
      headers: {
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
    });
    if (r.status >= 400) throw r;
    console.log(r.data);

    const decoded = jwt.verify(r.data.data, process.env.SECRET);
    console.log(decoded);
    res.json(decoded);
  } catch (err) {
    console.error(err);
    res.send("err");
  }
});

app.listen(5000, () => {
  console.log("listening");
});
