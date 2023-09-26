import { GetServerSideProps } from "next";
import Head from "next/head";
import { getSession } from "next-auth/react";

export default function Dashboard() {
  return (
    <div>
      <Head>
        <title>Taskify | Dashboard</title>
      </Head>
      <h1 className="text-2xl text-white">Dashboard</h1>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if(!session?.user){
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    }
  }

  return {
    props: {},
  };
};
