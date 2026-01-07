import React from "react";
import { FileText, BookOpen, BookMarked, Newspaper } from "lucide-react";

type PublicationType = "articulo" | "libro" | "capitulo" | "divulgacion" | "";

interface TabConfig {
  value: PublicationType;
  label: string;
  icon: React.ReactNode;
}

interface PublicationCategoryTabsProps {
  activeTab: PublicationType;
  onTabChange: (tab: PublicationType) => void;
  counts?: Record<string, number>;
}

const tabs: TabConfig[] = [
  { value: "", label: "Todos", icon: <FileText className="w-4 h-4" /> },
  {
    value: "articulo",
    label: "Artículos científicos",
    icon: <FileText className="w-4 h-4" />,
  },
  { value: "libro", label: "Libros", icon: <BookOpen className="w-4 h-4" /> },
  {
    value: "capitulo",
    label: "Capítulos de libro",
    icon: <BookMarked className="w-4 h-4" />,
  },
  {
    value: "divulgacion",
    label: "Divulgación",
    icon: <Newspaper className="w-4 h-4" />,
  },
];

const PublicationCategoryTabs: React.FC<PublicationCategoryTabsProps> = ({
  activeTab,
  onTabChange,
  counts,
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => {
        const count = counts?.[tab.value || "all"] ?? 0;
        const isActive = activeTab === tab.value;

        return (
          <button
            key={tab.value}
            onClick={() => onTabChange(tab.value)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              isActive
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {counts && (
              <span
                className={`ml-1 px-1.5 py-0.5 rounded-full text-xs ${
                  isActive ? "bg-white/20" : "bg-background"
                }`}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default PublicationCategoryTabs;
