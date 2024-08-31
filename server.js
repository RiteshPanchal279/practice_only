const express = require("express");
const app = express();
const db = require("./db");
const MenuItem = require("./models/MenuItem");
const bodyParser = require("body-parser");
require("dotenv").config();

app.use(bodyParser.json()); // it will contain the data in =>  req.body

app.get("/", function (req, res) {
  res.send("Hello and welcome to hotel");
});

const personRoutes = require('./routes/personRoutes');
app.use('/person',personRoutes);
const menuRoutes = require('./routes/menuItemsRoutes');
app.use('/menu',menuRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("listning on port 3000");
});
