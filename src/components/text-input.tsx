import { forwardRef } from "react";

export type InputProps = {
  id: string;
  label: string;
  name: string;
};

export const TextInput = forwardRef<HTMLInputElement, InputProps>(
  ({ id, label, name, ...rest }: InputProps, ref) => {
    return (
      <label htmlFor="title" className="block font-semibold">
        {label}
        <input
          id={id}
          name={name}
          ref={ref}
          type="text"
          {...rest}
          className="block w-full rounded-md border border-gray-900 border-opacity-25 py-1.5 px-2.5 font-normal"
        />
      </label>
    );
  }
);

TextInput.displayName = "TextInput";
