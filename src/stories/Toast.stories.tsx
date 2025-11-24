import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Toast, { type ToastProps } from "../components/Toast/Toast";

const meta: Meta<typeof Toast> = {
  title: "Feedback/Toast",
  component: Toast,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    message: "This is a toast message",
    type: "info",
    duration: 3000,
    showCloseButton: true,
  },
  argTypes: {
    type: {
      control: "radio",
      options: ["info", "success", "error", "warning"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

function ToastDemo(props: ToastProps) {
  const [open, setOpen] = useState(true);

  return (
    <div style={{ minHeight: "60vh", padding: 16 }}>
      <button type="button" onClick={() => setOpen(true)}>
        Show toast
      </button>

      {open && (
        <Toast
          {...props}
          onClose={() => {
            setOpen(false);
          }}
        />
      )}
    </div>
  );
}

export const Info: Story = {
  args: {
    type: "info",
    message: "Information saved successfully.",
  },
  render: (args) => <ToastDemo {...args} />,
};

export const Success: Story = {
  args: {
    type: "success",
    message: "Profile updated successfully.",
  },
  render: (args) => <ToastDemo {...args} />,
};

export const Error: Story = {
  args: {
    type: "error",
    message: "Something went wrong. Please try again.",
  },
  render: (args) => <ToastDemo {...args} />,
};

export const WarningLongDuration: Story = {
  args: {
    type: "warning",
    message: "Be careful with this action.",
    duration: 6000,
  },
  render: (args) => <ToastDemo {...args} />,
};