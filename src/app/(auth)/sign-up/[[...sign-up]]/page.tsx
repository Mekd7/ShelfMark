"use client";

import { SignUp } from "@clerk/nextjs";

export default function signUp(){
    return (
        <div className="bg-apricot flex justify-center items-center py-24">
            <SignUp/>

        </div>
    )
}
