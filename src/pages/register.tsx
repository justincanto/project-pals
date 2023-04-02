import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Button } from "../components/button";
import { api } from "../utils/api";
import { TextInput } from "../components/text-input";
import { TextAreaInput } from "../components/text-area-input";
import { SelectInput } from "../components/select-input";
import { ROLES } from "../utils/constants";
import Image from "next/image";

const isValidUrl = (url: string) =>
  /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/.test(
    url
  );
type IFormInput = {
  name: string;
  description: string;
  role: "DEV_FRONT" | "UI_DESIGNER";
  links?: string[];
};

const NewUser = () => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const updateMeMutation = api.user.updateMe.useMutation();
  const router = useRouter();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const userData = { ...data, links };

    updateMeMutation.mutate(userData, {
      onSuccess: async () => {
        await router.push("/");
      },
    });
  };
  const newLink = useRef<HTMLInputElement>(null);
  const [links, setLinks] = useState<string[]>([]);
  const addLinkIfEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addLink(e);
    }
  };
  const addLink = (
    e:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.KeyboardEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    if (
      !newLink.current?.value ||
      links.includes(newLink.current.value) ||
      !isValidUrl(newLink.current.value)
    ) {
      return;
    }
    setLinks([...links, newLink.current.value]);
    newLink.current.value = "";
    newLink.current?.focus();
  };

  return (
    <main className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        action=""
        className="w-full max-w-xl space-y-6 rounded-lg  bg-opacity-10 p-8"
      >
        <h1 className="text-4xl font-bold">Registration</h1>
        <TextInput
          register={register}
          label="Name"
          name="name"
          id="name"
          rules={{ required: true }}
        />
        <TextAreaInput
          register={register}
          label="Description"
          name="description"
          id="description"
          rules={{ required: true }}
        />
        <SelectInput
          register={register}
          label="Role"
          name="role"
          id="role"
          items={Object.keys(ROLES).map((key) => ({
            label: ROLES[key as keyof typeof ROLES],
            value: key,
          }))}
          rules={{ required: true }}
        />
        <label htmlFor="links" className="block font-semibold">
          Your links (Github, LinkedIn, Dribble, etc.)
          <div className="mb-2 flex overflow-hidden rounded-md">
            <input
              type="text"
              ref={newLink}
              placeholder="https://github.com/username"
              className="block w-full rounded-md rounded-r-none border border-r-0 border-gray-900 border-opacity-25  py-1.5 px-2.5 font-normal"
              onKeyDown={(e) => addLinkIfEnter(e)}
            />
            <button
              onClick={(e) => addLink(e)}
              className="cursor-pointer bg-purple-600 bg-opacity-50 px-6 font-normal"
            >
              Add
            </button>
          </div>
          <ul className="ml-4 font-normal">
            {links.map((link) => (
              <li key={link}>
                <a
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  className="flex hover:underline"
                >
                  <Image
                    src="/icons/link.svg"
                    width={20}
                    height={20}
                    alt=""
                    className="mr-2"
                  />
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </label>
        <button type="submit">
          <Button content="Submit" />
        </button>
      </form>
    </main>
  );
};

export default NewUser;
