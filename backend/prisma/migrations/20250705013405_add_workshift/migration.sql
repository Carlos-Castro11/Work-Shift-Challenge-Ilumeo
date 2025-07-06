-- CreateTable
CREATE TABLE "WorkShift" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WorkShift_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WorkShift" ADD CONSTRAINT "WorkShift_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
