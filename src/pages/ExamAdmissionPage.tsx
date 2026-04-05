import { AppLayout } from "@/components/AppLayout";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { Printer, GraduationCap } from "lucide-react";
import { toast } from "sonner";

const ExamAdmissionPage = () => {
  const { user } = useAuth();
  if (!user) return null;

  const handlePrint = () => {
    toast.success("Preparing your admission letter for printing…");
    setTimeout(() => window.print(), 500);
  };

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-heading text-3xl font-bold text-foreground"
        >
          Exam Admission
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border-2 border-primary/20 rounded-xl shadow-sm overflow-hidden"
        >
          {/* Header */}
          <div className="bg-primary px-8 py-6 text-center">
            <GraduationCap className="h-12 w-12 text-primary-foreground mx-auto mb-2" aria-hidden="true" />
            <h2 className="font-heading text-2xl font-bold text-primary-foreground">
              University Exam Admission Letter
            </h2>
            <p className="text-primary-foreground/80 text-sm mt-1">Academic Year 2024/2025 — Semester II</p>
          </div>

          {/* Details */}
          <div className="p-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Student Name</span>
                <p className="font-medium text-foreground text-base">{user.name}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Student ID</span>
                <p className="font-medium text-foreground text-base">{user.id}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Faculty</span>
                <p className="font-medium text-foreground text-base">{user.faculty}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Program</span>
                <p className="font-medium text-foreground text-base">{user.program}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Academic Year</span>
                <p className="font-medium text-foreground text-base">{user.academicYear}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Status</span>
                <p className="font-medium text-success text-base">Eligible for Examinations</p>
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <h3 className="font-semibold text-foreground mb-2">Registered Exam Modules</h3>
              <ul className="space-y-1.5 text-sm text-foreground">
                <li className="flex gap-3"><span className="font-medium w-16">INTE 2014</span> Optimaization (Repeat)</li>
              </ul>
            </div>

            <p className="text-xs text-muted-foreground border-t border-border pt-4">
              This letter certifies that the above-named student has fulfilled all requirements and is admitted to sit for the
              examinations listed above. This document is valid only when presented with a valid student identification card.
            </p>
          </div>

          {/* Actions */}
          <div className="px-8 py-4 bg-secondary/50 border-t border-border flex justify-end">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 h-12 px-8 rounded-lg bg-primary text-primary-foreground font-semibold text-base hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-opacity"
            >
              <Printer className="h-5 w-5" aria-hidden="true" />
              Print Admission
            </button>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default ExamAdmissionPage;
