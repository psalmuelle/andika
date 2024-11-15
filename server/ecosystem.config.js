module.exports = {
  apps: [
    {
      name: "andika",
      script: "npm",
      args: "run dev",
      env: {
        NODE_ENV: "development",
      },
    },
  ],
};
