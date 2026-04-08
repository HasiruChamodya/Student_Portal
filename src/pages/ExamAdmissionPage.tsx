import { AppLayout } from "@/components/AppLayout";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { Printer, GraduationCap, CalendarDays } from "lucide-react";
import { toast } from "sonner";

// Array holding the exam timetable data
const examSchedule = [
  {
    code: "INTE 2014",
    name: "Optimization",
    time: "08:30 AM - 10:30 AM",
    venue: "A8 203",
  },
  {
    code: "INTE 3101",
    name: "Software Engineering",
    time: "09:00 AM - 11:00 AM",
    venue: "A8 203",
  },
  {
    code: "INTE 3102",
    name: "Human-Computer Interaction",
    time: "01:00 PM - 03:00 PM",
    venue: "A8 103",
  },
  {
    code: "INTE 3103",
    name: "Information Security",
    time: "10:30 AM - 12:30 PM",
    venue: "A8 204",
  },
];

const ExamAdmissionPage = () => {
  const { user } = useAuth();
  if (!user) return null;

  const handlePrintTimetable = () => {
    toast.success("Preparing your timetable for printing…");
    setTimeout(() => window.print(), 500);
  };

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto space-y-5 md:space-y-6">
        {/* Main Heading - Hidden during print */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-heading text-2xl md:text-3xl font-bold text-foreground print:hidden"
        >
          Exam Admission
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border-2 border-primary/20 rounded-xl shadow-sm overflow-hidden print:border-none print:shadow-none"
        >
          {/* Header - Hidden during print */}
          <div className="bg-primary px-5 md:px-8 py-5 md:py-6 text-center print:hidden">
            <GraduationCap
              className="h-10 w-10 md:h-12 md:w-12 text-primary-foreground mx-auto mb-2"
              aria-hidden="true"
            />
            <h2 className="font-heading text-lg md:text-2xl font-bold text-primary-foreground leading-snug">
              University Exam Admission Time Table
            </h2>
            <p className="text-primary-foreground/80 text-xs md:text-sm mt-1">
              Academic Year 2024/2025 — Semester II
            </p>
          </div>

          <div className="p-5 md:p-8 space-y-5 md:space-y-6 print:p-0 print:m-0">
            {/* Student Details Grid - Hidden during print */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm print:hidden">
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

            {/* Timetable Section - Visible during print */}
            <div className="border-t border-border pt-4 print:border-none print:pt-0">
              <h3 className="font-semibold text-foreground mb-4 text-sm md:text-base print:text-2xl print:mb-6 print:text-center">
                Exam Timetable
              </h3>
              
              {/* This mini-header only shows up on paper to give context to the printed table */}
              <div className="hidden print:block mb-6 text-sm text-center text-muted-foreground">
                <p>Student: {user.name} | ID: {user.id}</p>
                <p>Academic Year 2024/2025 — Semester II</p>
              </div>

              <div className="overflow-x-auto -mx-1">
                <table className="w-full text-sm min-w-[500px] print:min-w-full">
                  <thead>
                    <tr className="text-left text-xs text-muted-foreground border-b border-border print:text-black">
                      <th className="pb-2 pr-4 font-medium">Code</th>
                      <th className="pb-2 pr-4 font-medium">Module</th>
                      <th className="pb-2 pr-4 font-medium">Time</th>
                      <th className="pb-2 font-medium">Venue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {examSchedule.map((exam, index) => (
                      <tr key={index} className="border-b border-border/50 print:border-black/20">
                        <td className="py-3 pr-4 font-medium text-foreground whitespace-nowrap">
                          {exam.code}
                        </td>
                        <td className="py-3 pr-4 text-foreground">{exam.name}</td>
                        <td className="py-3 pr-4 text-muted-foreground whitespace-nowrap print:text-black">
                          {exam.time}
                        </td>
                        <td className="py-3 text-muted-foreground whitespace-nowrap print:text-black">
                          {exam.venue}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Footer Text - Hidden during print */}
            <p className="text-xs text-muted-foreground border-t border-border pt-4 print:hidden">
              This letter certifies that the above-named student has fulfilled all requirements and is
              admitted to sit for the examinations listed above. This document is valid only when
              presented with a valid student identification card.
            </p>
          </div>

          {/* Actions Bar - Hidden during print */}
          <div className="px-5 md:px-8 py-4 bg-secondary/50 border-t border-border flex justify-center gap-3 print:hidden ">
            <button
              onClick={handlePrintTimetable}
              className="inline-flex items-center gap-2 h-11 md:h-12 px-6 md:px-8 rounded-lg bg-primary text-primary-foreground font-semibold text-sm md:text-base hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-opacity active:scale-95 "
            >
              <Printer className="h-4 w-4 md:h-5 md:w-5" aria-hidden="true" />
              Print Timetable
            </button>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default ExamAdmissionPage;