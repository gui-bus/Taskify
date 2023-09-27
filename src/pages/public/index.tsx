import Head from "next/head";

import { useState, useEffect } from "react";

import { BiLinkExternal } from "react-icons/bi";

import { MdPublic } from "react-icons/md";

import { db } from "../../services/firebaseConnection";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

import Link from "next/link";

interface TaskProps {
  id: string;
  created: Date;
  public: boolean;
  task: string;
  user: string;
  name: string;
}

export default function Dashboard() {
  const [tasks, setTasks] = useState<TaskProps[]>([]);

  useEffect(() => {
    async function loadTasks() {
      const tasksRef = collection(db, "taskify");
      const queryRef = query(tasksRef, orderBy("created", "asc"));

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
  }, []);

  return (
    <div className="w-full mx-auto flex items-center justify-center p-5">
      <Head>
        <title>Taskify | Tarefas</title>
      </Head>

      <main className="w-full">
        {/* Active tasks */}

        <section className="w-full flex items-center justify-center">
          <div className="max-w-6xl w-full">
            <div className="text-white mb-5 text-center select-none">
              <h1 className="text-2xl flex items-center justify-center gap-2">
                Tarefas Publicas <MdPublic size={24} />
              </h1>
              <p className="my-3 text-sm">
                Veja a lista das tarefas publicas que foram registradas no
                Taskify.
              </p>
              <div className="border-b border-white/30 my-4 w-full"></div>
            </div>
            {tasks.some((item) => item.id !== "") && (
              <div className="max-w-6xl w-full">
                {tasks
                  .filter((item) => item.public)
                  .map((item) => (
                    <article
                      key={item.id}
                      className="mb-3 border bg-neutral-600/40 p-4 rounded-md flex flex-col"
                    >
                      <div className="flex items-center justify-between w-full">
                        <p className="text-white whitespace-pre-wrap text-center text-sm w-full break-words">
                          {item.task}
                        </p>
                      </div>
                      <div className="border-b border-white/30 mt-2 mb-4 w-full"></div>
                      <div className="flex items-center justify-between">
                        <p className="flex items-center justify-center gap-2 text-white/50 text-xxs select-none">
                          Criada por {item?.name}
                        </p>

                        <div className="flex items-center justify-center gap-2">
                          {item.public && (
                            <button className="text-white transition-all hover:text-taskify">
                              <Link href={`task/${item.id}`} className="flex items-center justify-center gap-2">
                                Visualizar tarefa<BiLinkExternal size={24} />
                              </Link>
                            </button>
                          )}
                        </div>
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
