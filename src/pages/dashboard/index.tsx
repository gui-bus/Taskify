import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import Head from "next/head";

import { ChangeEvent, useState } from "react";

import { Textarea } from "../../components/textarea";

import { BiTask, BiTaskX } from "react-icons/bi";
import { PiShareFatFill, PiTrash } from "react-icons/pi";

export default function Dashboard() {
  const [input, setInput] = useState("");
  const [publicTast, setPublicTast] = useState(false);

  function handleChangePublic(event: ChangeEvent<HTMLInputElement>) {
    setPublicTast(event.target.checked);
  }

  return (
    <div className="w-full mx-auto flex items-center justify-center p-5">
      <Head>
        <title>Taskify | Dashboard</title>
        <link rel="shortcut icon" href="favicon.png" type="image/x-icon" />
      </Head>

      <main className="w-full select-none">
        {/* Form */}
        <section className="w-full flex items-center justify-center">
          <div className="max-w-4xl w-full">
            <div className="text-white mb-5 text-center">
              <h1 className="text-2xl flex items-center justify-center gap-2">
                Nova tarefa <BiTask size={24} />
              </h1>
              <p className="my-3 text-sm">
                Registre suas tarefas diárias e mantenha-se organizado.
              </p>
            </div>
            <div className="border-b border-white/30 mt-2"></div>
            <form>
              <Textarea
                placeholder="Insira os detalhes da sua tarefa aqui"
                value={input}
                onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                  setInput(event.target.value)
                }
              />
              <div className="flex flex-col items-center justify-center text-white">
                <div className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    id="checkbox"
                    className="w-4 h-4 appearance-none border border-white rounded-full checked:bg-taskify checked:border-taskifyHover"
                    checked={publicTast}
                    onChange={handleChangePublic}
                  />
                  <label htmlFor="checkbox">Tornar tarefa pública</label>
                </div>

                <button
                  type="submit"
                  className="border text-taskify border-taskify px-4 py-2 rounded-br-xl rounded-tl-xl font-medium transition-all duration-300 ease-linear hover:bg-taskify hover:text-black hover:border-taskifyHover my-4"
                >
                  Registrar
                </button>
                <div className="border-b border-white/30 mt-2 mb-4 w-full"></div>
              </div>
            </form>
          </div>
        </section>

        {/* Active tasks */}
        <section className="w-full flex items-center justify-center">
          <div className="max-w-6xl w-full">
            <div className="text-white mb-5 text-center">
              <h1 className="text-2xl flex items-center justify-center gap-2">
                Tarefas em andamento <BiTaskX size={24} />
              </h1>
              <p className="my-3 text-sm">
                Veja a lista das tarefas que você já registrou e está realizando
                agora.
              </p>
            </div>

            <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
              <article className="mb-3 border p-4 rounded-md flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center justify-center gap-2">
                    <span className="bg-taskify rounded-br-xl rounded-tl-xl text-xxs px-4 py-1 font-semibold">
                      PUBLICA
                    </span>
                    <button className="text-white transition-all hover:text-taskify">
                      <PiShareFatFill size={24} />
                    </button>
                  </div>
                  <button className="text-white transition-all hover:text-red-500">
                    <PiTrash size={24} />
                  </button>
                </div>
                <div className="border-b border-white/30 mt-2 mb-4 w-full"></div>

                <div className="flex items-center justify-between w-full">
                  <p className="text-white whitespace-pre-wrap text-justify">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Eaque ratione possimus tempore at nobis hic obcaecati
                    reiciendis eius cupiditate quibusdam minus sunt illo
                    delectus necessitatibus aut eum, voluptatibus magni,
                    suscipit animi! Quas nostrum quos adipisci dolor repellat
                    sunt ducimus maxime.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session?.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
