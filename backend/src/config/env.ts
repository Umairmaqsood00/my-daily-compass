import dotenv from "dotenv";
import fs from "fs";
import path from "path";

const candidatePaths = [
  path.resolve(process.cwd(), ".env"),
  path.resolve(process.cwd(), "backend/.env"),
  path.resolve(process.cwd(), "frontend/.env"),
  path.resolve(__dirname, "../../.env"),
  path.resolve(__dirname, "../../../.env"),
];

for (const configPath of candidatePaths) {
  if (fs.existsSync(configPath)) {
    dotenv.config({ path: configPath });
  }
}

dotenv.config();

const requiredInProduction = ["DATABASE_URL", "JWT_SECRET", "JWT_REFRESH_SECRET"] as const;

for (const key of requiredInProduction) {
  if (process.env.NODE_ENV === "production" && !process.env[key]) {
    throw new Error(`${key} is required in production`);
  }
}

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT || 5000),
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173",
  databaseUrl: process.env.DATABASE_URL || "",
  jwtSecret: process.env.JWT_SECRET || "development_access_secret",
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || "development_refresh_secret",
  isDatabaseConfigured: Boolean(process.env.DATABASE_URL),
  allowMockAuth: process.env.ALLOW_MOCK_AUTH === "true",
};
