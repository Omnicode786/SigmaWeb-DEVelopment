const { PrismaClient } = require('@prisma/client');
(async () => {
  const prisma = new PrismaClient();
  const result = await prisma.$queryRaw`SELECT 1+1 AS result;`;
  console.log("✅ Prisma works! Result:", result);
  await prisma.$disconnect();
})();
