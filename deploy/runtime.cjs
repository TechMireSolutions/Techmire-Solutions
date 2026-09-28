const { spawn } = require("node:child_process");
const path = require("node:path");

const nextBinPath = path.resolve(__dirname, "../node_modules/next/dist/bin/next");
const port = process.env.PORT || 3000;
const hostname = process.env.HOSTNAME || "127.0.0.1";

const nextProcess = spawn(process.execPath, [nextBinPath, "start", "--port", port, "--hostname", hostname], {
  stdio: "inherit",
  env: process.env,
});

nextProcess.on("close", (code) => {
  process.exit(code);
});

// Pass through signals for graceful shutdown
const signals = ["SIGINT", "SIGTERM", "SIGQUIT"];
signals.forEach((signal) => {
  process.on(signal, () => {
    nextProcess.kill(signal);
  });
});
