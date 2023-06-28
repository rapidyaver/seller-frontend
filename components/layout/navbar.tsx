"use client";

import Image from "next/image";
import Link from "next/link";
import useScroll from "@/lib/hooks/use-scroll";
import { useSignInModal } from "./sign-in-modal";
import UserDropdown from "./user-dropdown";
import { Session } from "next-auth";
import { ExternalLink } from "lucide-react";
import { usePathname } from 'next/navigation';


export default function NavBar({ session }: { session: Session | null }) {
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const scrolled = useScroll(50);
  const location = usePathname();

  return (
    <>
      <SignInModal />
      <div
        className={`fixed top-0 w-full ${
          scrolled
            ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl"
            : "bg-white/0"
        } z-30 transition-all`}
      >
        <div className="mx-5 flex h-m h-16 max-w-screen-xl items-center justify-between xl:mx-auto">
          <Link href="/" className="flex h-10 items-center font-display text-md md:text-2xl">
            <Image
              src="/logo.png"
              alt="Precedent logo"
              width="30"
              height="30"
              className="mr-2 rounded-sm"
            ></Image>
            <p>PromoHunter</p>
          </Link>
          {
            location != '/business' && 
            <Link href="/business" className="flex h-10 items-center gap-x-0.5 ml-auto px-2 text-black text-sm md:text-xl" >
              <p>For Business</p>
              <ExternalLink className="pt-1 pb-1"></ExternalLink>
            </Link>
          }
          {
            location === '/business' && <Link href="/" className="flex h-10 items-center gap-x-0.5 ml-auto px-2 text-black text-sm md:text-xl" >
            <p>For Individuals</p>
            <ExternalLink className="pt-1 pb-1"></ExternalLink>
          </Link>
          }
          <div>
            {session ? (
              <UserDropdown session={session} />
            ) : (
              <button
                className="rounded-full h-10 border border-black bg-black px-2 text-sm text-white transition-all hover:bg-white hover:text-black"
                onClick={() => setShowSignInModal(true)}
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
