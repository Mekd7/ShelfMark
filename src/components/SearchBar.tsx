"use client";
import {useSearchParams, usePathname,useRouter } from "next/navigation";
import { useDebouncedCallback } from 'use-debounce';


export default function SearchBar({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if(term){
      params.set('query', term);
    }else{
      params.delete('query');
    }

    router.replace(`${pathname}?${params.toString()}`);
  }, 300);




  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg
          width="24"
          height="24"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-gray-400"
        >
          <path
            d="M42 42L33.3 33.3M38 22C38 30.8366 30.8366 38 22 38C13.1634 38 6 30.8366 6 22C6 13.1634 13.1634 6 22 6C30.8366 6 38 13.1634 38 22Z"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <input
        type="search"
        placeholder={placeholder}
        onChange={(e) => {handleSearch(e.target.value);} }
        defaultValue={searchParams.get('query')?.toString() || ''}
        className="
          w-full border border-gray-300 rounded-full
          py-3 pl-12 pr-4
          text-lg placeholder:text-gray-400
          
        "
      />
    </div>
  );
}
