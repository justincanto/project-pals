import Image from "next/image";
import { TextAreaInput } from "./text-area-input";
import { SelectInput } from "./select-input";
import { TextInput } from "./text-input";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { api } from "../utils/api";
import { useEffect, useRef, useState } from "react";
import { ROLES } from "../utils/constants";
import { Button } from "./button";
import type { Role, User } from "@prisma/client";

type IFormInput = {
  name?: string;
  description: string;
  role: Role;
  links?: string[];
};

const isValidUrl = (url: string) =>
  /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/.test(
    url
  );

type RecursivelyReplaceNullWithUndefined<T> = T extends null
  ? undefined
  : T extends (infer U)[]
  ? RecursivelyReplaceNullWithUndefined<U>[]
  : T extends Record<string, unknown>
  ? { [K in keyof T]: RecursivelyReplaceNullWithUndefined<T[K]> }
  : T;

export function nullsToUndefined<T>(
  obj: T
): RecursivelyReplaceNullWithUndefined<T> {
  if (obj === null || obj === undefined) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-explicit-any
    return undefined as any;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
  if ((obj as any).constructor.name === "Object" || Array.isArray(obj)) {
    for (const key in obj) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
      obj[key] = nullsToUndefined(obj[key]) as any;
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-explicit-any
  return obj as any;
}

export const AccountForm = (props: { title: string; user?: User }) => {
  const { register, handleSubmit, reset } = useForm<IFormInput>();

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

  useEffect(() => {
    if (props.user) {
      const formattedTypeUserData = nullsToUndefined(props.user);
      reset({ ...formattedTypeUserData, role: formattedTypeUserData.role });
      setLinks(props.user.links);
    }
  }, [props.user, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      action=""
      className="w-full max-w-xl space-y-6 rounded-lg  bg-opacity-10 p-8"
    >
      <h1 className="text-4xl font-bold">{props.title}</h1>
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
        <Button content="Save" />
      </button>
    </form>
  );
};
