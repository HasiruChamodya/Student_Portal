import { useAuth } from "@/contexts/AuthContext";
import { AppLayout } from "@/components/AppLayout";
import { motion } from "framer-motion";
import { User, BookOpen, FileCheck, RotateCcw, ArrowRight, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

// ─── GPA helpers (same grade map as RegistrationPage) ─────────────────────

const gradePoints: Record<string, number> = {
  "A+": 4.0, "A": 4.0, "A-": 3.7,
  "B+": 3.3, "B": 3.0, "B-": 2.7,
  "C+": 2.3, "C": 2.0, "C-": 1.7,
  "D+": 1.3, "D": 1.0,
  "F":  0.0,
};

interface GradedModule { credits: number; grade: string; }

function calcGPA(modules: GradedModule[]): number | null {
  const g = modules.filter((m) => m.grade !== "-" && gradePoints[m.grade] !== undefined);
  if (!g.length) return null;
  const pts = g.reduce((s, m) => s + gradePoints[m.grade] * m.credits, 0);
  const cr  = g.reduce((s, m) => s + m.credits, 0);
  return cr === 0 ? null : pts / cr;
}

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

// ─── All graded modules across Years 1–3 (mirrors RegistrationPage data) ──
// Only modules with real grades are included; Year 4 is excluded entirely.

const allGradedModules: GradedModule[] = [
  // Year 1 Sem 1 — original attempts (failed module replaced by repeat below)
  { credits: 3, grade: "B+" }, // INTE 1101
  { credits: 2, grade: "A"  }, // INTE 1102
  { credits: 3, grade: "C+" }, // PMAT 1103
  { credits: 2, grade: "B"  }, // INTE 1104
  // MGTE 1105 original D excluded; repeat grade C used instead
  { credits: 3, grade: "C"  }, // MGTE 1105 repeat
  // Year 1 Sem 2
  { credits: 3, grade: "B"  }, // INTE 1201
  { credits: 3, grade: "A-" }, // INTE 1202
  { credits: 3, grade: "C"  }, // PMAT 1203
  { credits: 2, grade: "B+" }, // INTE 1204
  { credits: 2, grade: "A"  }, // MGTE 1205
  // Year 2 Sem 1 — MGTE 2105 still pending repeat, excluded
  { credits: 4, grade: "A-" }, // INTE 2101
  { credits: 3, grade: "B"  }, // INTE 2102
  { credits: 3, grade: "C+" }, // PMAT 2103
  { credits: 4, grade: "B+" }, // INTE 2104
  // Year 2 Sem 2
  { credits: 4, grade: "B-" }, // INTE 2201
  { credits: 3, grade: "B"  }, // INTE 2202
  { credits: 3, grade: "A"  }, // PMAT 2203
  { credits: 3, grade: "C+" }, // INTE 2204
  { credits: 2, grade: "A-" }, // INTE 2205
  // Year 3 Sem 1 — MGTE 3104 failed, repeat pending, excluded from GPA
  { credits: 4, grade: "A"  }, // INTE 3101
  { credits: 3, grade: "B-" }, // INTE 3102
  { credits: 3, grade: "B+" }, // INTE 3103
  { credits: 3, grade: "A-" }, // INTE 3105
  // Year 3 Sem 2 — all pending, nothing added
];

const overallGPA = calcGPA(allGradedModules);

// Per-year GPAs for the sparkline row
const yearGPAs: { label: string; gpa: number | null }[] = [
  {
    label: "Year 1",
    gpa: calcGPA([
      { credits: 3, grade: "B+" }, { credits: 2, grade: "A"  },
      { credits: 3, grade: "C+" }, { credits: 2, grade: "B"  },
      { credits: 3, grade: "C"  }, // repeat
      { credits: 3, grade: "B"  }, { credits: 3, grade: "A-" },
      { credits: 3, grade: "C"  }, { credits: 2, grade: "B+" },
      { credits: 2, grade: "A"  },
    ]),
  },
  {
    label: "Year 2",
    gpa: calcGPA([
      { credits: 4, grade: "A-" }, { credits: 3, grade: "B"  },
      { credits: 3, grade: "C+" }, { credits: 4, grade: "B+" },
      { credits: 4, grade: "B-" }, { credits: 3, grade: "B"  },
      { credits: 3, grade: "A"  }, { credits: 3, grade: "C+" },
      { credits: 2, grade: "A-" },
    ]),
  },
  {
    label: "Year 3",
    gpa: calcGPA([
      { credits: 4, grade: "A"  }, { credits: 3, grade: "B-" },
      { credits: 3, grade: "B+" }, { credits: 3, grade: "A-" },
    ]),
  },
  { label: "Year 4", gpa: null },
];

// ─── Quick actions ─────────────────────────────────────────────────────────

const quickActions = [
  { label: "Year 3", path: "/registration/year-3", icon: BookOpen, desc: "View your current year courses and results" },
  { label: "Exam Admission", path: "/exam-admission", icon: FileCheck, desc: "Download your exam admission letter" },
  { label: "Repeat Modules", path: "/registration/repeat", icon: RotateCcw, desc: "Track your repeat module registrations" },
];

// ─── Component ─────────────────────────────────────────────────────────────

const DashboardPage = () => {
  const { user } = useAuth();
  if (!user) return null;

  const gpaPct = overallGPA === null ? 0 : Math.min((overallGPA / 4.0) * 100, 100);

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto space-y-5 md:space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-heading text-2xl md:text-3xl font-bold text-foreground"
        >
          Welcome back, {user.name.split(" ")[0]}
        </motion.h1>

        {/* ── Student Profile + Overall GPA ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border rounded-xl shadow-sm overflow-hidden"
        >
          {/* Top section: avatar + profile fields */}
          <div className="p-4 md:p-6 flex items-start gap-3 md:gap-4">
            <div className="h-12 w-12 md:h-14 md:w-14 rounded-full bg-primary flex items-center justify-center shrink-0">
              <User className="h-6 w-6 md:h-7 md:w-7 text-primary-foreground" aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="font-heading text-lg md:text-xl font-bold text-foreground">Student Profile</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-3 mt-3 text-sm">
                <div>
                  <span className="text-muted-foreground text-xs">Full Name</span>
                  <p className="font-medium text-foreground truncate">{user.name}</p>
                </div>
                <div>
                  <span className="text-muted-foreground text-xs">Student ID</span>
                  <p className="font-medium text-foreground">{user.id}</p>
                </div>
                <div>
                  <span className="text-muted-foreground text-xs">Academic Year</span>
                  <p className="font-medium text-foreground">{user.academicYear}</p>
                </div>
                <div>
                  <span className="text-muted-foreground text-xs">Faculty</span>
                  <p className="font-medium text-foreground">{user.faculty}</p>
                </div>
                <div>
                  <span className="text-muted-foreground text-xs">Program</span>
                  <p className="font-medium text-foreground">{user.program}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border" />

          {/* Overall GPA strip */}
          <div className="px-4 md:px-6 py-4 bg-secondary/30 flex flex-col sm:flex-row sm:items-center gap-4">
            {/* Left: label + big number */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-primary" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">Cumulative GPA</p>
                <p className={`font-heading text-2xl font-bold tabular-nums leading-none mt-0.5 ${gpaColor(overallGPA)}`}>
                  {overallGPA === null ? "—" : overallGPA.toFixed(2)}
                  <span className="text-sm font-normal text-muted-foreground ml-1">/ 3.9</span>
                </p>
              </div>
            </div>

            {/* Center: overall progress bar */}
            <div className="flex-1 space-y-1.5 min-w-0">
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${gpaPct}%` }}
                  transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                  className={`h-full rounded-full ${gpaBg(overallGPA)}`}
                />
              </div>
              {/* Per-year mini breakdown */}
              <div className="flex gap-3 flex-wrap">
                {yearGPAs.map(({ label, gpa }) => (
                  <span key={label} className="flex items-center gap-1 text-xs text-muted-foreground whitespace-nowrap">
                    <span className="font-medium text-foreground">{label}:</span>
                    <span className={`font-semibold tabular-nums ${gpaColor(gpa)}`}>
                      {gpa === null ? "Yet to take" : gpa.toFixed(2)}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="font-heading text-lg md:text-xl font-bold text-foreground mb-3 md:mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {quickActions.map((action) => (
              <Link
                key={action.path}
                to={action.path}
                className="group bg-card border border-border rounded-xl p-4 md:p-5 shadow-sm hover:shadow-md hover:border-primary/30 transition-all active:scale-[0.98]"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-9 w-9 md:h-10 md:w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <action.icon className="h-4 w-4 md:h-5 md:w-5 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="font-semibold text-foreground text-sm md:text-base">{action.label}</h3>
                </div>
                <p className="text-xs md:text-sm text-muted-foreground mb-3">{action.desc}</p>
                <span className="text-sm font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                  Go <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default DashboardPage;