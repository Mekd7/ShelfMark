import { Book, BookStatus } from "@prisma/client"; 
import BookCard from "@/components/bookCard";
import Link from "next/link";
import FloatingActionButton from "@/components/FloatingActionButton";

//this helper component is only used to render one row (a certain status and it's respective row of books)
//the main filtering or books is done by the main BookShelf component 
function ShelfRow({title, books} : {title: string, books: Book[]}){
    if(books.length == 0){
        return null;
    }
    return(
        <section className="mb-12">
            <h2 className="text-2xl font-bold border-b border-gray-500 pb-2 mb-6">
                {title}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 ">
                {books.map((book) => <BookCard key={book.id} book={book}/>)}
            </div>
        </section>
    )

}


export default function BookShelf({books} : {books : Book[]}){
    const filteredToRead = books.filter((book) => book.status === BookStatus.TO_READ);
    const filteredReading = books.filter((book) => book.status === BookStatus.READING);
    const filteredFinished = books.filter((book) => book.status === BookStatus.FINISHED);

    return(
        <div className="mt-16">
            {books.length === 0 ? (
                <>
                <div className="text-center py-16">
                    <p className="text-gray-500">
                        Your bookshelf is empty. Time to add your first book!
                    </p>

                </div>
                <div className="flex justify-center">
                    <Link href={'/add-book'}>
                    <button className="bg-black text-white py-2 px-4 rounded-[20px] flex gap-2 justify-center items-center">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <path d="M11 17H13V13H17V11H13V7H11V11H7V13H11V17ZM12 22C10.6167 22 9.31667 21.7417 8.1 21.225C6.88333 20.6917 5.825 19.975 4.925 19.075C4.025 18.175 3.30833 17.1167 2.775 15.9C2.25833 14.6833 2 13.3833 2 12C2 10.6167 2.25833 9.31667 2.775 8.1C3.30833 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.31667 8.1 2.8C9.31667 2.26667 10.6167 2 12 2C13.3833 2 14.6833 2.26667 15.9 2.8C17.1167 3.31667 18.175 4.025 19.075 4.925C19.975 5.825 20.6833 6.88333 21.2 8.1C21.7333 9.31667 22 10.6167 22 12C22 13.3833 21.7333 14.6833 21.2 15.9C20.6833 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6917 15.9 21.225C14.6833 21.7417 13.3833 22 12 22ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20Z" fill="white"/>
                        </svg>
                        Add Book
                    </button>
                    </Link>
                </div>
                </>
            ) : (
                <>
                <ShelfRow title="To Read" books={filteredToRead}/>
                <ShelfRow title="Currently Reading" books={filteredReading}/>
                <ShelfRow title="Finished" books={filteredFinished}/>
                <FloatingActionButton href="/add-book"/>
                </>
            )}

        </div>
    )

}