import { signOut } from "next-auth/react";
import { Button } from "../components/button";
import { Layout } from "../layouts/default";

const Account = () => {
  return (
    <Layout>
      <button onClick={() => void signOut()}>
        <Button content="Logout" />
      </button>
    </Layout>
  );
};

export default Account;
