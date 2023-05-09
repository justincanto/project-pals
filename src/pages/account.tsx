import { signIn, signOut } from "next-auth/react";
import { Button } from "../components/button";
import { Layout } from "../layouts/default";
import { AccountForm } from "../components/account-form";
import { api } from "../utils/api";
import { useMemo } from "react";

const Account = () => {
  const { data } = api.user.me.useQuery();

  const userData = useMemo(
    () => ({
      name: data?.name || null,
      description: data?.description || null,
      email: data?.email || null,
      id: data?.id || "null",
      image: data?.image || null,
      role: data?.role || null,
      links: data?.links || [],
      emailVerified: data?.emailVerified || null,
    }),
    [
      data?.name,
      data?.description,
      data?.email,
      data?.id,
      data?.image,
      data?.role,
      data?.links,
      data?.emailVerified,
    ]
  );

  return (
    <Layout>
      {userData ? (
        <>
          <AccountForm title="Update your profile" user={userData} />
          <button onClick={() => signOut()}>
            <Button content="Logout" />
          </button>
        </>
      ) : (
        <div onClick={() => void signIn("google")}>
          <Button content="Login with Google" />
        </div>
      )}
    </Layout>
  );
};

export default Account;
