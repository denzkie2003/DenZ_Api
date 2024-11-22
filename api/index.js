const express = require("express");
const novelFireRoutes = require("./src/routes/novelfireRoute");
const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send({
    success: true,
    message: "Welcome to DenZ Api - scrape data from various novel sites! Seamlessly access  id, title, image and more.",
  });
});

app.use("/novel", novelFireRoutes);

module.exports = app;