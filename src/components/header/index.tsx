import { useState } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import logo from "../../../public/assets/logo.png";
import { CgSpinner } from "react-icons/cg";
import { MdPublic } from "react-icons/md";
import { TbListCheck, TbLogin2, TbLogout2, TbMenu2 } from "react-icons/tb";

export function Header() {
  const { data: session, status } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="w-full max-w-[48.75] h-20 md:h-20 flex items-center justify-around mx-auto px-8 md:px-2 py-2 relative bg-neutral-800  md:bg-transparent mb-5 select-none">
      <div className="flex items-center">
        <Link href="/">
          <Image src={logo} alt="Taskify" priority className="w-36 h-auto" />
        </Link>
      </div>

      <div className="md:flex items-center space-x-2 hidden">
        {!session?.user && (
          <div className="flex items-center justify-center gap-2">
            <Link
              href="/public"
              className="text-white flex items-center justify-center gap-2 font-medium px-3 py-2 rounded-full transition-all duration-300 ease-linear hover:bg-neutral-300/10 text-sm"
            >
              Tarefas Publicas <MdPublic size={24} />
            </Link>
          </div>
        )}
        {session?.user && (
          <div className="flex items-center justify-center gap-2">
            <Link
              href="/public"
              className="text-white flex items-center justify-center gap-2 font-medium px-3 py-2 rounded-full transition-all duration-300 ease-linear hover:bg-neutral-300/10 text-sm"
            >
              Tarefas <MdPublic size={24} />
            </Link>

            <Link
              href="/dashboard"
              className="text-white flex items-center justify-center gap-2 font-medium px-3 py-2 rounded-full transition-all duration-300 ease-linear hover:bg-neutral-300/10 text-sm"
            >
              Dashboard <TbListCheck size={24} />
            </Link>
          </div>
        )}

        {status === "loading" ? (
          <div className="animate-spin text-white">
            <CgSpinner size={24} />
          </div>
        ) : session ? (
          <button
            className="text-white flex items-center justify-center gap-2 font-medium px-3 py-2 rounded-full transition-all duration-300 ease-linear hover:bg-neutral-300/10 text-sm"
            onClick={() => signOut()}
          >
            Logout <TbLogout2 size={24} />
          </button>
        ) : (
          <button
            className="text-white flex items-center justify-center gap-2 font-medium px-3 py-2 rounded-full transition-all duration-300 ease-linear hover:bg-neutral-300/10 text-sm"
            onClick={() => signIn()}
          >
            Login <TbLogin2 size={24} />
          </button>
        )}
      </div>

      {/* Mobile menu button or Login button */}
      <div className="md:hidden flex items-center justify-center gap-2">
        <button
          className="text-white flex items-center justify-center gap-2 font-medium px-3 py-2 rounded-full transition-all duration-300 ease-linear hover:bg-neutral-300/10 text-sm"
          onClick={toggleMobileMenu}
        >
          <TbMenu2 size={28} />
        </button>
        {session && (
          <button
            className="text-white flex items-center justify-center gap-2 font-medium px-3 py-2 rounded-full transition-all duration-300 ease-linear hover:bg-neutral-300/10 text-sm"
            onClick={() => signOut()}
          >
            <TbLogout2 size={28} />
          </button>
        )}
        {!session && (
          <button
            className="text-white flex items-center justify-center gap-2 font-medium px-3 py-2 rounded-full transition-all duration-300 ease-linear hover:bg-neutral-300/10 text-sm"
            onClick={() => signIn()}
          >
            <TbLogin2 size={28} />
          </button>
        )}
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-[4.9rem] left-0 w-full bg-neutral-800 py-2 rounded-b-3xl">
          <div className="flex items-center justify-center gap-2">
            <Link
              href="/public"
              className="text-white flex items-center justify-center gap-2 font-medium px-3 py-2 rounded-full transition-all duration-300 ease-linear hover:bg-neutral-300/10 text-sm"
              onClick={toggleMobileMenu}
            >
              Tarefas <MdPublic size={24} />
            </Link>

            {session?.user && (
              <div className="flex items-center justify-center gap-2">
                <Link
                  href="/dashboard"
                  className="text-white flex items-center justify-center gap-2 font-medium px-3 py-2 rounded-full transition-all duration-300 ease-linear hover:bg-neutral-300/10 text-sm"
                  onClick={toggleMobileMenu}
                >
                  Dashboard <TbListCheck size={24} />
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
