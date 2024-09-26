module.exports = {
  apps: [
    {
      name: "abh_customer",
      script: "npm",
      args: "run start",
      instances: "max",
      cwd: "/home/azureuser/abh_customer",
      watch: true,
      ignore_watch: ["node_modules"],
      max_restarts: 5,
      autorestart: true,
      log_date_format: "YYY-MM-DD HH:mm:ss",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
