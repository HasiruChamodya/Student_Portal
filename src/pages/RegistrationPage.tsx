import { useMemo } from "react";
import { AppLayout } from "@/components/AppLayout";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, MinusCircle, Clock, FileWarning, ArrowRight } from "lucide-react";

// ─── Grade / GPA helpers ───────────────────────────────────────────────────

const gradePoints: Record<string, number> = {
  "A+": 4.0, "A": 4.0, "A-": 3.7,
  "B+": 3.3, "B": 3.0, "B-": 2.7,
  "C+": 2.3, "C": 2.0, "C-": 1.7,
  "D+": 1.3, "D": 1.0,
  "F":  0.0,
};

function calcGPA(courses: Course[]): number | null {
  const gradeable = courses.filter(
    (c) => c.grade !== "-" && gradePoints[c.grade] !== undefined
  );
  if (!gradeable.length) return null;
  const pts = gradeable.reduce((s, c) => s + gradePoints[c.grade] * c.credits, 0);
  const cr  = gradeable.reduce((s, c) => s + c.credits, 0);
  return cr === 0 ? null : pts / cr;
}

function fmtGPA(gpa: number | null) { return gpa === null ? "—" : gpa.toFixed(2); }

function gpaColor(gpa: number | null) {
  if (gpa === null) return "text-muted-foreground";
  if (gpa >= 3.7)  return "text-success";
  if (gpa >= 3.0)  return "text-primary";
  if (gpa >= 2.0)  return "text-warning-foreground";
  return "text-destructive";
}

function gpaBg(gpa: number | null) {
  if (gpa === null) return "bg-muted";
  if (gpa >= 3.7)  return "bg-success";
  if (gpa >= 3.0)  return "bg-primary";
  if (gpa >= 2.0)  return "bg-warning";
  return "bg-destructive";
}

function gpaPct(gpa: number | null) {
  return gpa === null ? 0 : Math.min((gpa / 4.0) * 100, 100);
}

// ─── Data types ────────────────────────────────────────────────────────────

interface Course {
  code: string;
  name: string;
  credits: number;
  grade: string;
  status: "pass" | "fail" | "pending";
  repeated?: boolean;
}

interface SemesterData {
  courses: Course[];
  repeats: Course[];
}

interface YearData {
  sem1: SemesterData;
  sem2: SemesterData;
}

// ─── Mock data ─────────────────────────────────────────────────────────────

