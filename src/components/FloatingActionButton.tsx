"use client";

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';

export default function FloatingActionButton({ href }: { href: string }) {

  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleClick = () => {
    startTransition(() => {
      
      router.push(href);
    });
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="
        fixed bottom-8 right-8 z-10
        w-14 h-14 bg-black text-white rounded-full
        flex items-center justify-center
        shadow-lg
        hover:bg-gray-800
        transition-all duration-200
        disabled:bg-gray-400 disabled:cursor-wait
      "
    >
      {isPending ? (
        // A simple SVG spinner
        <svg
          className="animate-spin h-7 w-7 text-white"
          xmlns="http://www.w.org/2.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        // Your original Plus Icon SVG
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
        </svg>
      )}
    </button>
  );
}