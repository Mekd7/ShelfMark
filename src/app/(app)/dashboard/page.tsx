import SearchBar from "@/components/SearchBar";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { syncUser } from "@/libs/user";
import { getBooks } from "@/libs/book"; 
import BookShelf from "./bookShelf";

export default async function Dashboard({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string }>;
}) {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    redirect("/sign-in");
  }

  await syncUser(userId, user.emailAddresses[0]?.emailAddress || null);
  
  const resolvedSearchParams = await searchParams;
  const searchTerm = resolvedSearchParams?.query;

  const booksResult = await getBooks(userId, searchTerm);

  if (!booksResult) {
    
    return (
      <main className="bg-apricot min-h-screen p-8 md:p-12 lg:p-16">
        <div className="text-center py-12">
          <h2 className="text-xl text-gray-600">Failed to load books</h2>
        </div>
      </main>
    );
  }
  
  return (
    <main className="bg-apricot min-h-screen p-8 md:p-12 lg:p-16">
      
      
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">
          My Books
        </h1>
        
        {/* The "Your Quotes" button, implemented as a Link */}
        <Link 
          href="/quotes"
          className="
            bg-black text-white font-semibold 
            py-2 px-5 rounded-full 
            hover:bg-gray-800 
            transition-colors duration-200 
            shadow-sm
          "
        >
          Your Quotes
        </Link>
      </div>

      
      <div className="p-2 bg-white border border-gray-300 rounded-full mb-8">
        <div className="w-full">
          <SearchBar placeholder="Search your shelf by title or author..." />
        </div>
      </div>

      <BookShelf books={booksResult} />
    </main>
  );
}