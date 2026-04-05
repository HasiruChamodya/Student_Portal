import { useAuth } from "@/contexts/AuthContext";
import { LogOut, User, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export const TopBar = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (!user) return null;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary transition-colors"
        aria-expanded={open}
        aria-haspopup="true"
      >
        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
          <User className="h-4 w-4 text-primary-foreground" aria-hidden="true" />
        </div>
        <div className="text-left hidden sm:block">
          <p className="text-sm font-medium text-foreground leading-tight">{user.name}</p>
          <p className="text-xs text-muted-foreground">{user.id}</p>
        </div>
        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-56 bg-card border border-border rounded-lg shadow-lg py-1 z-50 animate-fade-in" role="menu">
          <div className="px-4 py-3 border-b border-border">
            <p className="text-sm font-medium text-foreground">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.id}</p>
            <p className="text-xs text-muted-foreground">{user.academicYear}</p>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-destructive hover:bg-secondary transition-colors"
            role="menuitem"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};
