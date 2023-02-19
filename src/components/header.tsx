import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "./button";
import { useRouter } from "next/router";

export const Header = () => {
  const session = useSession();
  const router = useRouter();
  return (
    <div className="flex items-center justify-between px-8 py-4 text-gray-800">
      <Link href="/" className="text-2xl font-bold">
        Project<span className="text-purple-600 text-opacity-70">Pals</span>
      </Link>
      <div className="flex items-center gap-12 text-lg font-bold">
        <nav className="flex items-center gap-x-12">
          <Link
            href="/projects"
            className={`hover:text-purple-600 hover:text-opacity-70 ${
              router.pathname == "/projects"
                ? "text-purple-600 text-opacity-70"
                : ""
            }`}
          >
            Projects
          </Link>
          <Link
            href="/pals"
            className={`hover:text-purple-600 hover:text-opacity-70 ${
              router.pathname == "/pals"
                ? "text-purple-600 text-opacity-70"
                : ""
            }`}
          >
            Pals
          </Link>
          <Link
            href="/new-project"
            className={`hover:text-purple-600 hover:text-opacity-70 ${
              router.pathname == "/create-project"
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
                router.pathname == "/create-project"
                  ? "text-purple-600 text-opacity-70"
                  : ""
              }`}
            >
              Account
            </Link>
          ) : (
            <Link href="/login" className="font-normal">
              <Button content="Login"></Button>
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
};
