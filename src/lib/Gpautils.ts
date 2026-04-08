// Shared GPA utilities — import these wherever GPA needs to be computed

export const gradePoints: Record<string, number> = {
  "A+": 4.0,
  "A":  4.0,
  "A-": 3.7,
  "B+": 3.3,
  "B":  3.0,
  "B-": 2.7,
  "C+": 2.3,
  "C":  2.0,
  "C-": 1.7,
  "D+": 1.3,
  "D":  1.0,
  "F":  0.0,
};

export interface GradedModule {
  credits: number;
  grade: string;
}

/** Returns null if no gradeable modules exist */
export function calcGPA(modules: GradedModule[]): number | null {
  const gradeable = modules.filter(
    (m) => m.grade !== "-" && gradePoints[m.grade] !== undefined
  );
  if (gradeable.length === 0) return null;
  const totalPoints = gradeable.reduce(
    (sum, m) => sum + gradePoints[m.grade] * m.credits,
    0
  );
  const totalCredits = gradeable.reduce((sum, m) => sum + m.credits, 0);
  return totalCredits === 0 ? null : totalPoints / totalCredits;
}

export function formatGPA(gpa: number | null): string {
  return gpa === null ? "—" : gpa.toFixed(2);
}

/** Returns a colour class based on GPA value */
export function gpaColour(gpa: number | null): string {
  if (gpa === null) return "text-muted-foreground";
  if (gpa >= 3.7) return "text-success";
  if (gpa >= 3.0) return "text-primary";
  if (gpa >= 2.0) return "text-warning-foreground";
  return "text-destructive";
}

/** Percentage fill 0-100 for progress bars (max 4.0) */
export function gpaPct(gpa: number | null): number {
  if (gpa === null) return 0;
  return Math.min((gpa / 3.9) * 100, 100);
}