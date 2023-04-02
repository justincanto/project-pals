import { Button } from "../components/button";
import { Layout } from "../layouts/default";
import { useForm, type SubmitHandler } from "react-hook-form";
import { api } from "../utils/api";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Role } from "@prisma/client";
import { ROLES } from "../utils/constants";
import { TextInput } from "../components/text-input";
import { TextAreaInput } from "../components/text-area-input";
import { CheckboxInput } from "../components/checkbox-input";

type NewProjectFormInput = {
  title: string;
  description: string;
  neededRoles: Role[];
};

const NewProject = () => {
  const session = useSession();

  const { register, handleSubmit } = useForm<NewProjectFormInput>();
  const updateMeMutation = api.project.create.useMutation();
  const router = useRouter();
  const onSubmit: SubmitHandler<NewProjectFormInput> = (data) => {
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
          <TextInput
            register={register}
            label="Title"
            name="title"
            id="title"
            rules={{ required: true }}
          />
          <TextAreaInput
            register={register}
            label="Description"
            name="description"
            id="description"
            rules={{ required: true }}
          />
          <fieldset>
            <legend className="font-semibold">Needed roles</legend>
            {Object.keys(Role).map((role) => (
              <CheckboxInput
                id={role}
                name="neededRoles"
                label={ROLES[role as keyof typeof ROLES]}
                key={role}
                register={register}
                rules={{
                  validate: (selectedRoles: Array<Role>) =>
                    selectedRoles.length > 0,
                }}
              />
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

export default NewProject;
