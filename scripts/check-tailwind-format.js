#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

/**
 * Script untuk check format Tailwind classes dan memberikan warning
 */

function checkTailwindFormatting(filePath) {
  console.log(`🔍 Checking Tailwind formatting for: ${filePath}`);

  try {
    // Check dengan prettier
    execSync(`npx prettier --check "${filePath}"`, { stdio: "pipe" });
    console.log(`✅ ${filePath} - Tailwind classes sudah terformat dengan baik`);
    return true;
  } catch (error) {
    console.log(`⚠️  ${filePath} - Tailwind classes belum terformat!`);
    console.log(`   💡 Jalankan: npx prettier --write "${filePath}" untuk fix`);
    return false;
  }
}

// Get file dari command line atau default
const filePath = process.argv[2] || "src/components/TestUnformattedTailwind.tsx";
const fullPath = path.resolve(filePath);

if (!fs.existsSync(fullPath)) {
  console.error(`❌ File tidak ditemukan: ${fullPath}`);
  process.exit(1);
}

const isFormatted = checkTailwindFormatting(fullPath);
process.exit(isFormatted ? 0 : 1);
