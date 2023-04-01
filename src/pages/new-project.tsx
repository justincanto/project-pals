import { Button } from "../components/button";
import { Layout } from "../layouts/default";
import { useForm, type SubmitHandler } from "react-hook-form";
import { api } from "../utils/api";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Role } from "@prisma/client";
import { ROLES } from "../utils/constants";

interface INewProjectFormInput {
  title: string;
  description: string;
  neededRoles: Role[];
}

const Login = () => {
  const session = useSession();

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
  if (!session.data || !session.data?.user) {
    return (
      <Layout>
        <div className="flex-1 pt-32">
          <h2 className="mb-4 text-2xl font-bold">
            You must be logged in to create a new project
          </h2>
          <div className="m-auto w-fit">
            <Link
              href="/account"
              className="font-bold text-purple-600 text-opacity-70 hover:text-opacity-100"
            >
              {" "}
              Login{" "}
            </Link>
            or go back to the{" "}
            <Link
              href="/"
              className="font-bold text-purple-600 text-opacity-70 hover:text-opacity-100"
            >
              Home Page
            </Link>
          </div>
        </div>
      </Layout>
    );
  }
  return (
    <Layout>
      <div className="flex-1 pt-32">
        <h1 className="mb-5 text-3xl font-semibold">
          Fill your project informations
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-5"
        >
          <label htmlFor="title" className="block font-semibold">
            Title
            <input
              id="title"
              {...register("title", { required: true })}
              className="block w-full rounded-md border border-gray-900 border-opacity-25 py-1.5 px-2.5 font-normal"
            />
          </label>
          <label htmlFor="description" className="block font-semibold">
            Description
            <textarea
              rows={5}
              cols={55}
              id="description"
              {...register("description", { required: true })}
              className="block rounded-md border border-gray-900 border-opacity-25 py-1.5 px-2.5 font-normal"
            />
          </label>
          <fieldset>
            <legend className="font-semibold">Needed roles</legend>
            {Object.keys(Role).map((role) => (
              <label htmlFor={role} className="ml-4 block" key={role}>
                <input
                  {...register("neededRoles", {
                    validate: (v: Array<Role>) => v.length > 0,
                  })}
                  id={role}
                  type="checkbox"
                  value={role}
                  className="mr-2"
                />
                {ROLES[role as keyof typeof ROLES]}
              </label>
            ))}
          </fieldset>
          <button type="submit">
            <Button content="Create project" />
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
