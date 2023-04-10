import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "./button";
import { useRouter } from "next/router";
import Image from "next/image";
import { useState } from "react";

export const Header = () => {
  const session = useSession();
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="flex items-center justify-between p-4 text-gray-800 sm:items-baseline sm:px-8 sm:py-4">
      <Link href="/" className="text-2xl font-bold">
        Project<span className="text-purple-600 text-opacity-70">Pals</span>
      </Link>
      <div className="flex items-center gap-x-12 text-4xl font-bold sm:text-lg">
        <nav
          className={`fixed top-0 left-0 flex w-screen flex-col rounded-b-lg shadow-md sm:w-auto sm:flex-row sm:rounded-none sm:shadow-none  ${
            showMenu ? "" : "-translate-y-full"
          } z-10 items-center gap-x-4 bg-gray-50 transition-transform duration-300 sm:static sm:translate-y-0 sm:gap-x-6 sm:bg-transparent md:gap-x-12`}
        >
          <button
            className="mt-2 mr-2 self-end sm:hidden"
            onClick={() => setShowMenu(false)}
          >
            <Image
              src="/icons/cross.svg"
              width={40}
              height={40}
              alt="close icon"
            />
          </button>
          <Link
            href="/projects"
            className={` w-full py-4 text-center hover:text-purple-600 hover:text-opacity-70 sm:w-auto sm:py-0 ${
              router.pathname == "/projects"
                ? "text-purple-600 text-opacity-70"
                : ""
            }`}
          >
            Projects
          </Link>
          <Link
            href="/pals"
            className={` w-full py-4 text-center hover:text-purple-600 hover:text-opacity-70 sm:w-auto sm:py-0 ${
              router.pathname == "/pals"
                ? "text-purple-600 text-opacity-70"
                : ""
            }`}
          >
            Pals
          </Link>
          <Link
            href="/new-project"
            className={` w-full py-4 text-center hover:text-purple-600 hover:text-opacity-70 sm:w-auto sm:py-0 ${
              router.pathname == "/new-project"
                ? "text-purple-600 text-opacity-70"
                : ""
            }`}
          >
            New Project
          </Link>
          {session.data ? (
            <Link
              href="/account"
              className={`w-full py-4 text-center hover:text-purple-600 hover:text-opacity-70 sm:w-auto sm:py-0 ${
                router.pathname == "/account"
                  ? "text-purple-600 text-opacity-70"
                  : ""
              }`}
            >
              Account
            </Link>
          ) : (
            <Link
              href="/account"
              className="w-full py-4 font-normal sm:w-auto sm:py-0"
            >
              <Button content="Login" className="hidden sm:block"></Button>
              <span className="block text-center font-bold sm:hidden">
                Login
              </span>
            </Link>
          )}
        </nav>
        <button className="block sm:hidden" onClick={() => setShowMenu(true)}>
          <Image src="/icons/menu.svg" width={28} height={28} alt="menu icon" />
        </button>
      </div>
    </div>
  );
};
