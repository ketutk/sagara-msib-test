-- CreateEnum
CREATE TYPE "Size" AS ENUM ('s', 'm', 'l', 'xl', 'xxl');

-- CreateTable
CREATE TABLE "shirts" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "size" "Size" NOT NULL,
    "price" INTEGER NOT NULL,
    "stock" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "shirts_pkey" PRIMARY KEY ("id")
);
