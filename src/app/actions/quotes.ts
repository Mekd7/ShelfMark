"use server";

import { addQuote, editQuote, deleteQuote } from "@/libs/quotes";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";


export type Errors = {
    content? : string,
    _form? : string
}

export type FormStateForQuotes = {
    errors: Errors,
    success?: boolean
}


export async function addQuoteAction(
  bookId: string, 
  prevState: FormStateForQuotes, 
  formData: FormData
): Promise<FormStateForQuotes> {

    const { userId } = await auth();

    if (!userId) {
        return {
            errors: { _form: "You must be logged in to add a quote." },
            success: false
        };
    }
    
    const errors: Errors = {};
    const content = formData.get('content') as string;
    const reflection = formData.get('reflection') as string | null;

    if (!content || content.trim() === "") {
        errors.content = "Content is required!";
    }

    if (Object.keys(errors).length > 0) {
        return { errors, success: false };
    }

    try {
       await addQuote(userId, bookId, content, reflection);
    } catch  {
        return { errors: { _form: "Something went wrong." }, success: false };
    }

    revalidatePath(`/books/${bookId}`);
    return { errors: {}, success: true };
}

export async function editQuoteAction(
  quoteId: string, 
  bookId: string, 
  prevState: FormStateForQuotes, 
  formData: FormData
): Promise<FormStateForQuotes> {

    const { userId } = await auth();

    if (!userId) {
        return {
            errors: { _form: "You must be logged in to edit a quote." },
            success: false
        };
    }
    
    const errors: Errors = {};
    const content = formData.get('content') as string;
    const reflection = formData.get('reflection') as string | null;

    if (!content || content.trim() === "") {
        errors.content = "Content is required!";
    }

    if (Object.keys(errors).length > 0) {
        return { errors, success: false };
    }

    try {
       await editQuote(quoteId, userId, content, reflection);
    } catch  {
       
        return { errors: { _form: "Something went wrong." }, success: false };
    }

    revalidatePath(`/books/${bookId}`);
    
    return { errors: {}, success: true };
}
    
//delete

export async function deleteQuoteAction(quoteId: string, bookId: string) {
  
  const { userId } = await auth();
  if (!userId) {
    throw new Error("You must be logged in to delete a quote.");
  }

  try {
    
    await deleteQuote(quoteId, userId);
  } catch (error) {
    
    console.error("Delete Quote Action Error:", error);
    throw new Error("Failed to delete the quote.");
  }

  
  revalidatePath(`/books/${bookId}`);
}