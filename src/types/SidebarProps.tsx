export interface SidebarProps {
    isExpanded: boolean;
    setIsExpanded: (value: boolean) => void;
    setSelectedPage: (page: string) => void;
  }