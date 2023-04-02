import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Button } from "../components/button";
import { api } from "../utils/api";
import { TextInput } from "../components/text-input";
import { TextAreaInput } from "../components/text-area-input";

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
    console.log(userData);

    // updateMeMutation.mutate(userData, {
    //   onSuccess: async () => {
    //     await router.push("/");
    //   },
    // });
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
        className="w-full max-w-xl space-y-6 rounded-lg bg-purple-600 bg-opacity-10 p-8"
      >
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
        <label htmlFor="role" className="block">
          Role
          <select
            id="role"
            {...register("role", { required: true })}
            className="block"
          >
            <option value="DEV_FRONT">Developer</option>
            <option value="UI_DESIGNER">UI Designer</option>
          </select>
        </label>
        <label htmlFor="links" className="block w-full">
          Your links (Github, LinkedIn, Dribble, etc.)
          <div className="flex">
            <input
              type="text"
              ref={newLink}
              placeholder="https://github.com/username"
              className="w-full"
              onKeyDown={(e) => addLinkIfEnter(e)}
            />
            <button
              onClick={(e) => addLink(e)}
              className="cursor-pointer bg-purple-600 bg-opacity-50 px-2"
            >
              Add
            </button>
          </div>
          {links.map((link) => (
            <div key={link}>{link}</div>
          ))}
        </label>
        <button type="submit">
          <Button content="Submit" />
        </button>
      </form>
    </main>
  );
};

export default NewUser;

const Input = ({ label }: { label: string }) => {
  return (
    <label htmlFor={label} className="block text-sm font-bold">
      {label}
      <input
        type="text"
        id={label}
        name={label}
        className="block rounded-lg border px-2 py-1 text-base font-normal shadow-sm"
      />
    </label>
  );
};
const TextArea = ({ label }: { label: string }) => {
  return (
    <label htmlFor={label} className="block text-sm font-bold">
      {label}
      <textarea
        name={label}
        id={label}
        className="block rounded-lg border px-2 py-1 text-base font-normal shadow-sm"
        cols={50}
        rows={5}
      />
    </label>
  );
};

const Select = ({ label, options }: { label: string; options: string[] }) => {
  return (
    <label htmlFor={label} className="block text-sm font-bold">
      {label}
      <select
        name={label}
        id={label}
        className="block rounded-lg px-2 py-1 text-base font-normal shadow-sm"
      >
        {options.map((opt) => (
          <option value={opt} key={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
};
