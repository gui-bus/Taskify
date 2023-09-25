import Image from "next/image";
import logo from "../../../public/assets/logo.png";
import Link from "next/link";

import { FiLogIn } from "react-icons/fi";

export function Header() {
  return (
    <header className="w-full h-20 flex items-center justify-center px-5 py-2 bg-transparent">
      <section className="px-2 w-full max-w-2xl flex items-center justify-between">
        <nav className="flex items-center justify-center gap-2 text-sm">
          <Link href="/">
            <Image src={logo} alt="Taskify" priority className="w-36 h-auto" />
          </Link>
          <Link href="/dashboard" className="text-white flex items-center justify-center gap-2 font-medium px-3 py-2 rounded-full transition-all duration-300 ease-linear hover:bg-neutral-300/10">
            Dashboard
          </Link>
        </nav>

        <button className="text-white flex items-center justify-center gap-2 font-medium px-3 py-2 rounded-full transition-all duration-300 ease-linear hover:bg-neutral-300/10 text-sm">
          Login <FiLogIn size={24} />
        </button>
      </section>
    </header>
  );
}
