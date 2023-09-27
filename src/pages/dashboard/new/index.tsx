import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import Head from "next/head";

import { ChangeEvent, FormEvent, useState, useEffect } from "react";

import { Textarea } from "../../../components/textarea";
import { MdAddTask, MdPublic } from "react-icons/md";

import { db } from "../../../services/firebaseConnection";
import {
  addDoc,
  collection,
  query,
  orderBy,
  where,
  onSnapshot,
} from "firebase/firestore";
import toast from "react-hot-toast";

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
            name: doc.data().name,
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
        name: user?.name,
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

  return (
    <div className="w-full mx-auto flex items-center justify-center p-5">
      <Head>
        <title>Taskify | Dashboard</title>
      </Head>

      <main className="w-full">
        {/* Form */}
        <section className="w-full flex items-center justify-center">
          <div className="max-w-4xl w-full">
            <div className="text-white mb-5 text-center select-none">
              <h1 className="text-2xl flex items-center justify-center gap-2">
                Nova tarefa <MdAddTask size={24} />
              </h1>
              <p className="my-3 text-sm">
                Registre suas tarefas diárias e mantenha-se organizado.
              </p>
              <div className="border-b border-white/30 my-4 w-full"></div>
            </div>

            <form onSubmit={handleRegisterTask}>
              <Textarea
                placeholder="Insira os detalhes da sua tarefa..."
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
                    Tarefa pública <MdPublic size={16} />
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
    props: {
      user: {
        email: session?.user?.email,
        name: session?.user?.name,
      },
    },
  };
};
