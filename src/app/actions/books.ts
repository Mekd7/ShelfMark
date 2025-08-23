"use server";
import { addBook } from "@/libs/book";
import { editBook } from "@/libs/book";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { BookStatus } from "@prisma/client";
import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { deleteBook } from "@/libs/book";
import prisma from "@/libs/prisma";

export type Errors = {
    bookName? : string,
    authorName? : string,
    status? : string
    _form? : string
}

export type FormState = {
    errors: Errors
}

//server action to create book
export async function CreateBook(prevState: FormState,formdata: FormData) {
    const errors: Errors = {}

    const {userId} = await auth();

    if(!userId){
    return {
        errors: {_form: "You must be logged in to add a book."}
    };
}
 
    const bookName = formdata.get('book name') as string;
    const authorName = formdata.get('author name') as string;
    const status = formdata.get('book status') as BookStatus;
    const coverImage = formdata.get("coverImage") as File;

    if(!bookName){
        errors.bookName = "Book Name required!"
    }
    if(!authorName){
        errors.authorName = "Author Name required!"
    }
    if(!status){
        errors.status = "Book Status required!"
    }

    if(Object.keys(errors).length > 0){
        return {errors};
    }

     let imageUrl: string | null = null;
     if (coverImage && coverImage.size > 0) {
        try {
            const { url } = await put(coverImage.name, coverImage, {
                access: "public",
            });
            imageUrl = url;
        } catch {
            return { errors: { _form: "Failed to upload image." } };
    }
  }

    try{
        await addBook(userId, bookName, authorName, imageUrl, status )
    }catch(err){
        if(err instanceof Error){
            return {errors: {_form: err.message}}
        }
        else{
            return {errors: {_form: "Something went wrong."}}   
        }
    }

    revalidatePath('/dashboard');
    redirect('/dashboard');
}

//server action to edit book

export async function EditBookAction(id: string, prevState: FormState, formdata: FormData) {
    console.log('All form data entries:');
    for (const [key, value] of formdata.entries()) {
        console.log(key, value);
    }
   
    const { userId } = await auth();

    if (!userId) {
        return { errors: { _form: "You must be logged in to edit a book." } };
    }

    const bookName = formdata.get('book name') as string;
    const authorName = formdata.get('author name') as string;
    const status = formdata.get('book status') as BookStatus;
    const coverImage = formdata.get("coverImage") as File;

    
    const errors: Errors = {}
    if (!bookName) {
        errors.bookName = "Book Name required!"
    }
    if (!authorName) {
        errors.authorName = "Author Name required!"
    }
    if (!status) {
        errors.status = "Book Status required!"
    }
    if (Object.keys(errors).length > 0) {
        return { errors };
    }

    
    
    
    const existingBook = await prisma.book.findUnique({
        where: { id: id, userId: userId } // This also acts as a security check!
    });

    if (!existingBook) {
        return { errors: { _form: "Book not found or you do not have permission to edit it." } };
    }

    // Initialize the imageUrl with the one that's already in the database.
    let imageUrl: string | null = existingBook.coverImg;

    if (coverImage && coverImage.size > 0) {
        // Step 1: Generate a unique and safe filename.
        // We use the book's ID to ensure it's unique and related to this specific book.
        const filename = `${id}-${coverImage.name}`;
        
        console.log('Uploading new image with filename:', filename);

        try {
            // Step 2: Use the new, safe filename for the upload.
            const blob = await put(filename, coverImage, {
                access: "public",
            });
            
            console.log('Vercel Blob response:', blob);

            // Step 3: Set the imageUrl from the successful response.
            imageUrl = blob.url;
            console.log('Image URL successfully set to:', imageUrl);

        } catch (err) {
            console.error('Image upload failed:', err);
            return { errors: { _form: "Failed to upload new image." } };
        }
    }


    try {
        console.log('Before update:', { bookName, authorName, status });
        const updatedBook = await editBook(id, userId, bookName, authorName, imageUrl, status);
        console.log('After update:', updatedBook);
    } catch (err) {
        console.error('Update error:', err);
        if (err instanceof Error) {
            return { errors: { _form: err.message } };
        } else {
            return { errors: { _form: "Something went wrong during the update." } };
        }
    }

   
    // It tells Next.js to re-fetch the data for these pages.
    revalidatePath('/dashboard');
    revalidatePath(`/books/${id}`);
    revalidatePath(`/books/${id}/edit`);

    // Now redirect the user.
    redirect('/dashboard');
}




//server action to delete book

export async function DeleteBookAction(bookId:string) {

    const {userId} = await auth()
    if (!userId){
        throw new Error("You must be logged in to delete a book.");
    }
    try{
        deleteBook(bookId)
    }catch{
        throw new Error("Unable to delete this book")
    }
    revalidatePath('/dashboard')
}