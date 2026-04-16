# Node.js Server & Stress Tester

This project provides a simple Express server and a utility script to simulate concurrent user requests for stress testing APIs. It's useful for monitoring application stability, measuring response times, and testing crash/load handling.

## Project Structure

- `server.js`: A mock Express API server designed to simulate real-world behaviors (delays, CPU blocking) and monitor its own performance.
- `stress.js`: A script that uses `axios` to simulate multiple concurrent users sending requests to target endpoints.
- `package.json`: Defines project dependencies (`express`, `axios`).

## Prerequisites

Node.js installed on your machine.

## Installation

1. Clone or download the project.
2. Navigate into the directory and install dependencies:

```bash
npm install
```

## Running the Server

Start the local test server by running:

```bash
npm start
# or
node server.js
```

The server will be available at `http://localhost:3000`.

### Server Endpoints

The server exposes the following mock endpoints:

- `GET /api/hotels`: Simulates a standard endpoint with a 100ms artificial database delay.
- `GET /api/heavy`: Simulates a CPU-intensive task that blocks the Node.js event loop.
- `GET /health`: Returns server status, uptime, request count, and memory usage metrics.

### Server Monitoring

The server includes:
- **Event Loop Lag Detector**: Prints a warning in the console if the event loop lag exceeds 200ms.
- **Crash Detection**: Catches and logs `uncaughtException` and `unhandledRejection` without immediately terminating the process.

## Running the Stress Test

You can use the `stress.js` script to bombard any server (local or remote) with requests.

1. Open `stress.js`.
2. Configure the testing parameters at the top of the file:
   - `TARGET_URL`: The URL you want to test (default is currently set to an external site, or uncomment the localhost URL to test the local server).
   - `CONCURRENT_USERS`: Number of concurrent user cycles (e.g., 50).
   - `REQUESTS_PER_USER`: Number of requests each simulated user will make (e.g., 20).
3. Run the stress tester:

```bash
node stress.js
```

The script will output the response time for each request and summarize the total number of simulated requests at the end.
