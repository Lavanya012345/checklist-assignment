const express = require("express");
const path = require("path");
const checklistRouter = require("./checklist");

const app = express();
const PORT = 3000;

// Serve static files for the dashboard
app.use(express.static(path.join(__dirname, "public")));

// Use the checklist router for handling evaluation logic
app.use("/checklist", checklistRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
