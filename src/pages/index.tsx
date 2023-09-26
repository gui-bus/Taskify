import Head from "next/head";
import Image from "next/image";
import heroGif from "../../public/assets/tasksHero.gif";

export default function Home() {
  return (
    <div className="w-full max-w-7xl mx-auto flex items-center justify-center p-5">
      <Head>
        <title>Taskify | Organize suas tarefas de forma eficiente</title>
        <meta name="description" content="To-do list" />
        <link rel="shortcut icon" href="favicon.png" type="image/x-icon" />
      </Head>

      <main className="flex flex-col items-center justify-center select-none mt-10 text-center">
        <div className="flex flex-col items-center justify-center">
          <Image
            className="my-2 w-72 md:w-96 h-auto flex"
            src={heroGif}
            alt="Tasks"
            priority
          />
          <div className="text-white my-2 w-full flex flex-col items-center justify-center">
            <h1 className="text-2xl font-semibold mt-5">
              Aumente sua produtividade
            </h1>
            <p className="text-center">
              Gerencie tarefas e estudos de forma simples e eficiente!
            </p>
          </div>
        </div>

        <div className="my-5 w-full">
          <section className="flex items-center justify-center gap-3">
            <span className="bg-white text-black px-3 py-2 rounded font-medium transition-all duration-300 ease-linear hover:bg-neutral-300">
              +1000 Tarefas
            </span>
            <span className="bg-white text-black px-3 py-2 rounded font-medium transition-all duration-300 ease-linear hover:bg-neutral-300">
              +2000 Comentarios
            </span>
          </section>
        </div>
      </main>
    </div>
  );
}
