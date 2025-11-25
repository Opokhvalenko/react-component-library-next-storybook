import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import SidebarMenu from "../components/SidebarMenu/SidebarMenu";
import type { SidebarMenuItem } from "../components/SidebarMenu/SidebarMenu.types";

const basicItems: SidebarMenuItem[] = [
  { id: "home", label: "Home" },
  { id: "dashboard", label: "Dashboard" },
  { id: "settings", label: "Settings" },
];

const nestedItems: SidebarMenuItem[] = [
  {
    id: "projects",
    label: "Projects",
    children: [
      { id: "project-1", label: "Project Alpha" },
      { id: "project-2", label: "Project Beta" },
    ],
  },
  {
    id: "account",
    label: "Account",
    children: [
      { id: "profile", label: "Profile" },
      {
        id: "security",
        label: "Security",
        children: [
          { id: "password", label: "Password" },
          { id: "sessions", label: "Active sessions" },
        ],
      },
    ],
  },
];

const meta: Meta<typeof SidebarMenu> = {
  title: "Navigation/SidebarMenu",
  component: SidebarMenu,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    title: "Menu",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

function SidebarDemo({
  items,
  title,
}: {
  items: SidebarMenuItem[];
  title?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ minHeight: "60vh", padding: 16 }}>
      <button type="button" onClick={() => setOpen(true)}>
        Open sidebar
      </button>

      <SidebarMenu
        isOpen={open}
        onClose={() => setOpen(false)}
        items={items}
        title={title}
      />
    </div>
  );
}

export const SingleLevel: Story = {
  args: {
    title: "Main navigation",
  },
  render: (args) => <SidebarDemo items={basicItems} title={args.title} />,
};

export const Nested: Story = {
  args: {
    title: "Project settings",
  },
  render: (args) => <SidebarDemo items={nestedItems} title={args.title} />,
};
