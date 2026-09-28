module.exports = {
  apps: [
    {
      name: "techmire-web",
      script: "./deploy/runtime.cjs",
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: 5005,
        HOSTNAME: "127.0.0.1",
      },
    },
  ],
};
