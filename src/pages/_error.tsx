import Link from "next/link";
import Image from "next/image";
import logo from "../../public/assets/logo.png";

const CustomErrorPage = () => {
  return (
    <div className="flex w-full h-screen justify-center items-center flex-col text-white">
      <Link href="/">
        <Image
          className="w-72 md:w-96 h-auto"
          src={logo}
          alt="Taskify"
          priority
        />
      </Link>
      <div className="my-4 text-center px-4">
        <h1 className="font-bold text-2xl">Oops! Página não encontrada</h1>
        <p className="mt-2">A página que você está procurando não existe.</p>
      </div>

      <Link
        href="/"
        className="flex items-center text-black justify-center gap-2 h-9 bg-taskify rounded-md border-0 font-medium w-11/12 max-w-lg px-4 py-2 my-4 transition-all duration-300 ease-in-out hover:bg-taskifyHover"
      >
        Voltar para a página inicial
      </Link>
    </div>
  );
};

export default CustomErrorPage;
