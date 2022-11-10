const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5001;
app.use(cors());
app.use(express.json());
app.use(require("./routes/hamster"));

const dbo = require("./db/connect");

app.listen(port, () => {
  dbo.connectToServer(function (err) {
    if (err) {
      console.log(err);
    }
  });
  console.log("server is running on ", port);
});
