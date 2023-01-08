require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const userRouter = require('./routes/userRoutes')
const recordRouter = require('./routes/recordRoutes')
const divisionRouter = require('./routes/divisionRoutes')

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("DB Connected!"))
  .catch(e => console.log("DB connection error", e))

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

//   Router
app.use("/api/users", userRouter);
app.use("/api/records", recordRouter);
app.use("/api/divisions", divisionRouter);

// port declaration
const port = process.env.PORT || 3001;

app.listen(port, () =>
  console.log(`Server started listening on port: ${port}`)
);