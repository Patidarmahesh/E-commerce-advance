const cors = require("cors");
const express = require("express");
const dotenv = require("dotenv");
const routes = require("./routes/authRoutes.js");
const categoryRoutes = require('./routes/categoryRoutes.js')
const productRoutes = require('./routes/productRoutes.js')
const connectdb = require("./configure/connectdb.js");
const PORT = 8000;

// ________|CONNECT DB WITH MONGODB|_________

connectdb();

// ________|CONNECT DB WITH MONGODB|_________

const app = express();

app.use(
  cors({
    origin:"*",
  })
);


app.use(express.json());

app.use("/api/auth", routes);
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);

// ________|APP IS RUNNING|_________

app.listen(PORT, (error) => {
  if (error) {
    console.log(`SOMETHING IS WRONG ${error}`);
  } else {
    console.log(`APP IS RUNNING IN PORT ${PORT}`);
  }
});

// ________|APP IS RUNNING|_________
