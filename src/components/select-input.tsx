import type {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

type Item = {
  value: string;
  label: string;
};

export type InputProps<TFormValues extends FieldValues> = {
  id: string;
  label: string;
  name: Path<TFormValues>;
  items: Item[];
  rules?: RegisterOptions;
  register?: UseFormRegister<TFormValues>;
};

export const SelectInput = <TFormValues extends Record<string, unknown>>({
  id,
  label,
  name,
  items,
  rules,
  register,
}: InputProps<TFormValues>) => {
  return (
    <label htmlFor={id} className="block font-semibold">
      {label}
      <select
        id="role"
        {...(register && register(name, rules))}
        className="block rounded-md border border-gray-900 border-opacity-25 py-1.5 px-2.5 font-normal"
      >
        {items.map((item) => (
          <option value={item.value} key={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </label>
  );
};
