const dotenv = require('dotenv');
dotenv.config(); // Загружаем переменные окружения из .env файла

module.exports = {
  apps : [{
    name: "open_ai_api",
    script: "./server.js",
    env: {
      NODE_ENV: "development",
      OPEN_AI_KEY: process.env.OPEN_AI_KEY,
    },
    env_production: {
      NODE_ENV: "production",
      OPEN_AI_KEY: process.env.OPEN_AI_KEY,
    }
  }]
}
console.log(process.env.OPEN_AI_KEY);