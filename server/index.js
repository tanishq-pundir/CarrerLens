// server/index.js

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const analyzeRoutes = require("./routes/analyze"); // Must export router

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// All routes under /api/analyze
app.use("/api/analyze", analyzeRoutes);

app.get("/", (req, res) => {
  res.send("New CareerLens API is working great 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
