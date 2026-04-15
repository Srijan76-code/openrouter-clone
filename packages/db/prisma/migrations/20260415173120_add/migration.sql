/*
  Warnings:

  - Added the required column `key` to the `PlatformUserApiKey` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PlatformUserApiKey" ADD COLUMN     "key" TEXT NOT NULL;
