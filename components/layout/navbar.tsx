"use client";

import Image from "next/image";
import Link from "next/link";
import useScroll from "@/lib/hooks/use-scroll";
import { Session } from "next-auth";
import classnames from 'classnames'
import { useSignInModal } from "./sign-in-modal";
import UserDropdown from "./user-dropdown";
import { useZustand } from "@/lib/store/use-zustand";
import { menus, withoutSign } from "@/lib/constants";
import { useEffect } from "react";

export default function NavBar({ session }: { session: Session | null }) {
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const scrolled = useScroll(50);
  const { selMenu, setSelMenu } = useZustand()

  useEffect(() => {
    console.log('NavBar#useEffect: session: ', session)
  }, [session])

  return (
    <>
      <SignInModal />
      <div
        className={`fixed top-0 w-full flex justify-center ${scrolled
          ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl"
          : "bg-white/0"
          } z-30 transition-all`}
      >
        <div className="flex items-center justify-between w-full h-16 max-w-screen-xl mx-5">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center text-2xl font-display">
              <Image
                src="/logo.png"
                alt="Precedent logo"
                width="30"
                height="30"
                className="mr-2 rounded-sm"
              ></Image>
              <p>Precedent</p>
            </Link>
            {(session || withoutSign) && Object.keys(menus).map((menuKey) =>
              <div
                key={menuKey}
                className={classnames({
                  "text-xl cursor-pointer hover:text-gray-500": true,
                  "text-gray-500": selMenu === menuKey,
                })}
                onClick={() => {
                  setSelMenu(menuKey)
                }}
              >
                {menus[menuKey]}
              </div>
            )}
          </div>
          <div>
            {session ? (
              <UserDropdown session={session} />
            ) : (
              <button
                className="rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black"
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
