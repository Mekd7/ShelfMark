'use client';

import { CreateBook, FormState } from "@/app/actions/books";
import { useActionState, useState, useRef } from "react";
import Image from "next/image";

export default function AddBook() {
  const initialState: FormState = {
    errors: {},
  };
  
  const [state, formAction, isPending] = useActionState(CreateBook, initialState);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [hasSelectedImage, setHasSelectedImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setHasSelectedImage(true);
    }
  };

  return (
    <div className="flex flex-col md:h-screen overflow-y-auto">
      {/* ADDED: encType="multipart/form-data" for file uploads */}
      <form 
        action={formAction} 
        className="flex flex-col md:flex-row flex-1"
      >
        
        {/* --- Left Pane: Image Uploader --- */}
        <div className="bg-apricot p-8 flex flex-col items-center justify-center min-h-[50vh] md:min-h-0 md:flex-1">
          {imagePreview ? (
            <div className="w-full max-w-[250px] sm:max-w-sm aspect-[2/3] relative">
              <Image 
                src={imagePreview} 
                alt="Selected book cover preview"
                fill
                className="rounded-md shadow-lg object-cover"
              />
            </div>
          ) : (
            <h1 className="text-6xl md:text-8xl font-kalnia leading-tight">
              Your<br /> personal <br />literary<br /> treasury.
            </h1>
          )}

          <input 
            type="file" 
            name="coverImage" 
            ref={fileInputRef} 
            onChange={handleImageChange}
            className="hidden"
            accept="image/*"
            
          />
          
          <button 
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="bg-black text-white py-2 px-4 rounded-full flex gap-2 justify-center items-center mt-12 shadow-lg transition-transform duration-200 hover:scale-105 hover:bg-gray-800"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 17H13V13H17V11H13V7H11V11H7V13H11V17ZM12 22C10.6167 22 9.31667 21.7417 8.1 21.225C6.88333 20.6917 5.825 19.975 4.925 19.075C4.025 18.175 3.30833 17.1167 2.775 15.9C2.25833 14.6833 2 13.3833 2 12C2 10.6167 2.25833 9.31667 2.775 8.1C3.30833 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.31667 8.1 2.8C9.31667 2.26667 10.6167 2 12 2C13.3833 2 14.6833 2.26667 15.9 2.8C17.1167 3.31667 18.175 4.025 19.075 4.925C19.975 5.825 20.6833 6.88333 21.2 8.1C21.7333 9.31667 22 10.6167 22 12C22 13.3833 21.7333 14.6833 21.2 15.9C20.6833 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6917 15.9 21.225C14.6833 21.7417 13.3833 22 12 22ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20Z" fill="white"/>
            </svg>
            {imagePreview ? 'Change Cover' : 'Add Book Cover'}
          </button>

          {/* ADDED: Visual feedback about image selection */}
          {!hasSelectedImage && (
            <p className="text-sm text-gray-600 mt-2 text-center">
              (Optional: Add a book cover image)
            </p>
          )}
        </div>

        <div className="flex-1 bg-white p-8 sm:p-12 md:px-24 mt-24 flex flex-col justify-center">
          
          {/* Book Name */}
          <div>
            <label className="flex flex-col text-xl font-semibold mb-2">Book Name *</label>
            <input
              type="text"
              name="book name" // This should match exactly what server expects
              className="w-full bg-transparent border-b-2 border-black focus:outline-none focus:border-gray-500 text-base font-normal mt-2 pb-1"
              required
            />
            {state?.errors.bookName && <p className="text-red-500 text-sm mt-1">{state.errors.bookName}</p>}
          </div>

          {/* Author Name */}
          <div className="mt-10">
            <label className="flex flex-col text-xl font-semibold mb-2">Author Name *</label>
            <input
              type="text"
              name="author name" // This should match exactly what server expects
              className="w-full bg-transparent border-b-2 border-black focus:outline-none focus:border-gray-500 text-base font-normal mt-2 pb-1"
              required
            />
            {state?.errors.authorName && <p className="text-red-500 text-sm mt-1">{state.errors.authorName}</p>}
          </div>

          {/* Status Radio Buttons */}
          <div className="mt-10">
            <div className="flex flex-col">
              <label className="text-xl mb-4 font-semibold">Status *</label>
              <div className="flex flex-col gap-y-3 pl-8">
                <label className="flex items-center gap-x-3 text-[18px] cursor-pointer">
                  <input 
                    type="radio" 
                    name="book status" // This should match exactly what server expects
                    value="TO_READ" 
                    className="form-radio h-5 w-5 text-indigo-600 focus:ring-indigo-500"
                    required
                  />
                  To Read
                </label>
                <label className="flex items-center gap-x-3 text-[18px] cursor-pointer">
                  <input 
                    type="radio" 
                    name="book status" 
                    value="READING" 
                    className="form-radio h-5 w-5 text-indigo-600 focus:ring-indigo-500"
                  />
                  Reading
                </label>
                <label className="flex items-center gap-x-3 text-[18px] cursor-pointer">
                  <input 
                    type="radio" 
                    name="book status" 
                    value="FINISHED" 
                    className="form-radio h-5 w-5 text-indigo-600 focus:ring-indigo-500"
                  />
                  Finished
                </label>
              </div>
              {state?.errors.status && <p className="text-red-500 text-sm mt-2 pl-8">{state.errors.status}</p>}
            </div>
          </div>

          <div className="flex-grow"></div>

          {/* Submit Button */}
          <div className="flex justify-center mt-12">
            <button
              type="submit"
              aria-disabled={isPending}
              className="bg-black text-white py-2.5 px-6 rounded-full flex gap-2 justify-center items-center shadow-lg transition-transform duration-200 hover:scale-105 hover:bg-gray-800 disabled:bg-gray-400 disabled:scale-100"
              disabled={isPending}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 17H13V13H17V11H13V7H11V11H7V13H11V17ZM12 22C10.6167 22 9.31667 21.7417 8.1 21.225C6.88333 20.6917 5.825 19.975 4.925 19.075C4.025 18.175 3.30833 17.1167 2.775 15.9C2.25833 14.6833 2 13.3833 2 12C2 10.6167 2.25833 9.31667 2.775 8.1C3.30833 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.31667 8.1 2.8C9.31667 2.26667 10.6167 2 12 2C13.3833 2 14.6833 2.26667 15.9 2.8C17.1167 3.31667 18.175 4.025 19.075 4.925C19.975 5.825 20.6833 6.88333 21.2 8.1C21.7333 9.31667 22 10.6167 22 12C22 13.3833 21.7333 14.6833 21.2 15.9C20.6833 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6917 15.9 21.225C14.6833 21.7417 13.3833 22 12 22ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20Z" fill="white"/>
              </svg>
              {isPending ? "Adding..." : "Add To Shelf"}
            </button>
          </div>
          {state?.errors._form && <p className="text-red-500 text-sm mt-4 text-center">{state.errors._form}</p>}
        </div>
      </form>
    </div>
  );
}