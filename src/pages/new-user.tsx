import { Button } from "../components/button";

const NewUser = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("submit");
  };
  return (
    <>
      <main className="flex min-h-screen items-center justify-center">
        <form
          onSubmit={handleSubmit}
          action=""
          className="w-full max-w-xl space-y-6 rounded-lg bg-purple-600 bg-opacity-10 p-8"
        >
          <Input label="Name" />
          <TextArea label="Description" />
          <Select label="Role" options={["Developer", "Designer"]} />
          <button type="submit">
            <Button content="Submit" />
          </button>
        </form>
      </main>
    </>
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
