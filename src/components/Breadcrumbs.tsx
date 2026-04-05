import { useLocation, Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

const routeLabels: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/registration/year-1": "Year 1 Registration",
  "/registration/year-2": "Year 2 Registration",
  "/registration/year-3": "Year 3 Registration",
  "/registration/year-4": "Year 4 Registration",
  "/registration/repeat": "Repeat Registration",
  "/exam-admission": "Exam Admission",
};

export const Breadcrumbs = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  const crumbs: { label: string; path: string }[] = [];
  let accumulated = "";
  for (const seg of pathSegments) {
    accumulated += `/${seg}`;
    const label = routeLabels[accumulated] || seg.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    crumbs.push({ label, path: accumulated });
  }

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted-foreground">
      <Link to="/dashboard" className="flex items-center gap-1 hover:text-foreground transition-colors" aria-label="Home">
        <Home className="h-4 w-4" />
      </Link>
      {crumbs.map((crumb, i) => (
        <span key={crumb.path} className="flex items-center gap-1.5">
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          {i === crumbs.length - 1 ? (
            <span className="font-medium text-foreground" aria-current="page">{crumb.label}</span>
          ) : (
            <Link to={crumb.path} className="hover:text-foreground transition-colors">{crumb.label}</Link>
          )}
        </span>
      ))}
    </nav>
  );
};
