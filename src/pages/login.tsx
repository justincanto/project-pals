import { signIn } from "next-auth/react";
import { Button } from "../components/button";
import { Layout } from "../layouts/default";

const Login = () => {
  return (
    <Layout>
      {/* <form onSubmit={handleSubmit}></form> */}
      <div onClick={() => void signIn("google")}>
        <Button content="Login with Google" />
      </div>
    </Layout>
  );
};

export default Login;
