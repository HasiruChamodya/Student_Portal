import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  RotateCcw,
  FileCheck,
  GraduationCap,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "Year 1 Registration", path: "/registration/year-1", icon: BookOpen },
  { label: "Year 2 Registration", path: "/registration/year-2", icon: BookOpen },
  { label: "Year 3 Registration", path: "/registration/year-3", icon: BookOpen },
  { label: "Year 4 Registration", path: "/registration/year-4", icon: BookOpen },
  { label: "Repeat Registration", path: "/registration/repeat", icon: RotateCcw },
  { label: "Exam Admission", path: "/exam-admission", icon: FileCheck },
];

export const AppSidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "flex flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-300 shrink-0",
        collapsed ? "w-16" : "w-64"
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Brand */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-sidebar-border">
        <GraduationCap className="h-7 w-7 text-sidebar-primary shrink-0" />
        {!collapsed && (
          <span className="font-heading text-lg font-bold text-sidebar-primary-foreground whitespace-nowrap">
            UniPortal
          </span>
        )}
      </div>

      {/* Nav Links */}
      <nav className="flex-1 py-4 space-y-1 px-2 overflow-y-auto">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                "focus-visible:outline-2 focus-visible:outline-sidebar-primary",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground"
              )}
              aria-current={active ? "page" : undefined}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-center h-12 border-t border-sidebar-border hover:bg-sidebar-accent transition-colors"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <ChevronLeft
          className={cn("h-5 w-5 transition-transform", collapsed && "rotate-180")}
          aria-hidden="true"
        />
      </button>
    </aside>
  );
};
