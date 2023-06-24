"use client"

import { useSignInModal } from "@/components/layout/sign-in-modal";

export default function SignInButton() {

    const { SignInModal, setShowSignInModal } = useSignInModal();

    return (
        <>
            <button
                className="rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black"
                onClick={() => setShowSignInModal(true)}>
                Sign In
            </button>
        </>
    
    );
}