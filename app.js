const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "CI/CD Pipeline is Working!"
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK"
  });
});

module.exports = app;
