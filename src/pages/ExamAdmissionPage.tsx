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
      <div className="max-w-3xl mx-auto space-y-5 md:space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-heading text-2xl md:text-3xl font-bold text-foreground"
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
          <div className="bg-primary px-5 md:px-8 py-5 md:py-6 text-center">
            <GraduationCap className="h-10 w-10 md:h-12 md:w-12 text-primary-foreground mx-auto mb-2" aria-hidden="true" />
            <h2 className="font-heading text-lg md:text-2xl font-bold text-primary-foreground leading-snug">
              University Exam Admission Letter
            </h2>
            <p className="text-primary-foreground/80 text-xs md:text-sm mt-1">
              Academic Year 2024/2025 — Semester II
            </p>
          </div>

          {/* Details */}
          <div className="p-5 md:p-8 space-y-5 md:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground text-xs">Student Name</span>
                <p className="font-medium text-foreground text-base mt-0.5">{user.name}</p>
              </div>
              <div>
                <span className="text-muted-foreground text-xs">Student ID</span>
                <p className="font-medium text-foreground text-base mt-0.5">{user.id}</p>
              </div>
              <div>
                <span className="text-muted-foreground text-xs">Faculty</span>
                <p className="font-medium text-foreground text-base mt-0.5">{user.faculty}</p>
              </div>
              <div>
                <span className="text-muted-foreground text-xs">Program</span>
                <p className="font-medium text-foreground text-base mt-0.5">{user.program}</p>
              </div>
              <div>
                <span className="text-muted-foreground text-xs">Academic Year</span>
                <p className="font-medium text-foreground text-base mt-0.5">{user.academicYear}</p>
              </div>
              <div>
                <span className="text-muted-foreground text-xs">Status</span>
                <p className="font-medium text-success text-base mt-0.5">Eligible for Examinations</p>
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <h3 className="font-semibold text-foreground mb-2 text-sm md:text-base">Registered Exam Modules</h3>
              <div className="overflow-x-auto -mx-1">
                <table className="w-full text-sm min-w-[320px]">
                  <thead>
                    <tr className="text-left text-xs text-muted-foreground border-b border-border">
                      <th className="pb-2 pr-4 font-medium">Code</th>
                      <th className="pb-2 pr-4 font-medium">Module</th>
                      <th className="pb-2 font-medium">Note</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4 font-medium text-foreground">INTE 2014</td>
                      <td className="py-2 pr-4 text-foreground">Optimization</td>
                      <td className="py-2 text-muted-foreground">Repeat</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-xs text-muted-foreground border-t border-border pt-4">
              This letter certifies that the above-named student has fulfilled all requirements and is admitted to sit
              for the examinations listed above. This document is valid only when presented with a valid student
              identification card.
            </p>
          </div>

          {/* Actions */}
          <div className="px-5 md:px-8 py-4 bg-secondary/50 border-t border-border flex justify-end">
            {/* <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 h-11 md:h-12 px-6 md:px-8 rounded-lg bg-primary text-primary-foreground font-semibold text-sm md:text-base hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-opacity active:scale-95"
            >
              <Printer className="h-4 w-4 md:h-5 md:w-5" aria-hidden="true" />
              /Print Admission
            </button> */}
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default ExamAdmissionPage;