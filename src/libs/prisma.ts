// lib/prisma.ts

import { PrismaClient } from '@prisma/client';

// 1. Declare a global variable to hold the Prisma instance.
declare global {
  var prisma: PrismaClient | undefined;
}

// 2. The core logic:
//    Check if an instance already exists on the global object.
//    If it does, use that existing one.
//    If it does NOT, create a NEW one.
const prisma = global.prisma || new PrismaClient();

// 3. In development, save the instance to the global object.
//    This prevents new instances from being created on every hot-reload.
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

// 4. Export the single, shared instance.
export default prisma;