import AddQuoteForm from "@/app/(app)/books/[bookId]/addquote/addQuoteForm";
import Modal from "@/components/modal";

export default async function AddQuoteModal({
  params
}: {
  params: Promise<{ bookId: string }>
}) {
  const { bookId } = await params;
  
  return (
    <Modal>
      <AddQuoteForm bookId={bookId} />
    </Modal>
  );
}