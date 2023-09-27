import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import Head from "next/head";

import { useState, useEffect } from "react";
import Link from "next/link";

import { BiLinkExternal } from "react-icons/bi";
import { AiOutlineFileDone } from "react-icons/ai";
import { MdAddTask, MdPublic, MdPublicOff } from "react-icons/md";

import { db } from "../../services/firebaseConnection";
import {
  collection,
  query,
  orderBy,
  where,
  onSnapshot,
  doc,
  deleteDoc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import toast from "react-hot-toast";
import { TbListDetails, TbListSearch } from "react-icons/tb";

interface HomeProps {
  user: {
    email: string;
    name: string;
  };
}

interface TaskProps {
  id: string;
  created: Date;
  public: boolean;
  task: string;
  user: string;
  name: string;
}

export default function Dashboard({ user }: HomeProps) {
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
            name: doc.data().name,
          });
        });

        setTasks(list);
      });
    }

    loadTasks();
  }, [user?.email]);

  async function handleDeleteTask(id: string) {
    const docRef = doc(db, "taskify", id);
    const taskSnapshot = await getDoc(docRef);

    if (taskSnapshot.exists()) {
      const taskId = taskSnapshot.id;
      const commentsQuery = query(
        collection(db, "comments"),
        where("taskId", "==", taskId)
      );

      const commentsSnapshot = await getDocs(commentsQuery);

      commentsSnapshot.forEach(async (commentDoc) => {
        await deleteDoc(commentDoc.ref);
      });

      await deleteDoc(docRef);

      toast.success("Tarefa concluída!", {
        style: { fontSize: "0.8rem" },
      });
    } else {
      toast.error("Erro ao concluir tarefa.", {
        style: { fontSize: "0.8rem" },
      });
    }
  }

  return (
    <div className="w-full mx-auto flex items-center justify-center p-5">
      <Head>
        <title>Taskify | Dashboard</title>
      </Head>

      <main className="w-full">
        {/* Active tasks */}

        <section className="w-full flex items-center justify-center">
          <div className="max-w-6xl w-full">
            <Link
              href="/dashboard/new"
              className="border text-taskify border-taskify px-4 py-2 rounded-br-xl rounded-tl-xl font-medium transition-all duration-300 ease-linear hover:bg-taskify hover:text-black hover:border-taskifyHover my-4 select-none flex items-center justify-center gap-2 md:w-fit"
            >
              Inserir nova tarefa <MdAddTask size={24} />
            </Link>
            <div className="border-b border-white/30 mt-2 mb-8 w-full"></div>

            {tasks.length === 0 ? (
              <div className="text-white mb-5 text-center select-none">
                <h1 className="text-2xl flex items-center justify-center gap-2">
                  Lista vazia <TbListSearch size={28} />
                </h1>
                <p className="my-3 text-sm">
                  Parece que você ainda não possui nenhuma tarefa registrada.
                  Que tal começar agora?
                </p>
              </div>
            ) : (
              <div className="text-white mb-5 text-center select-none">
                <h1 className="text-2xl flex items-center justify-center gap-2">
                  Tarefas em andamento <TbListDetails size={24} />
                </h1>
                <p className="my-3 text-sm">
                  Aqui está a lista das tarefas que você já registrou e está
                  realizando agora.
                </p>
              </div>
            )}

            {tasks.some((item) => item.id !== "") && (
              <div className="max-w-6xl w-full">
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
                          className="text-white transition-all hover:text-taskify"
                          onClick={() => handleDeleteTask(item.id)}
                        >
                          <AiOutlineFileDone size={24} />
                        </button>
                      </div>
                    </div>
                    <div className="border-b border-white/30 mt-2 mb-4 w-full"></div>

                    <div className="flex items-center justify-between w-full">
                      <p className="text-white whitespace-pre-wrap text-justify text-sm w-full break-words">
                        {item.task}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  

  return {
    props: {
      user: {
        email: session?.user?.email,
        name: session?.user?.name,
      },
    },
  };
};
