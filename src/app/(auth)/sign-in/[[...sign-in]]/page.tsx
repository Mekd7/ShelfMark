"use client";

import { SignIn } from "@clerk/nextjs";

export default function signIn(){
    return (
        <div className="bg-apricot flex justify-center items-center py-24">
            <SignIn/>

        </div>
    )
}
