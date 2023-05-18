const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mainRoute = require("./routes/index");
dotenv.config();

const PORT = process.env.PORT || 3000;

// main routes
app.use("/rest", mainRoute);

// Start the server
app.listen(PORT, () => {
  console.log("Server listening on port ", PORT);
});
