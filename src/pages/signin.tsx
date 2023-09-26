import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { signIn, getSession } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import {
  BiLogoDiscord,
  BiLogoGithub,
  BiLogoTwitch,
  BiLogoSpotify,
} from "react-icons/bi";
import { SiGitlab } from "react-icons/si";

import logo from "../../public/assets/logo.png";

export default function SignIn() {
  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/" });
  };

  const handleDiscordSignIn = () => {
    signIn("discord", { callbackUrl: "/" });
  };

  const handleGithubSignIn = () => {
    signIn("github", { callbackUrl: "/" });
  };

  const handleTwitchSignIn = () => {
    signIn("twitch", { callbackUrl: "/" });
  };

  const handleGitlabSignIn = () => {
    signIn("gitlab", { callbackUrl: "/" });
  };

  const handleSpotifySignIn = () => {
    signIn("spotify", { callbackUrl: "/" });
  };

  return (
    <div className="w-full max-w-xl mx-auto flex justify-center items-center h-screen">
      <Head>
        <title>Taskify | Login</title>
        <link rel="shortcut icon" href="favicon.png" type="image/x-icon" />
      </Head>
      <section className="flex flex-col items-center justify-center text-white w-full px-2">
        <Link href="/">
          <Image
            className="w-60 md:w-80 h-auto"
            src={logo}
            alt="Taskify"
            priority
          />
        </Link>
        <h1 className="font-semibold mt-5 md:text-lg">
          Conecte-se à sua conta
        </h1>
        <div className="w-full max-w-xs md:max-w-xl mx-auto px-2">
          <div className="border-b border-white/30 mt-2"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-4">
            <button
              onClick={handleGoogleSignIn}
              className="w-full bg-white text-black rounded-md flex items-center justify-center p-2 gap-4 font-medium transition-all duration-200 ease-in-out hover:scale-[1.02]"
            >
              <FcGoogle size={32} /> Login com Google
            </button>
            <button
              onClick={handleDiscordSignIn}
              className="w-full bg-discord rounded-md flex items-center justify-center text-white p-2 gap-4 font-medium transition-all duration-200 ease-in-out hover:scale-[1.02]"
            >
              <BiLogoDiscord size={32} />
              Login com Discord
            </button>
            <button
              onClick={handleGithubSignIn}
              className="w-full bg-black rounded-md flex items-center justify-center text-white p-2 gap-4 font-medium transition-all duration-200 ease-in-out hover:scale-[1.02]"
            >
              <BiLogoGithub size={32} />
              Login com Github
            </button>
            <button
              onClick={handleTwitchSignIn}
              className="w-full bg-twitch rounded-md flex items-center justify-center text-white p-2 gap-4 font-medium transition-all duration-200 ease-in-out hover:scale-[1.02]"
            >
              <BiLogoTwitch size={32} />
              Login com Twitch
            </button>
            <button
              onClick={handleGitlabSignIn}
              className="w-full bg-gitlab rounded-md flex items-center justify-center text-white p-2 gap-4 font-medium transition-all duration-200 ease-in-out hover:scale-[1.02]"
            >
              <SiGitlab size={32} />
              Login com Gitlab
            </button>
            <button
              onClick={handleSpotifySignIn}
              className="w-full bg-spotify rounded-md flex items-center justify-center text-white p-2 gap-4 font-medium transition-all duration-200 ease-in-out hover:scale-[1.02]"
            >
              <BiLogoSpotify size={32} />
              Login com Spotify
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if(session?.user){
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