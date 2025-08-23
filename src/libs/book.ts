//Books
//CRUD operation
import prisma from "./prisma"
import { Book,BookStatus, Prisma } from "@prisma/client"

export async function getBooks(userId: string, searchTerm?: string): Promise<Book[] | null> {
  // This is the base security filter. It ALWAYS applies.
  const whereClause:  Prisma.BookWhereInput = {
    userId: userId,
  };

  // If a search term is provided, we add the search logic.
  if (searchTerm && searchTerm.trim() !== "") {
    whereClause.OR = [
      {
        title: {
          contains: searchTerm,
           // This makes the search case-insensitive
        },
      },
      {
        author: {
          contains: searchTerm,
          
        },
      },
    ];
  }

  return prisma.book.findMany({
    where: whereClause,
    orderBy: {
      createdAt: 'desc',
    },
  });
}
//get a single book

export async function getBook(id : string) {
  return (
    prisma.book.findUnique({
      where:{ id }
    })
  )
  
}

// Add book
export async function addBook(
  //the forign key userId is important in this definition to connect the book being created with a certain user
  userId: string,
  title: string,
  author: string,
  coverImg: string | null,
  status: BookStatus ) {
    return (
      prisma.book.create({
        data: {title, 
               author, 
               coverImg, 
               status,
               user:{
                connect:{
                  id: userId
                }
              }},

        
      })
    )
}

//Edit Book
export async function editBook(
  //the forign key userId is important in this definition to connect the book being created with a certain user
  id : string,
  userId: string,
  title: string,
  author: string,
  coverImg: string | null,
  status: BookStatus ) {
    return (
      prisma.book.update({
        where: {id , userId},//we add the userId because we want to make sure that the user is editing a their own book and not any other book that they have the access of id for
        data: {title, 
               author, 
               coverImg, 
               status,
              },

        
      })
    )
}

//Delete Book
export async function deleteBook(id : string) {
  return (
    prisma.book.delete({
      where: {id}
    })
  )
}