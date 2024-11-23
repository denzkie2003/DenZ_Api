const express = require("express");
const novelFireRoutes = require("./src/routes/novelfireRoute");
const novelBuddyRoutes = require("./src/routes/novelbuddyRoute");
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
app.use("/novel", novelBuddyRoutes);

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});