const express = require('express');
const app = express();

let requestCount = 0;
let lastCheck = Date.now();

// 🔹 simulate database delay
function fakeDB() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: "Hotels data" });
    }, 100);
  });
}

// 🔹 middleware to count requests
app.use((req, res, next) => {
  requestCount++;
  next();
});

// 🔹 API endpoint
app.get('/api/hotels', async (req, res) => {
  const result = await fakeDB();
  res.json(result);
});

// 🔹 heavy endpoint (CPU block)
app.get('/api/heavy', async (req, res) => {
  let sum = 0;
  for (let i = 0; i < 1e7; i++) {
    sum += i;
  }
  res.json({ sum });
});

// 🔹 health check endpoint
app.get('/health', (req, res) => {
  const memory = process.memoryUsage();

  res.json({
    status: "OK",
    uptime: process.uptime(),
    requests: requestCount,
    memory: {
      rss: memory.rss,
      heapUsed: memory.heapUsed
    }
  });
});

// 🔥 event loop lag detector (IMPORTANT)
setInterval(() => {
  const now = Date.now();
  const lag = now - lastCheck - 1000;

  if (lag > 200) {
    console.log("⚠️ Server lag detected:", lag, "ms");
  }

  lastCheck = now;
}, 1000);

// 🔥 crash detection
process.on('uncaughtException', (err) => {
  console.error("💥 Uncaught Exception:", err);
});

process.on('unhandledRejection', (err) => {
  console.error("💥 Unhandled Promise Rejection:", err);
});

// 🔹 start server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});