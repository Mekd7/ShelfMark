
import prisma from "@/libs/prisma";
import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import BookHeader from "./bookHeader";
import Link from "next/link";
import QuoteCard from "@/components/quoteCard";
import FloatingActionButton from "@/components/FloatingActionButton";

export default async function BookDetail({ 
    params 
}: { 
    params: Promise<{ bookId: string }> 
}){
    const {userId} = await auth(); 
    const {bookId}  = await params;

    if(!userId){
        redirect('/sign-in')
    }

    const book = await prisma.book.findUnique({
        where: {
            id : bookId,
            userId: userId 
        },
        include:{
            quotes:{
                orderBy: {
                    createdAt: 'desc'
                } 
            }
        }
    })
    
    // With userId in the query, this check becomes simpler
    if(!book){
        notFound();
    }
    
    return(
        // Use a relative container so certain elements can be positioned within it if needed
        <main className="p-4 sm:p-6 md:p-8 relative min-h-screen">
            <BookHeader book={book} />

            <section className="pt-4 pb-24"> {/* Added padding-bottom to avoid overlap with FAB */}
                <div className="flex justify-between items-center border-b pb-2 mb-6">
                    <h2 className="text-2xl font-bold">My Quotes & Reflections</h2>
                </div>

                
                {book.quotes.length > 0 ? (
                    <>
                        
                        <div className="space-y-6">
                            {book.quotes.map((quote) => ( <QuoteCard key={quote.id} quote={quote}/>))}
                        </div>

                        <FloatingActionButton href={`/books/${book.id}/addquote`}/>
                    </>
                ) : (
                    /* --- The Empty State with a Clear Call-to-Action Button --- */
                    <div className="text-center py-16 border-2 border-dashed rounded-lg flex flex-col items-center justify-center">
                        <p className="text-gray-500 mb-6">
                            You haven't saved any quotes for this book yet.
                        </p>
                        <Link 
                            href={`/books/${book.id}/addquote`}
                            className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors duration-200"
                        >
                            Add Your First Quote
                        </Link>
                    </div> 
                )}
            </section>
        </main>
    )
}