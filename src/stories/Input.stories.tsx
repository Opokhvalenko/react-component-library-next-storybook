import type { Meta, StoryObj } from "@storybook/react";
import { type ComponentProps, type ReactNode, useState } from "react";
import Input from "../components/Input/Input";

type InputComponentProps = ComponentProps<typeof Input>;

const meta: Meta<typeof Input> = {
  title: "Form/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    value: { control: false },
    onChange: { control: false },
    type: {
      control: "radio",
      options: ["text", "password", "number", "email"],
    },
  },
  args: {
    label: "Label",
    type: "text",
    clearable: true,
    placeholder: "Enter text...",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

function StatefulInput(props: InputComponentProps & { children?: ReactNode }) {
  const [value, setValue] = useState(props.value ?? "");

  return (
    <div style={{ maxWidth: 360, width: "100%" }}>
      <Input
        {...props}
        value={value}
        onChange={(next) => {
          setValue(next);
        }}
      />
    </div>
  );
}

export const Text: Story = {
  args: {
    label: "Text input",
    type: "text",
    placeholder: "Type your name",
  },
  render: (args) => <StatefulInput {...args} />,
};

export const Password: Story = {
  args: {
    label: "Password",
    type: "password",
    placeholder: "Enter password",
  },
  render: (args) => <StatefulInput {...args} />,
};

export const Number: Story = {
  args: {
    label: "Age",
    type: "number",
    placeholder: "Enter age",
  },
  render: (args) => <StatefulInput {...args} />,
};

export const TextNotClearable: Story = {
  args: {
    label: "Text (no clear button)",
    type: "text",
    clearable: false,
    placeholder: "Regular text input",
  },
  render: (args) => <StatefulInput {...args} />,
};

export const WithError: Story = {
  args: {
    label: "Email",
    type: "email",
    placeholder: "Enter email",
    error: "Invalid email",
  },
  render: (args) => <StatefulInput {...args} />,
};
