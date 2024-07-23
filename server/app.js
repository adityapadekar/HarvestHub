/*******************************************************************************
 * Server Setup
 ******************************************************************************/
require("dotenv").config();
require("express-async-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  }),
);
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));

/*******************************************************************************
 * Testing Get Route
 ******************************************************************************/

app.get("/", (req, res) => {
  res.send("Harvest Hub Server!");
});

/*******************************************************************************
 * HandleRouting
 ******************************************************************************/
const authRouter = require("./routes/auth.route");
const adminRouter = require("./routes/admin.route");
const moderatorRouter = require("./routes/moderator.route");
const itemRouter = require("./routes/item.route");
const marketRouter = require("./routes/market.route");

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/moderator", moderatorRouter);
app.use("/api/v1/item", itemRouter);
app.use("/api/v1/market", marketRouter);

/*******************************************************************************
 * Manage Unexpected Errors
 ******************************************************************************/
const { pageNotFound, errorHandler } = require("./middlewares");

app.use(pageNotFound);
app.use(errorHandler);

/*******************************************************************************
 * Export App
 ******************************************************************************/
module.exports = app;
