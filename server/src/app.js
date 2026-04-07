const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const contestRoutes = require("./routes/contests.routes");
const editorialRoutes = require("./routes/editorials.routes");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:3000"
  })
);
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

app.use("/api/auth", authRoutes);
app.use("/api/contests", contestRoutes);
app.use("/api/editorials", editorialRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found." });
});

module.exports = app;
