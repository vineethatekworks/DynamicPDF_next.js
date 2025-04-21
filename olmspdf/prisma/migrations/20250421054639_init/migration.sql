-- CreateTable
CREATE TABLE "FormData" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "fatherName" TEXT,
    "age" INTEGER,
    "designation" TEXT,
    "address" TEXT,
    "postalAddress" TEXT,
    "phoneNumber" TEXT,
    "aadhaarNumber" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FormData_pkey" PRIMARY KEY ("id")
);
