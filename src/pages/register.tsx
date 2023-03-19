import { useRouter } from "next/router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Button } from "../components/button";
import { api } from "../utils/api";

interface IFormInput {
  name: string;
  description: string;
  role: "DEV_FRONT" | "UI_DESIGNER";
}

const NewUser = () => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const updateMeMutation = api.user.updateMe.useMutation();
  const router = useRouter();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    updateMeMutation.mutate(data, {
      onSuccess: async () => {
        await router.push("/");
      },
    });
  };

  return (
    <main className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        action=""
        className="w-full max-w-xl space-y-6 rounded-lg bg-purple-600 bg-opacity-10 p-8"
      >
        <label htmlFor="name" className="block">
          Name
          <input
            id="name"
            {...(register("name"), { required: true })}
            className="block"
          />
        </label>
        <label htmlFor="description" className="block">
          Description
          <textarea
            rows={5}
            cols={55}
            id="description"
            {...(register("description"), { required: true })}
            className="block"
          />
        </label>
        <label htmlFor="role" className="block">
          Role
          <select
            id="role"
            {...(register("role"), { required: true })}
            className="block"
          >
            <option value="DEV_FRONT">Developer</option>
            <option value="UI_DESIGNER">UI Designer</option>
          </select>
        </label>
        {/* <Input label="Name" />
          <TextArea label="Description" />
          <Select label="Role" options={["Developer", "Designer"]} /> */}
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
