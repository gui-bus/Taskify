import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import hero from "../../public/assets/hero.png";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebaseConnection";

interface HomeProps {
  tasks: number;
  comments: number;
}

export default function Home({ tasks, comments }: HomeProps) {
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
            className="my-2 w-64 h-auto flex"
            src={hero}
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
              +{tasks} Tarefas
            </span>
            <span className="bg-white text-black px-3 py-2 rounded font-medium transition-all duration-300 ease-linear hover:bg-neutral-300">
              +{comments} Comentarios
            </span>
          </section>
        </div>
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const commentRef = collection(db, "comments");
  const tasksRef = collection(db, "taskify");

  const commentSnapshot = await getDocs(commentRef);
  const tasksSnapshot = await getDocs(tasksRef);

  return {
    props: {
      tasks: tasksSnapshot.size || 0,
      comments: commentSnapshot.size || 0,
    },
    revalidate: 60,
  };
};
