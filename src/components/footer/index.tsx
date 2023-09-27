import Link from "next/link";
import {
  RiInstagramLine,
  RiTwitterXLine,
  RiLinkedinFill,
} from "react-icons/ri";

export function Footer() {
  return (
    <footer className="bg-zinc-800 md:bg-transparent p-4 text-white rounded-tl-3xl rounded-tr-3xl">
      <div className="flex flex-col md:flex-row items-center justify-center md:justify-around gap-5">
        <p>
          &copy; {new Date().getFullYear()} Taskify. Todos os direitos
          reservados.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            href="https://www.instagram.com/guibus_dev/"
            target="_blank"
            className="hover:text-taskify"
          >
            <RiInstagramLine size={24} />
          </Link>
          <Link
            href="https://twitter.com/guibus_dev"
            target="_blank"
            className="hover:text-taskify"
          >
            <RiTwitterXLine size={24} />
          </Link>
          <Link
            href="https://www.linkedin.com/in/gui-bus/"
            target="_blank"
            className="hover:text-taskify"
          >
            <RiLinkedinFill size={24} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
