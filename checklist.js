const express = require("express");
const axios = require("axios");
const rules = require("./rules");

const router = express.Router();

// API URL
const API_URL =
  "http://qa-gb.api.dynamatix.com:3100/api/applications/getApplicationById/67339ae56d5231c1a2c63639";

// Function to evaluate rules
const evaluateRules = (data, rules) => {
  return rules.map((rule) => {
    const passed = rule.condition(data);
    return {
      name: rule.name,
      status: passed ? "Passed" : "Failed",
    };
  });
};

// GET route for checklist
router.get("/", async (req, res) => {
  try {
    const response = await axios.get(API_URL);
    const data = response.data;

    const results = evaluateRules(data, rules);
    res.json(results);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ error: "Failed to fetch data from API" });
  }
});

module.exports = router;
