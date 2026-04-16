const axios = require('axios');

const TARGET_URL = 'http://localhost:3000/api/heavy'; // change endpoint

const CONCURRENT_USERS = 50;  // try 10 → 20 → 50 → 100
const REQUESTS_PER_USER = 20;

async function userSimulation(userId) {
  for (let i = 0; i < REQUESTS_PER_USER; i++) {
    try {
      const start = Date.now();

      const res = await axios.get(TARGET_URL);

      const time = Date.now() - start;
      console.log(`User ${userId} → ${res.status} (${time} ms)`);

    } catch (err) {
      console.log(`User ${userId} → ERROR`);
    }
  }
}

async function runTest() {
  console.log(`🚀 Starting test with ${CONCURRENT_USERS} users`);

  const users = [];

  for (let i = 0; i < CONCURRENT_USERS; i++) {
    users.push(userSimulation(i));
  }

  await Promise.all(users);

  console.log("✅ Test completed");
  console.log( "total user "+CONCURRENT_USERS * REQUESTS_PER_USER);
}

runTest();