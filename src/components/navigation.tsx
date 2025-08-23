"use client";

import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Navigation(){
    return (
        <div className="mb-16">
         <nav className="bg-peach/70 backdrop-blur-xl fixed top-0 w-full z-10 rounded-lg shadow-lg border-b border-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex justify-between h-16 items-center">
                    <div className="flex-shrink-0">
                        <Link href={'/'} className="text-xl  font-kalnia  text-[var(--foreground)]">
                            ShelfMark
                        </Link>
                    </div>

                    <div className="flex items-center gap-16 ">

                        <div className="bg-white border rounded-[16px] p-2 shadow-md">
                            <SignOutButton>
                                SignOut
                            </SignOutButton>
                        </div>

                        <Link href={'/user-profile'} >
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="40" height="40" rx="20" fill="white"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M26.0002 16C26.0002 19.3137 23.314 22 20.0002 22C16.6865 22 14.0002 19.3137 14.0002 16C14.0002 12.6863 16.6865 10 20.0002 10C23.314 10 26.0002 12.6863 26.0002 16ZM24.0002 16C24.0002 18.2091 22.2094 20 20.0002 20C17.7911 20 16.0002 18.2091 16.0002 16C16.0002 13.7909 17.7911 12 20.0002 12C22.2094 12 24.0002 13.7909 24.0002 16Z" fill="black"/>
                            <path d="M20.0002 25C13.5259 25 8.00952 28.8284 5.9082 34.192C6.4201 34.7004 6.95934 35.1812 7.52353 35.6321C9.08827 30.7077 13.997 27 20.0002 27C26.0035 27 30.9122 30.7077 32.477 35.6321C33.0412 35.1812 33.5804 34.7004 34.0923 34.1921C31.991 28.8284 26.4746 25 20.0002 25Z" fill="black"/>
                        </svg>

                        </Link>

                        
                    </div>
                </div>
            </div>
        </nav>
    
        </div>
    )
}