const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const data = require("./data/data.json");
const app = require("./app");

//database connection
mongoose.connect(process.env.DATABASE_LOCAL).then(() => {
  console.log("Database connected!!!");
});

const port = process.env.PORT || 8080;

app.listen(port);
