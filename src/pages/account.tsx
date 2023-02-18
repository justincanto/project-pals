import { signOut, useSession } from "next-auth/react";
import { Button } from "../components/button";
import { Layout } from "../layouts/default";

const Account = () => {
  const session = useSession();
  return (
    <Layout>
      <main className="flex flex-col items-center gap-y-2">
        {session.data && session.data.user ? (
          <div>
            Logged in as {session.data.user.name} using
            {session.data.user.email}
          </div>
        ) : null}
        <button onClick={() => void signOut()}>
          <Button content="Logout" />
        </button>
      </main>
    </Layout>
  );
};

export default Account;
