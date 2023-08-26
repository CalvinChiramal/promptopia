"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import useAuth from "@hooks/useAuth";
import { SESSION_STATES } from "@constants";

import RightNav from "./RightNav";

const Nav = () => {
  const pathname = usePathname();
  const { status, session, providers } = useAuth({});

  const isEditOrCreatePath = pathname.startsWith("/prompts/");
  const isRightNavHidden =
    isEditOrCreatePath && status === SESSION_STATES.unauthenticated;

  if (status === SESSION_STATES.loading) return <></>;

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Promptopia logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      {!isRightNavHidden && (
        <RightNav providers={providers} session={session} status={status} />
      )}
    </nav>
  );
};

export default Nav;
