"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { signIn, signOut } from "next-auth/react";

import { SESSION_STATES } from "@constants";

const RightNav = ({ providers, session, status }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <>
      {/* Desktop Navbar */}
      <div className="sm:flex hidden">
        {status === SESSION_STATES.authenticated ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/prompts/new" className="black_btn">
              Create post
            </Link>
            <button className="orange_btn" onClick={signOut}>
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src={session?.user.image}
                alt="User profile"
                width={37}
                height={37}
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map(provider => (
                <button
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="orange_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navbar */}
      <div className="sm:hidden flex relative">
        {status === SESSION_STATES.authenticated ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              alt="User profile"
              width={37}
              height={37}
              className="rounded-full"
              onClick={() => setIsDropdownOpen(prev => !prev)}
            />
            {isDropdownOpen && (
              <div className="dropdown">
                <Link
                  className="dropdown_link"
                  href="/profile"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  My Profile
                </Link>
                <Link
                  className="dropdown_link"
                  href="/prompts/new"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Create Prompt
                </Link>
                <button
                  className="mt-5 w-full black_btn"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    signOut();
                  }}
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map(provider => (
                <button
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </>
  );
};

export default RightNav;
