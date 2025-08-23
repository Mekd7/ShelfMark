import { BookStatus, PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export const seed = async () => {
   if (process.env.NODE_ENV === 'production') return;

  const userId = 'user_test_12345';

  const existingBooks = await prisma.book.count({ where: { userId } });
  
  if (existingBooks > 0) {
    console.log('Data already exists - skipping seed');
    return;
  }
  console.log('Seeding...');

  try {
    const userId = 'user_30xXWvmR8xZ6hhXABpliNpc6mes';

    // Use upsert to create the user only if they don't exist
    await prisma.user.upsert({
      where: { id: userId },
      update: {}, // No updates needed, just ensures it exists
      create: {
        id: userId,
        email: 'mekdelawitandualem07@gmail.com',
      },
    });
    console.log(`User created or found: ${userId}`);

    // Create a new book and its associated quotes using nested writes
    await prisma.book.create({
      data: {
        userId: userId,
        title: 'Atomic Habits',
        author: 'James Clear', 
        coverImg: 'https://tse4.mm.bing.net/th/id/OIP.8SRD_8Milb3iV8VRAXcbhwHaLM?rs=1&pid=ImgDetMain&o=7&rm=3',
        status: BookStatus.TO_READ,
        quotes: {
          create: {
            content: 'The only way to learn is to live.',
            reflection: 'This is a core theme of the book.',
            userId: userId,
          },
        },
      },
    });
    console.log('Seeded book: "Atomic Habits"');

    // Create another book with its associated quote
    await prisma.book.create({
      data: {
        userId: userId,
        title: 'A little life',
        author: 'Sidney Sheldon',
        coverImg: 'https://th.bing.com/th/id/OIP.2BQwdmtF66VR6tbiyAdMQQHaLQ?w=202&h=308&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
        status: BookStatus.READING,
        quotes: {
          create: {
            content: 'Human beings have a remarkable ability to accept the bizarre and move on.',
            reflection: 'So true, especially in the modern world.',
            userId: userId,
          },
        },
      },
    });
    console.log('Seeded book: "A little life"');

    // Create a third book without a quote
    await prisma.book.create({
      data: {
        userId: userId,
        title: 'Tell Me Your Dreams',
        author: 'Sidney Sheldon',
        coverImg: 'https://th.bing.com/th/id/OIP.5O4Poc3NSTXYT7cf0Yc51QHaL4?w=114&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
        status: BookStatus.FINISHED,
      },
    });
    console.log('Seeded book: "Tell Me Your Dreams"');

    console.log('Seeding finished successfully.');
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

seed();





