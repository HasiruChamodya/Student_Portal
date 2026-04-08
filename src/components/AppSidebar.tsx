import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  RotateCcw,
  FileCheck,
  GraduationCap,
  ChevronLeft,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

const navItems = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "Year 1", path: "/registration/year-1", icon: BookOpen },
  { label: "Year 2", path: "/registration/year-2", icon: BookOpen },
  { label: "Year 3", path: "/registration/year-3", icon: BookOpen },
  { label: "Year 4", path: "/registration/year-4", icon: BookOpen },
  // { label: "Repeat Modules", path: "/registration/repeat", icon: RotateCcw },
  { label: "Exam Admission", path: "/exam-admission", icon: FileCheck },
];

interface AppSidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export const AppSidebar = ({ mobileOpen = false, onMobileClose }: AppSidebarProps) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  // Close mobile drawer on route change
  useEffect(() => {
    onMobileClose?.();
  }, [location.pathname]);

  // Prevent body scroll when drawer is open on mobile
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const sidebarContent = (
    <aside
      className={cn(
        "flex flex-col h-full bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-300",
        // Desktop: collapsible width; Mobile: full sidebar inside drawer
        "w-64 md:shrink-0",
        collapsed ? "md:w-16" : "md:w-64"
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Brand */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-sidebar-border">
        <GraduationCap className="h-7 w-7 text-sidebar-primary shrink-0" />
        {!collapsed && (
          <span className="font-heading text-lg font-bold text-sidebar-primary-foreground whitespace-nowrap">
            Student Portal
          </span>
        )}
        {/* Mobile close button */}
        <button
          onClick={onMobileClose}
          className="ml-auto md:hidden text-sidebar-foreground hover:text-sidebar-accent-foreground"
          aria-label="Close navigation"
        >
          <X className="h-5 w-5" />
        </button>
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

      {/* Collapse toggle — desktop only */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="hidden md:flex items-center justify-center h-12 border-t border-sidebar-border hover:bg-sidebar-accent transition-colors"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <ChevronLeft
          className={cn("h-5 w-5 transition-transform", collapsed && "rotate-180")}
          aria-hidden="true"
        />
      </button>
    </aside>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden md:flex flex-col shrink-0">
        {sidebarContent}
      </div>

      {/* Mobile drawer overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={onMobileClose}
            aria-hidden="true"
          />
          {/* Drawer panel */}
          <div className="relative z-10 flex flex-col w-72 max-w-[85vw] h-full shadow-xl">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};