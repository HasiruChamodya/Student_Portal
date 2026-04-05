import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { GraduationCap, Loader2, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import campusHero from "@/assets/campus-hero.jpg";

const LoginPage = () => {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please enter both your student email and password.");
      return;
    }
    try {
      await login(email, password);
    } catch {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left panel - decorative */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden items-center justify-center">
        <img src={campusHero} alt="University campus at sunset" className="absolute inset-0 w-full h-full object-cover opacity-100" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary/70" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 text-center px-12"
        >
          <GraduationCap className="h-20 w-20 text-primary-foreground mx-auto mb-6" />
          <h1 className="font-heading text-4xl font-bold text-primary-foreground mb-4">
            University Of Kelaniya
            
          </h1>
          <h1 className="font-heading text-4xl font-bold text-primary-foreground mb-4">
            Faculty Information System
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-md">
            Access your academic records, register for courses, and manage your student profile — all in one place.
          </p>
        </motion.div>
      </div>

      {/* Right panel - login form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <GraduationCap className="h-10 w-10 text-primary" />
            <span className="font-heading text-2xl font-bold text-primary">UniPortal</span>
          </div>

          <h2 className="font-heading text-3xl font-bold text-foreground mb-2">Student Login</h2>
          <p className="text-muted-foreground mb-8">
            Enter your credentials to access your student portal.
          </p>

          {error && (
            <div className="bg-destructive/10 border border-destructive/30 text-destructive rounded-lg p-3 mb-6 text-sm" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                Student Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 px-4 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
                placeholder="Student ID"
                autoComplete="email"
                aria-required="true"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 px-4 pr-12 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  aria-required="true"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-lg bg-primary text-primary-foreground font-semibold text-base hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-60 transition-opacity flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                  Signing in…
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className="text-xs text-muted-foreground mt-8 text-center">
            Having trouble signing in? Contact the IT Help Desk.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