const mockData: Record<string, YearData> = {
  "year-1": {
    sem1: {
      courses: [
        { code: "INTE 1101", name: "Programming Fundamentals",  credits: 3, grade: "B+", status: "pass" },
        { code: "INTE 1102", name: "Introduction to Computing", credits: 2, grade: "A",  status: "pass" },
        { code: "PMAT 1103", name: "Mathematics I",             credits: 3, grade: "C+", status: "pass" },
        { code: "INTE 1104", name: "English for Professionals", credits: 2, grade: "B",  status: "pass" },
        { code: "MGTE 1105", name: "Optimization",              credits: 3, grade: "D",  status: "fail" },
      ],
      repeats: [
        { code: "MGTE 1105", name: "Optimization", credits: 3, grade: "C", status: "pass", repeated: true },
      ],
    },
    sem2: {
      courses: [
        { code: "INTE 1201", name: "Computer Hardware",     credits: 3, grade: "B",  status: "pass" },
        { code: "INTE 1202", name: "Web Technologies",      credits: 3, grade: "A-", status: "pass" },
        { code: "PMAT 1203", name: "Statistics I",          credits: 3, grade: "C",  status: "pass" },
        { code: "INTE 1204", name: "Digital Systems",       credits: 2, grade: "B+", status: "pass" },
        { code: "MGTE 1205", name: "Communication Skills",  credits: 2, grade: "A",  status: "pass" },
      ],
      repeats: [],
    },
  },
  "year-2": {
    sem1: {
      courses: [
        { code: "INTE 2101", name: "Data Structures & Algorithms", credits: 4, grade: "A-", status: "pass" },
        { code: "INTE 2102", name: "Database Systems",             credits: 3, grade: "B",  status: "pass" },
        { code: "PMAT 2103", name: "Discrete Mathematics",         credits: 3, grade: "C+", status: "pass" },
        { code: "INTE 2104", name: "Object-Oriented Programming",  credits: 4, grade: "B+", status: "pass" },
        { code: "MGTE 2105", name: "Project Planning",             credits: 2, grade: "F",  status: "fail" },
      ],
      repeats: [
        { code: "MGTE 2105", name: "Project Planning", credits: 2, grade: "-", status: "pending", repeated: true },
      ],
    },
    sem2: {
      courses: [
        { code: "INTE 2201", name: "Operating Systems",     credits: 4, grade: "B-", status: "pass" },
        { code: "INTE 2202", name: "Computer Networks",     credits: 3, grade: "B",  status: "pass" },
        { code: "PMAT 2203", name: "Numerical Methods",     credits: 3, grade: "A",  status: "pass" },
        { code: "INTE 2204", name: "Software Architecture", credits: 3, grade: "C+", status: "pass" },
        { code: "INTE 2205", name: "Professional Ethics",   credits: 2, grade: "A-", status: "pass" },
      ],
      repeats: [],
    },
  },
  "year-3": {
    sem1: {
      courses: [
        { code: "INTE 3101", name: "Software Engineering",           credits: 4, grade: "A",  status: "pass" },
        { code: "INTE 3102", name: "Human-Computer Interaction",     credits: 3, grade: "B-", status: "pass" },
        { code: "INTE 3103", name: "Information Security",           credits: 3, grade: "B+", status: "pass" },
        { code: "MGTE 3104", name: "Project Management",             credits: 3, grade: "F",  status: "fail" },
        { code: "INTE 3105", name: "Mobile Application Development", credits: 3, grade: "A-", status: "pass" },
      ],
      repeats: [
        { code: "MGTE 3104", name: "Project Management", credits: 3, grade: "-", status: "pending", repeated: true },
      ],
    },
    sem2: {
      courses: [
        { code: "INTE 3201", name: "Cloud Computing",     credits: 3, grade: "-", status: "pending" },
        { code: "INTE 3202", name: "Artificial Intelligence", credits: 4, grade: "-", status: "pending" },
        { code: "INTE 3203", name: "Advanced Databases",  credits: 3, grade: "-", status: "pending" },
        { code: "MGTE 3204", name: "Entrepreneurship",    credits: 2, grade: "-", status: "pending" },
        { code: "INTE 3205", name: "Research Methods",    credits: 2, grade: "-", status: "pending" },
      ],
      repeats: [],
    },
  },
  "year-4": {
    // Empty data for Year 4 to represent unregistered status
    sem1: { courses: [], repeats: [] },
    sem2: { courses: [], repeats: [] },
  },
};

const repeatData: YearData = {
  sem1: {
    courses: [],
    repeats: [
      { code: "MGTE 1105", name: "Optimization",    credits: 3, grade: "C",  status: "pass",    repeated: true },
      { code: "MGTE 2105", name: "Project Planning",credits: 2, grade: "-",  status: "pending", repeated: true },
    ],
  },
  sem2: {
    courses: [],
    repeats: [
      { code: "MGTE 3104", name: "Project Management", credits: 3, grade: "-", status: "pending", repeated: true },
    ],
  },
};

const yearLabels: Record<string, string> = {
  "year-1": "Year 1", "year-2": "Year 2",
  "year-3": "Year 3", "year-4": "Year 4",
  repeat: "Repeat Modules",
};

// ─── Sub-components ────────────────────────────────────────────────────────

