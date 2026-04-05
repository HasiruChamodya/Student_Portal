import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { GraduationCap, Loader2, Eye, EyeOff, ArrowLeft, X, Mail, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import campusHero from "@/assets/campus-hero.jpg";

type View = "login" | "forgot";

const LoginPage = () => {
  const { login, isLoading } = useAuth();
  const [view, setView] = useState<View>("login");

  // Login state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // Forgot password state
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSubmitted, setForgotSubmitted] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);

  // Help Desk Modal state
  const [showHelpModal, setShowHelpModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please enter both your student ID and password.");
      return;
    }
    try {
      await login(email, password);
    } catch {
      setError("Invalid credentials. Please try again.");
    }
  };

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) return;
    setForgotLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1200));
    setForgotLoading(false);
    setForgotSubmitted(true);
  };

  const handleBackToLogin = () => {
    setView("login");
    setForgotEmail("");
    setForgotSubmitted(false);
    setError("");
  };

  return (
    <div className="min-h-screen flex bg-background relative">
      {/* Help Desk Modal */}
      <AnimatePresence>
        {showHelpModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowHelpModal(false)}
              className="fixed inset-0 bg-black/50 z-40"
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-[90%] max-w-sm bg-card rounded-xl shadow-xl overflow-hidden border border-border"
              >
              <div className="flex justify-between items-center p-4 border-b border-border bg-muted/50">
                <h3 className="font-semibold text-foreground">IT Help Desk</h3>
                <button
                  onClick={() => setShowHelpModal(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md hover:bg-secondary"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="p-5 space-y-4 ">
                <p className="text-sm text-muted-foreground">
                  If you are experiencing issues accessing your account, please contact the support team using the details below:
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 border border-border/50">
                    <Phone className="h-5 w-5 text-primary shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Phone Support</p>
                      <p className="text-sm font-semibold text-foreground">+94 11 290 3000</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 border border-border/50">
                    <Mail className="h-5 w-5 text-primary shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Email Support</p>
                      <a href="mailto:ithelpdesk@kln.ac.lk" className="text-sm font-semibold text-primary hover:underline">
                        ithelpdesk@kln.ac.lk
                      </a>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  Working hours: Mon - Fri, 8:30 AM to 4:00 PM
                </p>
              </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Left panel - decorative */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden items-center justify-center">
        <img
          src={campusHero}
          alt="University campus at sunset"
          className="absolute inset-0 w-full h-full object-cover opacity-100"
        />
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
          <p className="text-primary-foreground/80 text-lg max-w-md mx-auto">
            Access your academic records, register for courses, and manage your student profile — all in one place.
          </p>
        </motion.div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <AnimatePresence mode="wait">
          {view === "login" ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-md"
            >
              <div className="lg:hidden flex items-center gap-3 mb-8">
                <GraduationCap className="h-10 w-10 text-primary" />
                <span className="font-heading text-2xl font-bold text-primary">Student Portal</span>
              </div>

              <h2 className="font-heading text-3xl font-bold text-foreground mb-2">Student Login</h2>
              <p className="text-muted-foreground mb-8">
                Enter your credentials to access your student portal.
              </p>

              {error && (
                <div
                  className="bg-destructive/10 border border-destructive/30 text-destructive rounded-lg p-3 mb-6 text-sm"
                  role="alert"
                >
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                    Student ID
                  </label>
                  <input
                    id="email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-12 px-4 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
                    placeholder="Example: IM/20XX/XX"
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
                  <div className="mt-2 text-right">
                    <div className="flex justify-center">
                      <button
                        type="button"
                        onClick={() => setView("forgot")}
                        className="text-sm text-primary hover:underline focus-visible:outline-none focus-visible:underline"
                      >
                        Forgot password?
                      </button>
                    </div>
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
                Having trouble signing in?{" "}
                <button 
                  onClick={() => setShowHelpModal(true)}
                  className="text-primary hover:underline font-medium"
                >
                  Contact the IT Help Desk.
                </button>
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="forgot"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-md"
            >
              <button
                onClick={handleBackToLogin}
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to login
              </button>

              <h2 className="font-heading text-3xl font-bold text-foreground mb-2">Reset Password</h2>
              <p className="text-muted-foreground mb-8">
                Enter your Student ID and we'll send a password reset link to your registered email address.
              </p>

              {forgotSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-success/10 border border-success/30 rounded-xl p-6 text-center space-y-2"
                >
                  <div className="h-12 w-12 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-3">
                    <svg className="h-6 w-6 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="font-semibold text-foreground">Check your email</p>
                  <p className="text-sm text-muted-foreground">
                    If a student account exists for <span className="font-medium text-foreground">{forgotEmail}</span>,
                    a reset link has been sent to the registered email address.
                  </p>
                  <button
                    onClick={handleBackToLogin}
                    className="mt-4 text-sm text-primary hover:underline"
                  >
                    Return to login
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleForgotSubmit} className="space-y-5" noValidate>
                  <div>
                    <label htmlFor="forgot-email" className="block text-sm font-medium text-foreground mb-1.5">
                      Student ID
                    </label>
                    <input
                      id="forgot-email"
                      type="text"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      className="w-full h-12 px-4 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
                      placeholder="Example: IM/20XX/XX"
                      aria-required="true"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={forgotLoading || !forgotEmail}
                    className="w-full h-12 rounded-lg bg-primary text-primary-foreground font-semibold text-base hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-60 transition-opacity flex items-center justify-center gap-2"
                  >
                    {forgotLoading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                        Sending…
                      </>
                    ) : (
                      "Send Reset Link"
                    )}
                  </button>
                </form>
              )}

              <p className="text-xs text-muted-foreground mt-8 text-center">
                Don't have access to your registered email?{" "}
                <button 
                  onClick={() => setShowHelpModal(true)}
                  className="text-primary hover:underline font-medium"
                >
                  Contact the IT Help Desk.
                </button>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LoginPage;