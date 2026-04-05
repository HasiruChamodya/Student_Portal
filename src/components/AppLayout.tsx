import { ReactNode } from "react";
import { AppSidebar } from "./AppSidebar";
import { TopBar } from "./TopBar";
import { Breadcrumbs } from "./Breadcrumbs";

export const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen w-full">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6 shrink-0">
          <Breadcrumbs />
          <TopBar />
        </header>
        <main id="main-content" className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
