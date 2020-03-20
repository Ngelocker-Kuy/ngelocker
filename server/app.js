const express = require("express");
const app = express();
const index = require("./routes/index");
const cors = require("cors");
const error = require("./middleware/errorHandling");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", index);
app.use(error);

module.exports = app;