const StatusBadge = ({ status }: { status: Course["status"] }) => {
  const config = {
    pass:    { icon: CheckCircle2, label: "Pass",    className: "bg-success/15 text-success" },
    fail:    { icon: XCircle,      label: "Fail",    className: "bg-destructive/15 text-destructive" },
    pending: { icon: MinusCircle,  label: "Pending", className: "bg-warning/15 text-warning-foreground" },
  };
  const { icon: Icon, label, className } = config[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${className}`}>
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {label}
    </span>
  );
};

// ── GPA Summary Card ────────────────────────────────────────────────────────
interface GPASummaryProps {
  sem1Courses: Course[];
  sem2Courses: Course[];
  yearKey: string;
}

const GPASummaryCard = ({ sem1Courses, sem2Courses, yearKey }: GPASummaryProps) => {
  const isYear4 = yearKey === "year-4";

  const sem1GPA = useMemo(() => calcGPA(sem1Courses), [sem1Courses]);
  const sem2GPA = useMemo(() => calcGPA(sem2Courses), [sem2Courses]);
  const yearGPA = useMemo(
    () => calcGPA([...sem1Courses, ...sem2Courses]),
    [sem1Courses, sem2Courses]
  );

  // Updated to reflect the Unregistered status instead of "Yet to Take"
  if (isYear4) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="bg-card border border-border rounded-xl p-4 md:p-5 shadow-sm flex items-center gap-3 text-muted-foreground"
      >
        <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center shrink-0">
          <FileWarning className="h-4 w-4 text-muted-foreground" />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">GPA Not Available</p>
          <p className="text-xs mt-0.5">
            You must register for modules before GPA can be calculated for this academic year.
          </p>
        </div>
      </motion.div>
    );
  }

  const stats = [
    { label: "Semester 1 GPA", gpa: sem1GPA },
    { label: "Semester 2 GPA", gpa: sem2GPA },
    { label: "Year GPA",       gpa: yearGPA, highlight: true },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 }}
      className="bg-card border border-border rounded-xl p-4 md:p-5 shadow-sm"
    >
      <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
        GPA Summary
      </h2>

      <div className="grid grid-cols-3 gap-3 md:gap-6">
        {stats.map(({ label, gpa, highlight }) => (
          <div key={label} className={`flex flex-col gap-2 ${highlight ? "border-l border-border pl-3 md:pl-5" : ""}`}>
            <span className="text-xs text-muted-foreground leading-tight">{label}</span>
            <span className={`font-heading text-2xl md:text-3xl font-bold tabular-nums ${gpaColor(gpa)}`}>
              {fmtGPA(gpa)}
            </span>
            {/* Progress bar */}
            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${gpaPct(gpa)}%` }}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                className={`h-full rounded-full ${gpaBg(gpa)}`}
              />
            </div>
            <span className="text-xs text-muted-foreground">/ 4.0</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

// ── Course Table ─────────────────────────────────────────────────────────────

interface CourseTableProps {
  courses: Course[];
  caption?: string;
  isRepeat?: boolean;
}

