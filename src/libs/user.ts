//CRUD operation definition
//Users

import prisma from './prisma'; 

export async function syncUser(userId: string, userEmail: string | null) {
  // Check if the user already exists in your database
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  // If the user does not exist, create them.
  // This is the application-logic equivalent of what your `addUser` function was doing.
  if (!user) {
    console.log(`User with ID ${userId} not found. Creating new user...`);
    await prisma.user.create({
      data: {
        id: userId,
        email: userEmail || '', // Use the email from Clerk, handle if it's null
      },
    });
    console.log(`Successfully created user ${userId}`);
  }
}