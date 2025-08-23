"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FormStateForQuotes } from "@/app/actions/quotes";
import { addQuoteAction } from "@/app/actions/quotes";



export default function AddQuoteForm({bookId} : {bookId : string}){
  
  const initialState: FormStateForQuotes = {
    errors: {}
  }

  const addQuoteActionWithBookId = addQuoteAction.bind(null, bookId)

  const [state, formAction, isPending] = useActionState(addQuoteActionWithBookId, initialState);
  const router = useRouter();

  useEffect(()=>{
    if(state.success){
      router.back()
    }
  }, [state,router]);

  return (
    
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-6 md:p-8">
      <form action={formAction}>
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Add a New Quote
          </h2>

          {/* Section for the Quote */}
          <div>
            <label 
              htmlFor="quote-content" 
              className="block text-lg font-semibold text-gray-800 mb-2"
            >
              Quote
            </label>
            <textarea
              id="quote-content"
              name="content" 
              placeholder="The words that moved you..."
              rows={6} 
              className="
                w-full p-4 bg-white text-gray-900 placeholder:text-gray-400
                border border-gray-300 rounded-md shadow-sm
                focus:outline-none focus:ring-2 
                transition duration-200
              "
            />
            {state.errors.content && <p className="text-red-500">{state.errors.content}</p>}
          </div>

          {/* Section for the Reflection */}
          <div>
            <label 
              htmlFor="quote-reflection" 
              className="block text-lg font-semibold text-gray-800 mb-2"
            >
              Your Reflection (Optional)
            </label>
            <textarea
              id="quote-reflection"
              name="reflection" 
              placeholder="Your thoughts on this quote..."
              rows={4}
              className="
                w-full p-4 bg-white text-gray-900 placeholder:text-gray-400
                border border-gray-300 rounded-md shadow-sm
                focus:outline-none focus:ring-2 
                transition duration-200
              "
            />
          </div>

          {/**Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="
                w-full bg-black text-white font-bold py-3 px-4 rounded-md
                hover:bg-gray-800
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black
                transition-colors duration-200
                disabled:bg-gray-400
              "
              
            >
              {isPending? ("saving...") : ("save")}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}