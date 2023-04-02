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

export const CheckboxInput = <TFormValues extends Record<string, unknown>>({
  id,
  label,
  name,
  rules,
  register,
}: InputProps<TFormValues>) => {
  return (
    <label htmlFor={id} className="ml-4 block">
      <input
        {...(register && register(name, rules))}
        id={id}
        type="checkbox"
        value={id}
        className="mr-2"
      />
      {label}
    </label>
  );
};
