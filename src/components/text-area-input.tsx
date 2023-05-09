import type {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

export type InputProps<TFormValues extends FieldValues> = {
  id: string;
  label: string;
  name: Path<TFormValues>;
  rules?: RegisterOptions;
  register?: UseFormRegister<TFormValues>;
};

export const TextAreaInput = <TFormValues extends Record<string, unknown>>({
  id,
  label,
  name,
  rules,
  register,
}: InputProps<TFormValues>) => {
  return (
    <label htmlFor={id} className="block font-semibold">
      {label}
      <textarea
        id={id}
        name={name}
        cols={55}
        rows={5}
        {...(register && register(name, rules))}
        className="block w-full rounded-md border border-gray-900 border-opacity-25 py-1.5 px-2.5 font-normal"
      />
    </label>
  );
};
