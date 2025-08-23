import { auth } from "@clerk/nextjs/server";
import { Book } from "@prisma/client";
import { getBook } from "@/libs/book";
import EditForm from "./editForm";
import { notFound } from "next/navigation";


export default async function editBookPage({ 
    params 
}: { 
    params: Promise<{ bookId: string }> 
}) {

    const {bookId} = await params;
    const {userId} = await auth();

    const book: Book | null = await getBook(bookId)

    if(!book || book.userId !== userId){
        notFound();
    }

    return (
        <EditForm book = {book}/>
    )

}