const CourseTable = ({ courses, caption, isRepeat = false }: CourseTableProps) => {
  if (courses.length === 0) return null;
  return (
    <div className={`rounded-xl shadow-sm overflow-hidden border ${isRepeat ? "border-warning/40" : "border-border"}`}>
      {caption && (
        <div className={`px-4 md:px-5 py-3 text-sm font-semibold ${isRepeat ? "bg-warning/10 text-warning-foreground border-b border-warning/30" : "bg-secondary text-foreground border-b border-border"}`}>
          {isRepeat && <span className="mr-2">🔁</span>}
          {caption}
        </div>
      )}
      <div className="overflow-x-auto bg-card">
        <table className="w-full text-sm min-w-[480px]" role="table">
          <thead>
            <tr className={isRepeat ? "bg-warning/5" : "bg-secondary/60"}>
              <th className="text-left px-3 md:px-5 py-3 font-semibold text-foreground whitespace-nowrap">Code</th>
              <th className="text-left px-3 md:px-5 py-3 font-semibold text-foreground">Module Name</th>
              <th className="text-center px-3 md:px-5 py-3 font-semibold text-foreground whitespace-nowrap">Cr.</th>
              <th className="text-center px-3 md:px-5 py-3 font-semibold text-foreground">Grade</th>
              <th className="text-center px-3 md:px-5 py-3 font-semibold text-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, i) => (
              <tr
                key={`${course.code}-${i}`}
                className={`border-t ${isRepeat ? "border-warning/20 hover:bg-warning/5" : "border-border hover:bg-secondary/50"} transition-colors ${i % 2 === 1 ? "bg-muted/30" : ""}`}
              >
                <td className="px-3 md:px-5 py-3 font-medium text-foreground whitespace-nowrap">{course.code}</td>
                <td className="px-3 md:px-5 py-3 text-foreground">{course.name}</td>
                <td className="px-3 md:px-5 py-3 text-center text-muted-foreground">{course.credits}</td>
                <td className="px-3 md:px-5 py-3 text-center font-medium text-foreground">{course.grade}</td>
                <td className="px-3 md:px-5 py-3 text-center">
                  <StatusBadge status={course.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ── Semester Section ──────────────────────────────────────────────────────────

interface SemesterSectionProps {
  semesterLabel: string;
  data: SemesterData;
  isRepeatPage?: boolean;
  delay?: number;
}

const SemesterSection = ({ semesterLabel, data, isRepeatPage = false, delay = 0 }: SemesterSectionProps) => {
  const hasRepeats = data.repeats.length > 0;
  const hasCourses = data.courses.length > 0;
  
  if (!hasCourses && !hasRepeats) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="space-y-4"
    >
      <h2 className="font-heading text-lg font-bold text-foreground flex items-center gap-2">
        <span className="h-6 w-1 rounded-full bg-primary inline-block" />
        {semesterLabel}
      </h2>

      {hasCourses && !isRepeatPage && <CourseTable courses={data.courses} />}

      {hasRepeats && (
        <CourseTable
          courses={data.repeats}
          caption={isRepeatPage ? semesterLabel : `Repeat Modules — ${semesterLabel}`}
          isRepeat
        />
      )}

      {isRepeatPage && !hasRepeats && (
        <p className="text-sm text-muted-foreground pl-3">No repeat modules for this semester.</p>
      )}
    </motion.div>
  );
};

// ── Empty State for Unregistered Year ─────────────────────────────────────────

const UnregisteredState = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.15 }}
      className="flex flex-col items-center justify-center p-8 md:p-12 mt-8 bg-card border-2 border-dashed border-border rounded-xl text-center"
    >
      <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
        <FileWarning className="h-8 w-8 text-primary" aria-hidden="true" />
      </div>
      <h3 className="font-heading text-xl font-bold text-foreground mb-2">
        Not Yet Registered
      </h3>
      <p className="text-muted-foreground text-sm max-w-md mx-auto mb-6">
        You are currently viewing Year 4, but you have not registered for any modules for this academic year yet. Registration is required to view your timetable and track grades.
      </p>
      <button 
        onClick={() => alert("Navigate to Registration Flow")}
        className="inline-flex items-center gap-2 h-11 px-6 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-opacity active:scale-95"
      >
        Register for Year 4
        <ArrowRight className="h-4 w-4" />
      </button>
    </motion.div>
  );
};

// ── Page ──────────────────────────────────────────────────────────────────────

const RegistrationPage = () => {
  const { year } = useParams<{ year: string }>();
  const label = yearLabels[year || "year-1"] || "Registration";
  const isRepeatPage = year === "repeat";
  const isUnregisteredYear = year === "year-4";

  const data: YearData = useMemo(() => {
    if (isRepeatPage) return repeatData;
    return mockData[year || "year-1"] || mockData["year-1"];
  }, [year, isRepeatPage]);

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto space-y-6 md:space-y-8">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-heading text-2xl md:text-3xl font-bold text-foreground"
        >
          {label}
        </motion.h1>

        {/* GPA Summary — year pages only, not repeat */}
        {!isRepeatPage && (
          <GPASummaryCard
            sem1Courses={data.sem1.courses}
            sem2Courses={data.sem2.courses}
            yearKey={year || "year-1"}
          />
        )}

        {/* Content Area */}
        {isRepeatPage ? (
          <div className="space-y-8">
            <SemesterSection semesterLabel="Semester 1" data={data.sem1} isRepeatPage delay={0.1} />
            <SemesterSection semesterLabel="Semester 2" data={data.sem2} isRepeatPage delay={0.2} />
          </div>
        ) : isUnregisteredYear ? (
          <UnregisteredState />
        ) : (
          <div className="space-y-10">
            <SemesterSection semesterLabel="Semester 1" data={data.sem1} delay={0.15} />
            <SemesterSection semesterLabel="Semester 2" data={data.sem2} delay={0.25} />
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default RegistrationPage;