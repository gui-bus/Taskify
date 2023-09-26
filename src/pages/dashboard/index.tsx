import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import Head from "next/head";

import { ChangeEvent, FormEvent, useState, useEffect } from "react";

import { Textarea } from "../../components/textarea";

import { BiTask, BiTaskX, BiLinkExternal } from "react-icons/bi";
import { PiShareFatFill, PiTrash } from "react-icons/pi";
import { MdPublic, MdPublicOff } from "react-icons/md";

import { db } from "../../services/firebaseConnection";
import {
  addDoc,
  collection,
  query,
  orderBy,
  where,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";
import toast from "react-hot-toast";

import Link from "next/link";

interface HomeProps {
  user: {
    email: string;
  };
}

interface TaskProps {
  id: string;
  created: Date;
  public: boolean;
  task: string;
  user: string;
}

export default function Dashboard({ user }: HomeProps) {
  const [input, setInput] = useState("");
  const [publicTask, setPublicTask] = useState(false);
  const [tasks, setTasks] = useState<TaskProps[]>([]);

  useEffect(() => {
    async function loadTasks() {
      const tasksRef = collection(db, "taskify");
      const queryRef = query(
        tasksRef,
        orderBy("created", "desc"),
        where("user", "==", user?.email)
      );

      onSnapshot(queryRef, (snapshot) => {
        const list = [] as TaskProps[];

        snapshot.forEach((doc) => {
          list.push({
            id: doc.id,
            task: doc.data().task,
            created: doc.data().created,
            user: doc.data().user,
            public: doc.data().public,
          });
        });

        setTasks(list);
      });
    }

    loadTasks();
  }, [user?.email]);

  function handleChangePublic(event: ChangeEvent<HTMLInputElement>) {
    setPublicTask(event.target.checked);
  }

  async function handleRegisterTask(event: FormEvent) {
    event.preventDefault();

    if (input === "") return;
    try {
      await addDoc(collection(db, "taskify"), {
        task: input,
        created: new Date(),
        user: user?.email,
        public: publicTask,
      });
      setInput("");
      setPublicTask(false);
      toast.success("Tarefa registrada com sucesso!", {
        style: { fontSize: "0.8rem" },
      });
    } catch (err) {
      toast.error("Erro ao registrar tarefa!", {
        style: { fontSize: "0.8rem" },
      });
    }
  }

  async function handleDeleteTask(id: string) {
    const docRef = doc(db, "taskify", id);
    await deleteDoc(docRef);
    toast.success("Tarefa removida!", {
      style: { fontSize: "0.8rem" },
    });
  }

  return (
    <div className="w-full mx-auto flex items-center justify-center p-5">
      <Head>
        <title>Taskify | Dashboard</title>
        <link rel="shortcut icon" href="favicon.png" type="image/x-icon" />
      </Head>

      <main className="w-full">
        {/* Form */}
        <section className="w-full flex items-center justify-center">
          <div className="max-w-4xl w-full">
            <div className="text-white mb-5 text-center select-none">
              <h1 className="text-2xl flex items-center justify-center gap-2">
                Nova tarefa <BiTask size={24} />
              </h1>
              <p className="my-3 text-sm">
                Registre suas tarefas diárias e mantenha-se organizado.
              </p>
            </div>
            <div className="border-b border-white/30 mt-2"></div>
            <form onSubmit={handleRegisterTask}>
              <Textarea
                placeholder="Insira os detalhes da sua tarefa aqui"
                value={input}
                onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                  setInput(event.target.value)
                }
              />
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    id="checkbox"
                    className="w-4 h-4 appearance-none border border-white rounded-full checked:bg-taskify checked:border-taskifyHover"
                    checked={publicTask}
                    onChange={handleChangePublic}
                  />
                  <label
                    htmlFor="checkbox"
                    className="flex items-center justify-center gap-2 select-none"
                  >
                    Tornar tarefa pública <MdPublic size={16} />
                  </label>
                </div>

                <button
                  type="submit"
                  className="border text-taskify border-taskify px-4 py-2 rounded-br-xl rounded-tl-xl font-medium transition-all duration-300 ease-linear hover:bg-taskify hover:text-black hover:border-taskifyHover my-4 select-none"
                >
                  Registrar
                </button>
              </div>
            </form>
            <div className="border-b border-white/30 mt-2 mb-4 w-full"></div>
          </div>
        </section>

        {/* Active tasks */}
        {tasks.some((item) => item.id !== "") && (
          <section className="w-full flex items-center justify-center">
            <div className="max-w-6xl w-full">
              <div className="text-white mb-5 text-center select-none">
                <h1 className="text-2xl flex items-center justify-center gap-2">
                  Tarefas em andamento <BiTaskX size={24} />
                </h1>
                <p className="my-3 text-sm">
                  Veja a lista das tarefas que você já registrou e está
                  realizando agora.
                </p>
              </div>

              <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
                {tasks.map((item) => (
                  <article
                    key={item.id}
                    className="mb-3 border bg-neutral-600/40 p-4 rounded-md flex flex-col"
                  >
                    <div className="flex items-center justify-between mb-2">
                      {item.public && (
                        <span className="bg-taskify rounded-br-xl rounded-tl-xl text-xxs px-4 py-1 font-semibold flex items-center justify-center gap-2 select-none">
                          PUBLICA <MdPublic size={16} />
                        </span>
                      )}
                      {!item.public && (
                        <div className="flex items-center justify-center gap-2">
                          <span className="bg-white rounded-br-xl rounded-tl-xl text-xxs px-4 py-1 font-semibold flex items-center justify-center gap-2 select-none">
                            PRIVADA <MdPublicOff size={16} />
                          </span>
                        </div>
                      )}
                      <div className="flex items-center justify-center gap-2">
                        {item.public && (
                          <button className="text-white transition-all hover:text-taskify">
                            <Link href={`task/${item.id}`}>
                              <BiLinkExternal size={24} />
                            </Link>
                          </button>
                        )}

                        <button
                          className="text-white transition-all hover:text-red-500"
                          onClick={() => handleDeleteTask(item.id)}
                        >
                          <PiTrash size={24} />
                        </button>
                      </div>
                    </div>
                    <div className="border-b border-white/30 mt-2 mb-4 w-full"></div>

                    <div className="flex items-center justify-between w-full">
                      <p className="text-white whitespace-pre-wrap text-justify text-sm">
                        {item.task}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}
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
    props: {
      user: {
        email: session?.user?.email,
      },
    },
  };
};
