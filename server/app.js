const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const index = require("./routes/index");
const cors = require("cors");
const error = require("./middleware/errorHandling");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", index);
app.use(error);

//if want to test comment below codes
// app.listen(port, () => {
//   console.log(`listening on port ${port}`);
// });

module.exports = app;
