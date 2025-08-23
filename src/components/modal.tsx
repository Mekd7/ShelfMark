"use client";

import { useRouter } from "next/navigation";

export default function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleClose = () => {
    router.back(); 
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center bg-apricot">
      <div className="bg-apricot p-8 rounded-lg shadow-xl w-full max-w-2xl relative">
        <button onClick={handleClose} className="absolute top-2 right-2 text-2xl font-bold">&times;</button>
        {children}
      </div>
    </div>
  );
}