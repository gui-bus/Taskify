import { GetServerSideProps } from "next";
import Head from "next/head";

import { ChangeEvent, FormEvent, useState } from "react";

import { db } from "../../services/firebaseConnection";
import {
  doc,
  collection,
  query,
  where,
  getDoc,
  getDocs,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineComment } from "react-icons/ai";
import { CgTrash } from "react-icons/cg";
import { Textarea } from "@/components/textarea";
import { getSession, useSession } from "next-auth/react";
import toast from "react-hot-toast";

interface TaskProps {
  item: {
    task: string;
    public: boolean;
    created: string;
    user: string;
    taskId: string;
    name: string;
  };
  allComments: CommentProps[];
}

interface CommentProps {
  id: string;
  comment: string;
  taskId: string;
  user: string;
  name: string;
  createdDate: string;
}

export default function Task({ item, allComments }: TaskProps) {
  const { data: session } = useSession();
  const [input, setInput] = useState("");
  const [comments, setComments] = useState<CommentProps[]>(allComments || []);

  async function handleComment(event: FormEvent) {
    event.preventDefault();

    if (input === "") return;
    if (!session?.user?.email || !session?.user?.name) return;

    try {
      const docRef = await addDoc(collection(db, "comments"), {
        comment: input,
        created: new Date(),
        user: session?.user?.email,
        name: session?.user?.name,
        taskId: item?.taskId,
      });

      const newComment = {
        id: docRef.id,
        comment: input,
        created: new Date(),
        user: session?.user?.email,
        name: session?.user?.name,
        taskId: item?.taskId,
        createdDate: new Date().toLocaleDateString(),
      };

      setComments((oldItems) => [...oldItems, newComment]);

      setInput("");

      toast.success("Comentário enviado!", {
        style: { fontSize: "0.8rem" },
      });
    } catch (error) {
      toast.error("Erro ao enviar comentário!", {
        style: { fontSize: "0.8rem" },
      });
    }
  }

  async function handleDeleteComment(id: string) {
    try {
      const docRef = doc(db, "comments", id);
      await deleteDoc(docRef);

      const deleteComment = comments.filter((item) => item.id !== id);
      setComments(deleteComment);

      toast.success("Comentário apagado!", {
        style: { fontSize: "0.8rem" },
      });
    } catch (error) {
      toast.error("Erro ao apagar comentário!", {
        style: { fontSize: "0.8rem" },
      });
    }
  }

  return (
    <div>
      <Head>
        <title>Taskify | Detalhes</title>
      </Head>

      <main>
        <section className="w-full flex items-center justify-center">
          <div className="max-w-6xl w-full">
            <div className="text-white mb-5 text-center select-none">
              <h1 className="text-2xl flex items-center justify-center gap-2">
                Detalhes da tarefa <BsInfoCircle size={24} />
              </h1>
              <p className="my-3 text-sm">
                Acompanhe os detalhes e o progresso desta tarefa.
              </p>
            </div>

            <div className="max-w-6xl w-full px-4 md:px-0">
              <article className="mb-3 border bg-neutral-600/40 p-4 rounded-md flex flex-col">
                <div className="flex items-center justify-between w-full">
                  <p className="text-white whitespace-pre-wrap text-justify text-sm w-full break-words">
                    {item.task}
                  </p>
                </div>
                <div className="border-b border-white/30 my-2 w-full"></div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-center ml-auto gap-2 text-white/50 text-xxs select-none">
                    Criado em {item?.created} por {item?.name}
                  </div>
                </div>
              </article>
              <div className="border-b border-white/30 my-8 w-full"></div>
            </div>
          </div>
        </section>

        <section className="w-full flex items-center justify-center">
          <div className="max-w-6xl w-full">
            <div className="text-white text-center select-none">
              <h1 className="text-2xl flex items-center justify-center gap-2">
                Adicionar comentário <AiOutlineComment size={24} />
              </h1>
            </div>

            <div className="max-w-6xl w-full px-4 md:px-0">
              <form
                className="p-4 rounded-md flex flex-col"
                onSubmit={handleComment}
              >
                <Textarea
                  value={input}
                  onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                    setInput(event.target.value)
                  }
                  placeholder="Digite seu comentário..."
                />

                <div className="flex items-center justify-between gap-2 text-sm text-white">
                  {!session?.user && (
                    <p className="flex items-center justify-center gap-2 select-none">
                      Para inserir comentários é necessário estar logado.
                    </p>
                  )}
                  <button
                    disabled={!session?.user}
                    type="submit"
                    className="border text-taskify border-taskify px-4 py-2 rounded-br-xl rounded-tl-xl font-medium transition-all duration-300 ease-linear hover:bg-taskify hover:text-black hover:border-taskifyHover my-4 select-none w-fit ml-auto disabled:cursor-not-allowed disabled:border-taskify/30 disabled:text-taskify/30 disabled:hover:bg-taskify/30"
                  >
                    Comentar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        <section className="w-full flex items-center justify-center mb-5">
          <div className="max-w-6xl w-full">
            <div className="max-w-6xl w-full px-4 md:px-0">
              {comments.length === 0 && <div></div>}

              {comments.map((item) => (
                <article
                  key={item.id}
                  className="mb-3 border bg-neutral-600/40 p-4 rounded-md flex flex-col"
                >
                  <div className="flex items-center justify-between w-full">
                    <p className="text-white whitespace-pre-wrap text-justify text-sm w-full break-words">
                      {item.comment}
                    </p>
                  </div>
                  <div className="border-b border-white/30 my-2 w-full"></div>
                  <div className="flex items-center justify-between">
                    {item.user === session?.user?.email && (
                      <button
                        className="text-white transition-all hover:text-red-500"
                        onClick={() => handleDeleteComment(item.id)}
                      >
                        <CgTrash size={18} />
                      </button>
                    )}
                    <div className="flex items-center justify-center ml-auto gap-2 text-white/50 text-xxs select-none">
                      Criado em {item.createdDate} por {item?.name}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  const session = await getSession({ req });
  const id = params?.id as string;

  const docRef = doc(db, "taskify", id);

  const q = query(collection(db, "comments"), where("taskId", "==", id));
  const spapshotComments = await getDocs(q);

  const allComments: CommentProps[] = [];

  spapshotComments.forEach((doc) => {
    const miliseconds = doc.data().created.seconds * 1000;
    allComments.push({
      id: doc.id,
      comment: doc.data().comment,
      user: doc.data().user,
      name: doc.data().name,
      taskId: doc.data().name,
      createdDate: new Date(miliseconds).toLocaleDateString(),
    });
  });

  const snapshot = await getDoc(docRef);

  if (snapshot.data() === undefined) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  if (!snapshot.data()?.public) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const miliseconds = snapshot.data()?.created?.seconds * 1000;
  const task = {
    task: snapshot.data()?.task,
    public: snapshot.data()?.public,
    created: new Date(miliseconds).toLocaleDateString(),
    user: snapshot.data()?.user,
    name: snapshot.data()?.name,
    taskId: id,
  };

  return {
    props: {
      item: task,
      allComments: allComments,
    },
  };
};
