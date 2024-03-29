import { type NextPage } from "next";
import Head from "next/head";

import { PalsList } from "../components/palsList";
import { Layout } from "../layouts/default";

const Profiles: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Pals</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex w-full flex-col items-center gap-y-6 p-8 md:gap-y-12">
        <h1 className="self-start text-5xl font-extrabold tracking-tight text-gray-800 sm:text-[5rem]">
          Pals
        </h1>
        <div className="flex flex-col items-center gap-2">
          <PalsList />
        </div>
      </div>
    </Layout>
  );
};

export default Profiles;
