const express = require("express");
const cors    = require("cors");
const fetch   = require("node-fetch");
const path    = require("path");
const fs      = require("fs");

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static files from /public if it exists, otherwise from root
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(__dirname));

// Proxy endpoint
app.post("/api/chat", async (req, res) => {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "ANTHROPIC_API_KEY not set on server." });
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type":      "application/json",
        "x-api-key":         apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fallback: always serve index.html
app.get("*", (req, res) => {
  const publicIndex = path.join(__dirname, "public", "index.html");
  const rootIndex   = path.join(__dirname, "index.html");
  if (fs.existsSync(publicIndex)) {
    res.sendFile(publicIndex);
  } else if (fs.existsSync(rootIndex)) {
    res.sendFile(rootIndex);
  } else {
    res.status(404).send("index.html not found. Place it in /public or the repo root.");
  }
});

app.listen(PORT, () => console.log(`Meal Plan proxy running on port ${PORT}`));
