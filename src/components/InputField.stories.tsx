// src/components/InputField.stories.tsx
import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/react-webpack5";
import InputField, { InputFieldProps } from "./InputField";

export default {
  title: "Components/InputField",
  component: InputField,
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    helperText: { control: "text" },
    errorMessage: { control: "text" },
    disabled: { control: "boolean" },
    invalid: { control: "boolean" },
    loading: { control: "boolean" },
    clearable: { control: "boolean" },
    variant: {
      control: { type: "select" },
      options: ["filled", "outlined", "ghost"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
  },
} as Meta<typeof InputField>;

// Template to manage input state
const Template: StoryFn<typeof InputField> = (args: InputFieldProps) => {
  const [value, setValue] = useState(args.value || "");

  return (
    <InputField
      {...args}
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
    />
  );
};

// Default story
export const Default = Template.bind({});
Default.args = {
  label: "Name",
  placeholder: "Enter your name",
  helperText: "This is a helper text",
  value: "",
  clearable: true,
  variant: "outlined",
  size: "md",
  loading: false,
  disabled: false,
  invalid: false,
};

// Story with error
export const WithError = Template.bind({});
WithError.args = {
  label: "Email",
  placeholder: "Enter your email",
  value: "",
  invalid: true,
  errorMessage: "Invalid email address",
  clearable: true,
  variant: "outlined",
  size: "md",
};

// Story with loading
export const Loading = Template.bind({});
Loading.args = {
  label: "Username",
  placeholder: "Loading...",
  value: "",
  loading: true,
  clearable: false,
  variant: "outlined",
  size: "md",
};

// Story with password toggle
export const PasswordField = Template.bind({});
PasswordField.args = {
  label: "Password",
  placeholder: "Enter password",
  value: "",
  clearable: true,
  size: "md",
  variant: "outlined",
};
