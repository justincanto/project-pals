import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "../components/button";
import { Layout } from "../layouts/default";

const Account = () => {
  const session = useSession();
  return (
    <Layout>
      {session.data && session.data.user ? (
        <div className="flex flex-col items-center gap-y-2">
          {session.data && session.data.user ? (
            <div>
              Logged in as {session.data.user.name} using {""}
              {session.data.user.email}
            </div>
          ) : null}
          <button onClick={() => signOut()}>
            <Button content="Logout" />
          </button>
        </div>
      ) : (
        <div onClick={() => void signIn("google")}>
          <Button content="Login with Google" />
        </div>
      )}
    </Layout>
  );
};

export default Account;
