"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { Book } from "@prisma/client";
import { DeleteBookAction } from "@/app/actions/books";
import { redirect } from "next/navigation";

export default function BookCard({ book }: { book: Book }) {
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  // These would be your server actions for deleting/editing
  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Stop the event from bubbling up
    const confirmed = window.confirm(`Are you sure you want to delete ${book.title}?`);
    if(!confirmed){
        setIsMenuOpen(false);
        return;
    }
    startTransition(() => {
        DeleteBookAction(book.id)
    })

    setIsMenuOpen(false);
  };



  //edit handler
  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    redirect(`/books/${book.id}/edit`);
    
    setIsMenuOpen(false);
  };

  return (
    <div className="group">
      <Link href={`/books/${book.id}`}>
        <div className="aspect-[2/3] w-full overflow-hidden rounded-md bg-gray-200 shadow-lg transition-shadow duration-300 group-hover:shadow-xl">
          {book.coverImg ? (
            <Image
              src={book.coverImg}
              alt={`Cover of ${book.title}`}
              width={200}
              height={300}
              className="h-full w-full object-cover object-center rounded-md"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center bg-gray-100">
              <span className="text-xs text-gray-400 text-center px-2">
                {book.title}
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* Container for the text and the menu button */}
      <div className="pt-3 flex justify-between items-start">
        {/* Text content */}
        <div className="flex-grow overflow-hidden pr-2">
          <h3 className="text-sm font-semibold text-gray-900 truncate group-hover:text-indigo-600">
            <Link href={`/books/${book.id}`}>{book.title}</Link>
          </h3>
          <p className="mt-1 text-xs text-gray-500 truncate">{book.author}</p>
        </div>

        {/* --- KEBAB MENU IMPLEMENTATION --- */}

        <div className="relative flex-shrink-0">
          <button
            onClick={(e) => {
              e.preventDefault(); // Prevent any parent Link from redirecting navigation
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

          {/* The Dropdown Menu */}
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
      </div>
    </div>
  );
}
