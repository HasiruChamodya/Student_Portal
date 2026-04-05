import { useAuth } from "@/contexts/AuthContext";
import { AppLayout } from "@/components/AppLayout";
import { motion } from "framer-motion";
import { User, BookOpen, FileCheck, RotateCcw, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const quickActions = [
  { label: "Year 3 Registration", path: "/registration/year-3", icon: BookOpen, desc: "View your current year courses and results" },
  { label: "Exam Admission", path: "/exam-admission", icon: FileCheck, desc: "Download your exam admission letter" },
  { label: "Repeat Registration", path: "/registration/repeat", icon: RotateCcw, desc: "Register for repeat modules" },
];

const DashboardPage = () => {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-heading text-3xl font-bold text-foreground"
        >
          Welcome back, {user.name.split(" ")[0]}
        </motion.h1>

        {/* Student Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border rounded-xl p-6 shadow-sm"
        >
          <div className="flex items-start gap-4">
            <div className="h-14 w-14 rounded-full bg-primary flex items-center justify-center shrink-0">
              <User className="h-7 w-7 text-primary-foreground" aria-hidden="true" />
            </div>
            <div className="space-y-1">
              <h2 className="font-heading text-xl font-bold text-foreground">Student Profile</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-2 mt-3 text-sm">
                <div>
                  <span className="text-muted-foreground">Full Name</span>
                  <p className="font-medium text-foreground">{user.name}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Student ID</span>
                  <p className="font-medium text-foreground">{user.id}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Academic Year</span>
                  <p className="font-medium text-foreground">{user.academicYear}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Faculty</span>
                  <p className="font-medium text-foreground">{user.faculty}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Program</span>
                  <p className="font-medium text-foreground">{user.program}</p>
                </div>
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
          <h2 className="font-heading text-xl font-bold text-foreground mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action) => (
              <Link
                key={action.path}
                to={action.path}
                className="group bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <action.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="font-semibold text-foreground">{action.label}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{action.desc}</p>
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
