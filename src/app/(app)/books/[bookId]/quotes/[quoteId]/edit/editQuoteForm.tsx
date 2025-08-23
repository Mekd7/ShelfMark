"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FormStateForQuotes, editQuoteAction } from "@/app/actions/quotes";
import { Quote } from "@prisma/client";

export default function EditQuoteForm({ quote }: { quote: Quote }) {
  
  const initialState: FormStateForQuotes = {
    errors: {},
    success: false,
  };

  const editQuoteWithIds = editQuoteAction.bind(null, quote.id, quote.bookId);
  const [state, formAction, isPending] = useActionState(editQuoteWithIds, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      router.back();
    }
  }, [state, router]);

  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-6 md:p-8">
      <form action={formAction}>
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Edit Quote
          </h2>

          <div>
            <label htmlFor="quote-content" className="block text-lg font-semibold text-gray-800 mb-2">
              Quote
            </label>
            <textarea
              id="quote-content"
              name="content"
              defaultValue={quote.content}
              // Use rows to suggest a starting height
              rows={6}
              // --- THIS IS THE CORRECTED STYLING ---
              className="
                w-full p-4 bg-white text-gray-900 placeholder:text-gray-400
                border border-gray-300 rounded-md shadow-sm
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                transition duration-200
              "
            />
            {state.errors.content && <p className="text-red-500">{state.errors.content}</p>}
          </div>

          <div>
            <label htmlFor="quote-reflection" className="block text-lg font-semibold text-gray-800 mb-2">
              Your Reflection (Optional)
            </label>
            <textarea
              id="quote-reflection"
              name="reflection"
              defaultValue={quote.reflection ?? ''}
              rows={4}
              className="
                w-full p-4 bg-white text-gray-900 placeholder:text-gray-400
                border border-gray-300 rounded-md shadow-sm
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                transition duration-200
              "
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isPending}
              className="
                w-full bg-black text-white font-bold py-3 px-4 rounded-md
                hover:bg-gray-800
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black
                transition-colors duration-200
                disabled:bg-gray-400 disabled:cursor-not-allowed
              "
            >
              {isPending ? "Saving..." : "Save Changes"}
            </button>
          </div>
          
         
        </div>
      </form>
    </div>
  );
}