//Database Functions(CRUD)


import prisma from "./prisma";
import { Prisma } from '@prisma/client';



export async function getAllQuotes(
  userId: string, 
  searchTerm?: string
): Promise<Prisma.QuoteGetPayload<{
  include: {
    book: {
      select: {
        id: true;
        title: true;
        author: true;
      };
    };
  };
}>[]> {
  try {
    const whereClause: Prisma.QuoteWhereInput = {
      userId: userId,
    };

    if(searchTerm && searchTerm.trim() !== ""){
      whereClause.OR = [
        {
          content: {
            contains: searchTerm,
            
          }
        },
        {
          reflection: {
            contains: searchTerm,
            
          }
        },
        {
          book: {
            title: {
              contains: searchTerm,
              
            }
          }
        },
        {
          book: {
            author: {
              contains: searchTerm,
              
            }
          }
        }
      ]
    }

    return await prisma.quote.findMany({
      where: whereClause,
      include: {
        book: {
          select: { 
            id: true,
            title: true,
            author: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  } catch (error) {
    console.error('Error fetching quotes:', error);
    return [];
  }
}

//get Quote
export async function getQuote(id: string) {
  return prisma.quote.findUnique({
    where: { id },
  });
}

//Add quote

export async function addQuote(
  userId: string,
  bookId: string,
  content: string,
  reflection: string | null
) {
  return prisma.quote.create({
    data: {
      content,
      reflection,
      user: {
        connect: {
          id: userId,
        },
      },
      book: {
        connect: {
          id: bookId,
        },
      },
    },
  });
}

//Edit Quote
export async function editQuote(
  id: string,
  userId: string,
  content: string,
  reflection: string | null
) {
  return prisma.quote.updateMany({
    where: { id, userId },
    data: {
      content,
      reflection,
    },
  });
}

//Delete Quote
export async function deleteQuote(quoteId: string, userId: string) {
  return prisma.quote.deleteMany({
    where: {
      id: quoteId,
      userId: userId, // The crucial security check
    },
  });
}
