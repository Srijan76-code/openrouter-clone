import { db } from "./client.ts";

/**
 * Database seed script
 * Run with: npx tsx packages/db/src/seed.ts
 *
 * Add seed data for development/testing below.
 */
async function main() {
  console.log("🌱 Starting database seed...");

  // TODO: Add seed data here
  // Example:
  // await db.user.create({
  //   data: { email: "admin@example.com", name: "Admin" },
  // });

  console.log("✅ Seed complete.");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
