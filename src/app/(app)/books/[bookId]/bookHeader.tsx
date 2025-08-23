"use client";


import { useState, useEffect } from 'react'; 
import Image from 'next/image';
import { useColor } from 'color-thief-react';
import { Book } from '@prisma/client';

export default function BookHeader({ book }: { book: Book }) {
  const [gradient, setGradient] = useState('');

  const { data: dominantColor } = useColor(book.coverImg || '', 'hex', {
    crossOrigin: 'anonymous',
    quality: 10,
  });

  // --- 2. Use useEffect to run code when 'dominantColor' changes ---
  // This code will run AFTER the component renders and whenever the
  // value of 'dominantColor' is updated by the useColor hook.
  useEffect(() => {
  if (dominantColor) {
    const newGradient = `linear-gradient(to bottom, ${dominantColor}80, transparent)`;
    setGradient(newGradient);
  }
}, [dominantColor]);

  
  return (
      <header className='flex flex-col justify-center items-center p-8 rounded-lg overflow-hidden transition-all duration-500' style={{ background: gradient }} >
        {book.coverImg && 
        <Image
           src={book.coverImg}
           alt={`cover image for book ${book.title}`}
           width={300}
           height={400}
           className='rounded-md object-cover drop-shadow-2xl'
           //for the coloring 
           crossOrigin="anonymous" 
        />}
        <h3 className=' p-2 text-xl font-semibold tracking-tight text-gray-900"'>
          {book.title}
        </h3>
        <p className='text-lg text-gray-600 mt-1'>{book.author}</p>
        <span className="mt-4 inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {book.status}
          </span>
      </header>
   
    
  );
}