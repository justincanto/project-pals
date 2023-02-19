import { Button } from "../components/button";
import { Layout } from "../layouts/default";
import { useForm, type SubmitHandler } from "react-hook-form";
import { api } from "../utils/api";
import { useRouter } from "next/router";

interface INewProjectFormInput {
  title: string;
  description: string;
  neededRoles: ("DEV_FRONT" | "UI_DESIGNER")[];
}

const Login = () => {
  const { register, handleSubmit } = useForm<INewProjectFormInput>();
  const updateMeMutation = api.project.create.useMutation();
  const router = useRouter();
  const onSubmit: SubmitHandler<INewProjectFormInput> = (data) => {
    updateMeMutation.mutate(data, {
      onSuccess: async () => {
        await router.push("/projects");
      },
    });
  };
  return (
    <Layout>
      <main>
        <h1 className="text-bold text-3xl">Fill your project informations</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="title" className="block">
            Title
            <input
              id="title"
              {...register("title", { required: true })}
              className="block"
            />
          </label>
          <label htmlFor="description" className="block">
            Description
            <textarea
              rows={5}
              cols={55}
              id="description"
              {...register("description", { required: true })}
              className="block"
            />
          </label>
          <fieldset>
            <legend>Needed roles</legend>
            <label htmlFor="devFront" className="block">
              Developer
              <input
                {...register("neededRoles")}
                id="devFront"
                type="checkbox"
                value="DEV_FRONT"
              />
            </label>
            <label htmlFor="uiDesigner" className="block">
              UI Designer
              <input
                {...register("neededRoles")}
                id="uiDesigner"
                type="checkbox"
                value="UI_DESIGNER"
              />
            </label>
          </fieldset>
          <button type="submit">
            <Button content="Create project" />
          </button>
        </form>
      </main>
    </Layout>
  );
};

export default Login;
