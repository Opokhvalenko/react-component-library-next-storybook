export type SidebarMenuItem = {
  id: string;
  label: string;
  onClick?: () => void;
  children?: SidebarMenuItem[];
};

export interface SidebarMenuProps {
  isOpen: boolean;
  onClose: () => void;
  items: SidebarMenuItem[];
  title?: string;
}