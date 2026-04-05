import { useState, useMemo } from "react";
import { AppLayout } from "@/components/AppLayout";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, CheckCircle2, XCircle, MinusCircle } from "lucide-react";

interface Course {
  code: string;
  name: string;
  credits: number;
  grade: string;
  status: "pass" | "fail" | "pending";
}

const mockCourses: Record<string, Course[]> = {
  "year-1": [
    { code: "CS101", name: "Introduction to Computing", credits: 3, grade: "A", status: "pass" },
    { code: "CS102", name: "Programming Fundamentals", credits: 4, grade: "B+", status: "pass" },
    { code: "MA101", name: "Calculus I", credits: 3, grade: "C", status: "pass" },
    { code: "EN101", name: "Academic English", credits: 2, grade: "B", status: "pass" },
    { code: "PH101", name: "Physics for Engineers", credits: 3, grade: "D", status: "fail" },
  ],
  "year-2": [
    { code: "CS201", name: "Data Structures & Algorithms", credits: 4, grade: "A-", status: "pass" },
    { code: "CS202", name: "Database Systems", credits: 3, grade: "B", status: "pass" },
    { code: "CS203", name: "Object-Oriented Programming", credits: 4, grade: "B+", status: "pass" },
    { code: "MA201", name: "Discrete Mathematics", credits: 3, grade: "C+", status: "pass" },
  ],
  "year-3": [
    { code: "CS301", name: "Software Engineering", credits: 4, grade: "A", status: "pass" },
    { code: "CS302", name: "Computer Networks", credits: 3, grade: "B-", status: "pass" },
    { code: "CS303", name: "Operating Systems", credits: 4, grade: "-", status: "pending" },
    { code: "CS304", name: "Human-Computer Interaction", credits: 3, grade: "-", status: "pending" },
    { code: "CS305", name: "Web Development", credits: 3, grade: "F", status: "fail" },
  ],
  "year-4": [
    { code: "CS401", name: "Final Year Project", credits: 8, grade: "-", status: "pending" },
    { code: "CS402", name: "Machine Learning", credits: 4, grade: "-", status: "pending" },
  ],
  repeat: [
    { code: "PH101", name: "Physics for Engineers", credits: 3, grade: "-", status: "pending" },
    { code: "CS305", name: "Web Development", credits: 3, grade: "-", status: "pending" },
  ],
};

const yearLabels: Record<string, string> = {
  "year-1": "Year 1",
  "year-2": "Year 2",
  "year-3": "Year 3",
  "year-4": "Year 4",
  repeat: "Repeat",
};

const StatusBadge = ({ status }: { status: Course["status"] }) => {
  const config = {
    pass: { icon: CheckCircle2, label: "Pass", className: "bg-success/15 text-success" },
    fail: { icon: XCircle, label: "Fail", className: "bg-destructive/15 text-destructive" },
    pending: { icon: MinusCircle, label: "Pending", className: "bg-warning/15 text-warning-foreground" },
  };
  const { icon: Icon, label, className } = config[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${className}`}>
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {label}
    </span>
  );
};

const RegistrationPage = () => {
  const { year } = useParams<{ year: string }>();
  const courses = mockCourses[year || "year-1"] || [];
  const label = yearLabels[year || "year-1"] || "Registration";
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search) return courses;
    const q = search.toLowerCase();
    return courses.filter(
      (c) => c.code.toLowerCase().includes(q) || c.name.toLowerCase().includes(q)
    );
  }, [courses, search]);

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-heading text-3xl font-bold text-foreground"
        >
          {label} Registration
        </motion.h1>

        {/* Search */}
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
          <input
            type="search"
            placeholder="Search by code or name…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 pl-10 pr-4 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-shadow text-sm"
            aria-label="Search courses"
          />
        </div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border rounded-xl shadow-sm overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm" role="table">
              <thead>
                <tr className="bg-secondary">
                  <th className="text-left px-5 py-3 font-semibold text-foreground">Course Code</th>
                  <th className="text-left px-5 py-3 font-semibold text-foreground">Course Name</th>
                  <th className="text-center px-5 py-3 font-semibold text-foreground">Credits</th>
                  <th className="text-center px-5 py-3 font-semibold text-foreground">Grade</th>
                  <th className="text-center px-5 py-3 font-semibold text-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-muted-foreground">
                      No courses found matching your search.
                    </td>
                  </tr>
                ) : (
                  filtered.map((course, i) => (
                    <tr
                      key={course.code}
                      className={`border-t border-border hover:bg-secondary/50 transition-colors ${
                        i % 2 === 1 ? "bg-muted/30" : ""
                      }`}
                    >
                      <td className="px-5 py-3 font-medium text-foreground">{course.code}</td>
                      <td className="px-5 py-3 text-foreground">{course.name}</td>
                      <td className="px-5 py-3 text-center text-muted-foreground">{course.credits}</td>
                      <td className="px-5 py-3 text-center font-medium text-foreground">{course.grade}</td>
                      <td className="px-5 py-3 text-center">
                        <StatusBadge status={course.status} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default RegistrationPage;
