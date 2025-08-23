import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import EditQuoteForm from "./editQuoteForm";
import prisma from "@/libs/prisma";


export default async function EditQuotePage({ 
  params 
}: { 
  params: Promise<{ bookId: string, quoteId: string }> 
}){
    const resolvedParams = await params;
    const { bookId, quoteId } = resolvedParams;
    const {userId} = await auth();

    if(!userId){
        notFound();
    }

    const quote = await prisma.quote.findUnique({
        where:{
            id : quoteId,
            bookId : bookId,
            userId : userId,
        }
    })

    if(!quote){
        notFound();
    }

    return (
        <EditQuoteForm quote = {quote}/>

    )



}