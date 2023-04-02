import React from "react";
import type {
  RegisterOptions,
  UseFormRegister,
  Path,
  FieldValues,
} from "react-hook-form";
import { TextInput, type InputProps } from "./text-input";

export type FormInputProps<TFormValues extends FieldValues> = {
  name: Path<TFormValues>;
  rules?: RegisterOptions;
  register?: UseFormRegister<TFormValues>;
} & Omit<InputProps, "name">;

export const FormInput = <TFormValues extends Record<string, unknown>>({
  name,
  register,
  rules,
  ...props
}: FormInputProps<TFormValues>): JSX.Element => {
  return (
    <TextInput
      name={name}
      {...props}
      {...(register && register(name, rules))}
    />
  );
};
