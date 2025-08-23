"use client";
import { Quote } from "@prisma/client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteQuoteAction } from "@/app/actions/quotes";

export default function QuoteCard({ quote }: { quote: Quote }) {

    const[isMenuOpen, setIsMenuOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleEdit = () => {
        router.push(`/books/${quote.bookId}/quotes/${quote.id}/edit`);
        setIsMenuOpen(!isMenuOpen); 
    }

    const handleDelete = () => {
         if (confirm("Are you sure you want to delete this quote?")) {
            startTransition(() => {
                
                deleteQuoteAction(quote.id, quote.bookId)
                    .catch(() => {
                        alert("Failed to delete quote. Please try again.");
                    });
            });
        }
        setIsMenuOpen(!isMenuOpen); 
    }

  return (
    
    <div className="bg-white p-4 rounded-lg shadow-sm border relative">
    
      <div className="absolute top-2 right-2">
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsMenuOpen(!isMenuOpen); 
          }}
          className="p-1 rounded-full text-gray-500 hover:text-black hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {/* The SVG Icon for the three dots */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
          </svg>
        </button>
        {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
              <div className="py-1">
                <button
                  onClick={handleEdit}
                  className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100"
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                    className="block px-4 py-2 text-sm text-red-500 w-full text-left hover:bg-gray-100 disabled:opacity-75"
                >
                    {isPending ? "Deleting..." : "Delete"}
                  
                </button>
              </div>
            </div>
          )}
      </div>

      {/* The rest of your content is not affected by the button's new position */}
      <blockquote className="italic text-gray-700 border-l-4 border-gray-300 pl-4 pr-8">
        "{quote.content}"
      </blockquote>
      {quote.reflection && (
        <p className="mt-4 text-sm text-gray-600 bg-gray-50 p-3 rounded-md pr-8">
          <span className="font-semibold">My Reflection:</span>{" "}
          {quote.reflection}
        </p>
      )}
    </div>
  );
}
