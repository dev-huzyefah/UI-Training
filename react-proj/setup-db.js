#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, "db.json");
const examplePath = path.join(__dirname, "db.example.json");

// Create db.json from db.example.json if it doesn't exist
if (!fs.existsSync(dbPath)) {
  try {
    const exampleData = fs.readFileSync(examplePath, "utf8");
    fs.writeFileSync(dbPath, exampleData, "utf8");
    console.log("✓ Created db.json from db.example.json");
  } catch (error) {
    console.error("✗ Failed to create db.json:", error.message);
    process.exit(1);
  }
}
