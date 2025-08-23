import AddQuoteForm from "./addQuoteForm";

export default async function AddQuotePage({ 
    params 
}: { 
    params: Promise<{ bookId: string }> 
}) {
    const { bookId } = await params;
    
    return (
        <AddQuoteForm bookId={bookId} />
    )
}