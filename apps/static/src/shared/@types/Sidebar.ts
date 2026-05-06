export interface SidebarItemProps {
    icon: React.ElementType;
    label: string;
    active?: boolean;
    hasChevron?: boolean;
    isShortcut?: boolean;
}

export interface SidebarSectionProps {
    title: string;
    children: React.ReactNode;
}
