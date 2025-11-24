import type { Meta, StoryObj } from "@storybook/react";
import type { ReactNode } from "react";
import { Controller, useForm } from "react-hook-form";
import Input from "../components/Input/Input";

type FormValues = {
  email: string;
};

const meta: Meta<typeof Input> = {
  title: "Form/Input with React Hook Form",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

function StoryContainer({ children }: { children: ReactNode }) {
  return (
    <div style={{ maxWidth: 360, width: "100%" }}>{children}</div>
  );
}

function BasicRHFExample() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { email: "" },
  });

 const onSubmit = (data: FormValues) => {
  // In Storybook we don't actually submit anywhere,
  // we just use the value to satisfy lint rules.
  void data;
};

  return (
    <StoryContainer>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", gap: 12 }}
      >
        <Controller
          control={control}
          name="email"
          rules={{ required: "Email is required" }}
          render={({ field, fieldState }) => (
            <Input
              label="Email"
              type="email"
              value={field.value}
              onChange={field.onChange}
              error={fieldState.error?.message}
              placeholder="you@example.com"
              clearable
            />
          )}
        />

        <button type="submit">Submit</button>
      </form>
    </StoryContainer>
  );
}

export const BasicRHF: Story = {
  render: () => <BasicRHFExample />,
};