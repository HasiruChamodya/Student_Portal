import { useMemo } from "react";
import { AppLayout } from "@/components/AppLayout";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, MinusCircle } from "lucide-react";

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

const mockData: Record<string, YearData> = {
  "year-1": {
    sem1: {
      courses: [
        { code: "INTE 1101", name: "Programming Fundamentals", credits: 3, grade: "B+", status: "pass" },
        { code: "INTE 1102", name: "Introduction to Computing", credits: 2, grade: "A", status: "pass" },
        { code: "PMAT 1103", name: "Mathematics I", credits: 3, grade: "C+", status: "pass" },
        { code: "INTE 1104", name: "English for Professionals", credits: 2, grade: "B", status: "pass" },
        { code: "MGTE 1105", name: "Optimization", credits: 3, grade: "D", status: "fail" },
      ],
      repeats: [
        { code: "MGTE 1105", name: "Optimization", credits: 3, grade: "C", status: "pass", repeated: true },
      ],
    },
    sem2: {
      courses: [
        { code: "INTE 1201", name: "Computer Hardware", credits: 3, grade: "B", status: "pass" },
        { code: "INTE 1202", name: "Web Technologies", credits: 3, grade: "A-", status: "pass" },
        { code: "PMAT 1203", name: "Statistics I", credits: 3, grade: "C", status: "pass" },
        { code: "INTE 1204", name: "Digital Systems", credits: 2, grade: "B+", status: "pass" },
        { code: "MGTE 1205", name: "Communication Skills", credits: 2, grade: "A", status: "pass" },
      ],
      repeats: [],
    },
  },
  "year-2": {
    sem1: {
      courses: [
        { code: "INTE 2101", name: "Data Structures & Algorithms", credits: 4, grade: "A-", status: "pass" },
        { code: "INTE 2102", name: "Database Systems", credits: 3, grade: "B", status: "pass" },
        { code: "PMAT 2103", name: "Discrete Mathematics", credits: 3, grade: "C+", status: "pass" },
        { code: "INTE 2104", name: "Object-Oriented Programming", credits: 4, grade: "B+", status: "pass" },
        { code: "MGTE 2105", name: "Project Planning", credits: 2, grade: "F", status: "fail" },
      ],
      repeats: [
        { code: "MGTE 2105", name: "Project Planning", credits: 2, grade: "-", status: "pending", repeated: true },
      ],
    },
    sem2: {
      courses: [
        { code: "INTE 2201", name: "Operating Systems", credits: 4, grade: "B-", status: "pass" },
        { code: "INTE 2202", name: "Computer Networks", credits: 3, grade: "B", status: "pass" },
        { code: "PMAT 2203", name: "Numerical Methods", credits: 3, grade: "A", status: "pass" },
        { code: "INTE 2204", name: "Software Architecture", credits: 3, grade: "C+", status: "pass" },
        { code: "INTE 2205", name: "Professional Ethics", credits: 2, grade: "A-", status: "pass" },
      ],
      repeats: [],
    },
  },
  "year-3": {
    sem1: {
      courses: [
        { code: "INTE 3101", name: "Software Engineering", credits: 4, grade: "A", status: "pass" },
        { code: "INTE 3102", name: "Human-Computer Interaction", credits: 3, grade: "B-", status: "pass" },
        { code: "INTE 3103", name: "Information Security", credits: 3, grade: "B+", status: "pass" },
        { code: "MGTE 3104", name: "Project Management", credits: 3, grade: "F", status: "fail" },
        { code: "INTE 3105", name: "Mobile Application Development", credits: 3, grade: "A-", status: "pass" },
      ],
      repeats: [
        { code: "MGTE 3104", name: "Project Management", credits: 3, grade: "-", status: "pending", repeated: true },
      ],
    },
    sem2: {
      courses: [
        { code: "INTE 3201", name: "Cloud Computing", credits: 3, grade: "-", status: "pending" },
        { code: "INTE 3202", name: "Artificial Intelligence", credits: 4, grade: "-", status: "pending" },
        { code: "INTE 3203", name: "Advanced Databases", credits: 3, grade: "-", status: "pending" },
        { code: "MGTE 3204", name: "Entrepreneurship", credits: 2, grade: "-", status: "pending" },
        { code: "INTE 3205", name: "Research Methods", credits: 2, grade: "-", status: "pending" },
      ],
      repeats: [],
    },
  },
  "year-4": {
    sem1: {
      courses: [
        { code: "INTE 4101", name: "Final Year Project I", credits: 6, grade: "-", status: "pending" },
        { code: "INTE 4102", name: "Machine Learning", credits: 4, grade: "-", status: "pending" },
        { code: "INTE 4103", name: "Distributed Systems", credits: 3, grade: "-", status: "pending" },
        { code: "MGTE 4104", name: "Technology Management", credits: 2, grade: "-", status: "pending" },
        { code: "INTE 4105", name: "Advanced Web Technologies", credits: 3, grade: "-", status: "pending" },
      ],
      repeats: [],
    },
    sem2: {
      courses: [
        { code: "INTE 4201", name: "Final Year Project II", credits: 6, grade: "-", status: "pending" },
        { code: "INTE 4202", name: "Big Data Analytics", credits: 3, grade: "-", status: "pending" },
        { code: "INTE 4203", name: "DevOps & Deployment", credits: 3, grade: "-", status: "pending" },
        { code: "MGTE 4204", name: "Professional Development", credits: 2, grade: "-", status: "pending" },
        { code: "INTE 4205", name: "Industry Internship", credits: 4, grade: "-", status: "pending" },
      ],
      repeats: [],
    },
  },
};

// For the "repeat" route — show a unified repeat view
const repeatData: YearData = {
  sem1: {
    courses: [],
    repeats: [
      { code: "MGTE 1105", name: "Optimization", credits: 3, grade: "C", status: "pass", repeated: true },
      { code: "MGTE 2105", name: "Project Planning", credits: 2, grade: "-", status: "pending", repeated: true },
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
  "year-1": "Year 1",
  "year-2": "Year 2",
  "year-3": "Year 3",
  "year-4": "Year 4",
  repeat: "Repeat Modules",
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
              <th className="text-center px-3 md:px-5 py-3 font-semibold text-foreground whitespace-nowrap">Credits</th>
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

      {hasCourses && !isRepeatPage && (
        <CourseTable courses={data.courses} />
      )}

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

const RegistrationPage = () => {
  const { year } = useParams<{ year: string }>();
  const label = yearLabels[year || "year-1"] || "Registration";
  const isRepeatPage = year === "repeat";

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

        {isRepeatPage ? (
          // Repeat page: show just the repeat tables per semester
          <div className="space-y-8">
            <SemesterSection
              semesterLabel="Semester 1"
              data={data.sem1}
              isRepeatPage
              delay={0.1}
            />
            <SemesterSection
              semesterLabel="Semester 2"
              data={data.sem2}
              isRepeatPage
              delay={0.2}
            />
          </div>
        ) : (
          // Year page: full modules + repeat sub-tables per semester
          <div className="space-y-10">
            <SemesterSection
              semesterLabel="Semester 1"
              data={data.sem1}
              delay={0.1}
            />
            <SemesterSection
              semesterLabel="Semester 2"
              data={data.sem2}
              delay={0.2}
            />
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default RegistrationPage;