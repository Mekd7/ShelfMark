import Modal from "@/components/modal";
import EditQuoteForm from "@/app/(app)/books/[bookId]/quotes/[quoteId]/edit/editQuoteForm";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/libs/prisma"; // It's best to import prisma directly for secure fetches
import { notFound } from "next/navigation";

// STEP 1: Make the component async and accept 'params'
export default async function EditQuoteModal({ 
  params 
}: { 
  params: Promise<{ bookId: string, quoteId: string }> 
}) {
    
    // STEP 2: Securely fetch the data for the specific quote
    const { userId } = await auth();
    if (!userId) {
        // If no user, they can't see the modal.
        // You can return null or an error component, but notFound is clean.
        notFound();
    }
    const resolvedParams = await params;
    const { bookId, quoteId } = resolvedParams;

    // Use a single, secure query to get the quote.
    // This ensures the quote exists, belongs to the right book, and is owned by the user.
    const quote = await prisma.quote.findUnique({
        where: {
            id:quoteId,
            bookId:bookId,
            userId: userId,
        }
    });

    // If the query returns nothing, the quote isn't valid for this user.
    if (!quote) {
        notFound();
    }

    // STEP 3: Pass the fetched 'quote' object as a prop to the form
    return (
        <Modal>
            <EditQuoteForm quote={quote} />
        </Modal>
    );
}