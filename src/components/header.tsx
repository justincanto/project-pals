import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "./button";
import { useRouter } from "next/router";
import Image from "next/image";

export const Header = () => {
  const session = useSession();
  const router = useRouter();
  return (
    <div className="flex items-baseline justify-between p-4 text-gray-800 sm:px-8 sm:py-4">
      <Link href="/" className="text-xl font-bold sm:text-2xl">
        Project<span className="text-purple-600 text-opacity-70">Pals</span>
      </Link>
      <div className="flex items-center gap-x-12 text-lg font-bold">
        <nav className="flex items-center gap-x-4 sm:gap-x-6 md:gap-x-12">
          <Link
            href="/projects"
            className={`hidden hover:text-purple-600 hover:text-opacity-70 sm:block ${
              router.pathname == "/projects"
                ? "text-purple-600 text-opacity-70"
                : ""
            }`}
          >
            Projects
          </Link>
          <Link
            href="/pals"
            className={`hidden hover:text-purple-600 hover:text-opacity-70 sm:block ${
              router.pathname == "/pals"
                ? "text-purple-600 text-opacity-70"
                : ""
            }`}
          >
            Pals
          </Link>
          <Link
            href="/new-project"
            className={`hidden hover:text-purple-600 hover:text-opacity-70 sm:block ${
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
              className={`hover:text-purple-600 hover:text-opacity-70 ${
                router.pathname == "/account"
                  ? "text-purple-600 text-opacity-70"
                  : ""
              }`}
            >
              Account
            </Link>
          ) : (
            <Link href="/account" className="font-normal">
              <Button content="Login" className="hidden sm:block"></Button>
              <span className="flex text-base font-bold sm:hidden">Login</span>
            </Link>
          )}
          <button className="block sm:hidden">
            <Image
              src="/icons/menu.svg"
              width={24}
              height={24}
              alt="menu icon"
            />
          </button>
        </nav>
      </div>
    </div>
  );
};
