import SearchBar from "@/components/SearchBar";
import { getAllQuotes } from "@/libs/quotes";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";
export default async function AllQuotesDisplay({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string }>;
}
){

  const {userId} = await auth();
  if(!userId) {
    redirect('/sign-in')
  }

  const resolvedSearchParams = await searchParams;
  const searchTerm = resolvedSearchParams?.query;
  
  const quotes = await getAllQuotes(userId, searchTerm);
  

    return (
    <div className="bg-apricot min-h-screen">
      <div className="max-w-3xl mx-auto text-center py-16 sm:py-24 px-4">
        <h1 className="text-4xl sm:text-5xl font-kalnia tracking-tight text-gray-900">
          Collected Thoughts
        </h1>
        <p className="mt-4 max-w-xl mx-auto text-lg sm:text-xl text-gray-600 leading-relaxed">
          A searchable archive of the ideas and words that have resonated with you.
        </p>
        <div className="mt-8">
          <SearchBar placeholder="Search quotes, books, reflections..." />
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-4 pb-16">
        {quotes.length > 0 ? (
          <div className="space-y-6">
            {quotes.map((quote) => (
              <div key={quote.id} className="bg-white p-4 rounded-lg shadow-sm border">
                <blockquote className="italic text-gray-700 border-l-4 border-gray-300 pl-4">
                  "{quote.content}"
                </blockquote>
                {quote.reflection && (
                  <p className="mt-4 text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
                    <span className="font-semibold">My Reflection:</span> {quote.reflection}
                  </p>
                )}
                <div className="text-right mt-4">
                  <Link 
                    href={`/books/${quote.book.id}`} 
                    className="text-sm text-gray-500 hover:text-indigo-600"
                  >
                    From: <span className="font-semibold">{quote.book.title}</span> by {quote.book.author}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border-2 border-dashed rounded-lg bg-white/50">
            <p className="text-gray-500">
              {searchTerm 
                ? `No quotes found for "${searchTerm}".`
                : "You haven't saved any quotes yet."}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
