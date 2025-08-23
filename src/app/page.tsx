// This page is now a Server Component (removed "use client";)
import Link from "next/link";

export default function LandingPage() {
  return (
    
    <main className="bg-apricot min-h-screen flex flex-col">
      
      <nav className="flex items-center justify-between pt-8 px-8 sm:px-16 w-full">
        <div className="text-xl  font-kalnia ">SHELFMARK</div>
        <div className="flex items-center gap-x-8">
          <Link href={'/sign-in'} className="hover:text-gray-700 transition-colors">SignIn</Link>
          <Link href={'/sign-up'} className="hover:text-gray-700 transition-colors">SignUp</Link>
          
          
        </div>
      </nav>

      
      <div className="py-24 md:pt-[24rem] md:pb-16 flex-grow flex flex-col md:flex-row items-center justify-center gap-x-16 px-8 text-center md:text-left">
        
        {/* Left Side: The Main Heading */}
        <div>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-kalnia  tracking-tighter">
            Don't Just <br/> Read, Remember
          </h1>
        </div>
        
        {/* Right Side: The Subtitle */}
        <p className="mt-8 md:mt-[9rem] text-lg text-gray-700 leading-relaxed"> 
          The simple, beautiful way to <br/> capture the quotes and ideas <br/> you never want to forget.
        </p>
        
      </div>
    </main>
  );
}