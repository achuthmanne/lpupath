"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import StudentLandingPage from "@/components/StudentLandingPage";
import Turnstile, { TurnstileRef } from "@/components/Turnstile";
import { createClient } from "@/lib/supabase/client";
import { Mail, CheckCircle2, RotateCcw, GraduationCap, ShieldCheck, ArrowUpRight, X } from "lucide-react";

export default function Home() {
  const [supabase] = useState(() => createClient());
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [step, setStep] = useState<"email" | "otp">("email");
  const [transitionStage, setTransitionStage] = useState<"idle" | "exiting" | "entering">("idle");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const [captchaToken, setCaptchaToken] = useState("");
  const turnstileRef = useRef<TurnstileRef>(null);

  const handleTurnstileVerify = useCallback((token: string) => {
    setCaptchaToken(token);
    setError((prev) => (prev === "Please complete verification" ? "" : prev));
  }, []);

  // Cooldown countdown timer for resending OTP
  useEffect(() => {
    if (cooldown <= 0) return;
    const interval = setInterval(() => {
      setCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [cooldown]);

  useEffect(() => {
    // Check if student already has active session
    const checkActiveSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user?.email) {
          setEmail(session.user.email);
          setIsLoggedIn(true);
        }
      } catch (err) {
        console.error("Session check error:", err);
      }
    };
    checkActiveSession();

    // Listen to real-time auth changes (e.g. if student clicks email confirmation link)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user?.email) {
        setEmail(session.user.email);
        setIsLoggedIn(true);
      }
    });

    const timer = setTimeout(() => {
      setAnimating(true);
    }, 200);
    return () => {
      clearTimeout(timer);
      subscription.unsubscribe();
    };
  }, [supabase]);

  // Handle Real Supabase OTP Delivery
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const trimmed = email.trim().toLowerCase();
    if (!trimmed) {
      setError("Please enter your official LPU email address");
      return;
    }

    // Strictly allow ONLY official Lovely Professional University student emails
    const isLpu = trimmed.endsWith("@lpu.in") || trimmed.endsWith("@lpu.co.in");

    if (!isLpu) {
      setError("Please use your official university email (@lpu.in)");
      return;
    }

    // Require Cloudflare Turnstile Verification before sending OTP
    if (!captchaToken) {
      setError("Please complete verification");
      return;
    }

    setLoading(true);

    try {
      // Trigger Supabase Email OTP (with Cloudflare Turnstile token if available)
      const { error: otpError } = await supabase.auth.signInWithOtp({
        email: trimmed,
        options: {
          shouldCreateUser: true,
          ...(captchaToken ? { captchaToken } : {}),
        },
      });

      if (otpError) {
        setLoading(false);
        const lowerMsg = otpError.message?.toLowerCase() || "";
        if (
          lowerMsg.includes("captcha") ||
          lowerMsg.includes("token") ||
          lowerMsg.includes("verification") ||
          lowerMsg.includes("bot")
        ) {
          setError("Please complete verification");
        } else {
          setError(otpError.message);
        }
        turnstileRef.current?.reset();
        setCaptchaToken("");
        return;
      }

      setCooldown(60);
      setSuccessMessage("");

      // Slide current form out to RIGHT
      setTransitionStage("exiting");

      setTimeout(() => {
        setStep("otp");
        setLoading(false);
        setTransitionStage("entering");

        setTimeout(() => {
          setTransitionStage("idle");
        }, 50);
      }, 380);
    } catch (err: unknown) {
      setLoading(false);
      const msg = err instanceof Error ? err.message : "Failed to send verification code";
      setError(msg);
    }
  };

  // Handle Back to Email with smooth transition
  const handleBackToEmail = () => {
    setError("");
    setSuccessMessage("");
    setOtp(["", "", "", "", "", "", "", ""]);
    setCaptchaToken("");
    turnstileRef.current?.reset();
    setTransitionStage("exiting");

    setTimeout(() => {
      setStep("email");
      setTransitionStage("entering");

      setTimeout(() => {
        setTransitionStage("idle");
      }, 50);
    }, 380);
  };

  const handlePasteDigits = (text: string, startIndex: number = 0) => {
    const digits = text.replace(/\D/g, "").slice(0, otp.length);
    if (!digits) return;
    const newOtp = [...otp];
    for (let i = 0; i < digits.length && (startIndex + i) < otp.length; i++) {
      newOtp[startIndex + i] = digits[i];
    }
    setOtp(newOtp);
    const targetFocus = Math.min(startIndex + digits.length, otp.length - 1);
    const nextInput = document.getElementById(`otp-${targetFocus}`);
    nextInput?.focus();
  };

  const handleOtpChange = (index: number, value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (!cleaned) {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      return;
    }

    if (cleaned.length > 1) {
      handlePasteDigits(cleaned, index);
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = cleaned;
    setOtp(newOtp);

    if (cleaned && index < otp.length - 1) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  // Handle Real Supabase OTP Verification
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const enteredToken = otp.join("").trim();
    if (enteredToken.length < 6) {
      setError("Please enter the complete verification code");
      return;
    }

    setLoading(true);

    try {
      // First attempt email OTP verification
      let verifyResult = await supabase.auth.verifyOtp({
        email: email.trim().toLowerCase(),
        token: enteredToken,
        type: "email",
      });

      // If failed, attempt signup OTP verification (for new accounts)
      if (verifyResult.error) {
        const retryResult = await supabase.auth.verifyOtp({
          email: email.trim().toLowerCase(),
          token: enteredToken,
          type: "signup",
        });
        if (!retryResult.error) {
          verifyResult = retryResult;
        }
      }

      if (verifyResult.error) {
        setLoading(false);
        setError(verifyResult.error.message || "Invalid or expired verification code");
        return;
      }

      if (verifyResult.data?.session) {
        setLoading(false);
        setIsLoggedIn(true);
      } else {
        setLoading(false);
        setError("Verification succeeded but no session was created. Please try again.");
      }
    } catch (err: unknown) {
      setLoading(false);
      const msg = err instanceof Error ? err.message : "Verification failed";
      setError(msg);
    }
  };

  // Handle Sign Out
  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error("Sign out error:", err);
    }
    setIsLoggedIn(false);
    setStep("email");
    setEmail("");
    setOtp(["", "", "", "", "", "", "", ""]);
  };

  // Handle Resend Verification Code from Guide Modal
  const handleResendCode = async () => {
    if (!email || loading || cooldown > 0) return;
    setLoading(true);
    setError("");
    setSuccessMessage("");
    try {
      const { error: otpError } = await supabase.auth.signInWithOtp({
        email: email.trim().toLowerCase(),
        options: { shouldCreateUser: true },
      });
      setLoading(false);
      if (otpError) {
        setError(otpError.message);
      } else {
        setOtp(["", "", "", "", "", "", "", ""]);
        setSuccessMessage("Fresh 8-digit verification code sent to your Outlook!");
        setShowHelpModal(false);
        setCooldown(60);
      }
    } catch {
      setLoading(false);
      setError("Failed to resend code");
    }
  };

  if (isLoggedIn) {
    return <StudentLandingPage email={email} onSignOut={handleSignOut} />;
  }

  const getSlideClass = () => {
    if (transitionStage === "exiting") {
      return "translate-x-[110%] opacity-0 pointer-events-none";
    }
    if (transitionStage === "entering") {
      return "-translate-x-[70px] opacity-0 pointer-events-none";
    }
    return "translate-x-0 opacity-100";
  };

  return (
    <div className="w-screen h-screen min-h-screen overflow-hidden bg-[#F6F7F9] relative flex flex-col lg:flex-row select-none">
      
      {/* ============================================================== */}
      {/* 1. LEFT SIDE: LIGHT WHITE BG (BIG ANIMATED LOGO + MATTER)      */}
      {/* ============================================================== */}
      <div className="w-full lg:w-[48%] h-full flex flex-col justify-between p-8 sm:p-14 lg:p-20 z-10">
        
        {/* Top Label */}
        <div className="flex items-center gap-2.5">
          <div className="w-0.75 h-4 bg-[#FF6500] rounded-full shrink-0" />
          <span className="text-xs font-bold uppercase tracking-widest text-[#111111]">
            Placement Intelligence Platform
          </span>
        </div>

        {/* Center: BIG ANIMATED LOGO + MATTER */}
        <div className="max-w-xl my-auto space-y-8">
          
          {/* PROMINENT SLIT-REVEAL ANIMATION (BIG SIZE: 76px) */}
          <div className="flex items-center gap-4 select-none">
            
            {/* 1. Logo Mark (Icon) */}
            <div
              className={`shrink-0 flex items-center transition-all duration-700 ease-out ${
                animating
                  ? "opacity-100 scale-100 translate-x-0"
                  : "opacity-0 scale-90 -translate-x-3"
              }`}
            >
              <Image
                src="/logo-mark.png"
                alt="LPU PATH Logo"
                width={88}
                height={76}
                className="h-14.5 sm:h-19 w-auto object-contain block"
                priority
              />
            </div>

            {/* 2. Vertical Divider Line */}
            <div
              style={{
                transitionDuration: "500ms",
                transitionDelay: "100ms",
              }}
              className={`w-[2.5px] sm:w-[3.5px] h-14.5 sm:h-19 bg-[#111111] rounded-full shrink-0 origin-center transition-all ease-out ${
                animating
                  ? "opacity-100 scale-y-100"
                  : "opacity-0 scale-y-0"
              }`}
            />

            {/* 3. Masked Container - Slit Reveal */}
            <div className="overflow-hidden h-14.5 sm:h-19 flex items-center pl-1.5 pr-2">
              <div
                style={{
                  transitionDuration: "850ms",
                  transitionDelay: "220ms",
                  transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                className={`h-14.5 sm:h-19 flex flex-col justify-between py-[1.5px] transition-all ${
                  animating
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-full"
                }`}
              >
                {/* Wordmark: LPU PATH */}
                <div className="flex items-baseline gap-1.5 sm:gap-2 leading-none">
                  <span
                    className="text-4xl sm:text-6xl font-black text-[#111111] tracking-[-0.035em] leading-none"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800 }}
                  >
                    LPU
                  </span>
                  <span
                    className="text-4xl sm:text-6xl font-black text-[#FF6500] tracking-[-0.035em] leading-none"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800 }}
                  >
                    PATH
                  </span>
                </div>

                {/* Tagline: KNOW BEFORE YOUR TURN. */}
                <div className="leading-none">
                  <p
                    className="text-[10px] sm:text-[14px] text-[#111111] uppercase tracking-[0.25em] font-semibold whitespace-nowrap leading-none"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}
                  >
                    KNOW BEFORE YOUR TURN.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* MATTER UNDERNEATH (Pure Clean Typography) */}
          <div className="space-y-3 pt-4 border-t border-[#E4E4E7] max-w-xl">
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#111111] tracking-tight">
              On-campus Placement Intelligence Platform
            </h3>
            <p className="text-xs sm:text-sm text-[#27272A] leading-relaxed font-normal">
              A comprehensive student-driven intelligence encyclopedia built exclusively around Lovely Professional University. Discover verified company hiring patterns, transparent CTC vs fixed in-hand breakdowns, branch cutoffs, and real interview assessment rounds and questions well before placement season.
            </p>
            <p className="text-xs sm:text-sm text-[#27272A] leading-relaxed font-normal">
              Stay ahead with verified on-campus internships, college hackathons, and student-organized competitive coding rounds — all verified and consolidated in one dependable platform.
            </p>
          </div>

        </div>

        {/* Bottom Trust Badge */}
        <div className="flex items-center gap-2 text-xs text-[#27272A] font-semibold">
          <GraduationCap className="w-4 h-4 text-[#FF6500]" />
          <span>Exclusively for verified LPU student accounts</span>
        </div>

      </div>

      {/* ============================================================== */}
      {/* 2. RIGHT SIDE: CURVED BLACK PANEL WITH REAL SUPABASE AUTH     */}
      {/* ============================================================== */}
      <div className="relative w-full lg:w-[52%] h-full flex items-center justify-center p-6 sm:p-12 lg:p-16 z-10 overflow-hidden lg:overflow-visible">
        
        {/* DESKTOP CURVED BLACK BACKGROUND SVG */}
        <div className="hidden lg:block absolute inset-0 pointer-events-none overflow-visible">
          <svg
            className="w-full h-full overflow-visible"
            viewBox="0 0 500 1000"
            preserveAspectRatio="none"
          >
            <path
              d="M -35,0 C 46,320 76,680 0,1000 L 500,1000 L 500,0 Z"
              fill="#E4E4E7"
            />
            <path
              d="M 6,0 C 82,320 82,680 6,1000 L 500,1000 L 500,0 Z"
              fill="#111111"
            />
          </svg>
        </div>

        {/* MOBILE FALLBACK */}
        <div className="lg:hidden absolute inset-0 bg-[#111111] rounded-3xl" />

        {/* THE SLIDING FORM CONTAINER */}
        <div className="relative z-20 w-full max-w-lg lg:max-w-xl lg:pl-14 lg:pr-4 overflow-hidden py-4">
          
          <div
            className={`w-full space-y-8 text-white transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${getSlideClass()}`}
          >
            
            {/* Header */}
            <div className="space-y-2">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {step === "email" ? "Student Verification" : "Verify OTP Code"}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                {step === "email"
                  ? "Enter your official university email to access the on-campus placement intelligence archive."
                  : `Enter the 8-digit verification code delivered to ${email}`}
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium">
                {error}
              </div>
            )}

            {/* Success Message (Resent Code Feedback) */}
            {successMessage && (
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>{successMessage}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSuccessMessage("")}
                  className="text-emerald-400 hover:text-white text-xs ml-2 cursor-pointer font-bold"
                >
                  ✕
                </button>
              </div>
            )}

            {/* STEP 1: EMAIL ENTRY */}
            {step === "email" ? (
              <form onSubmit={handleSendOtp} className="space-y-6">
                
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
                    Official LPU Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="universitymail@lpu.in"
                      className="w-full pl-11 pr-24 py-3.5 bg-zinc-900 border border-zinc-700/80 rounded-full text-sm text-white placeholder-zinc-500 outline-none focus:outline-none focus:ring-0 focus:border-white/30 transition-colors"
                      required
                    />
                    <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
                      <span className="text-[11px] font-bold text-zinc-300 bg-zinc-800 px-2.5 py-1 rounded-full border border-zinc-700">
                        @lpu.in
                      </span>
                    </div>
                  </div>
                </div>

                {/* Orange Action CTA Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-[#FF6500] hover:bg-[#E55B00] text-white text-sm font-bold rounded-full transition flex items-center justify-center cursor-pointer disabled:opacity-50"
                >
                  <span>{loading ? "Sending OTP Code..." : "Send Verification Code"}</span>
                </button>

                {/* Cloudflare Turnstile Automatic Verification (Below Button) */}
                <div className="flex justify-center min-h-[65px] items-center pt-1">
                  <Turnstile
                    ref={turnstileRef}
                    onVerify={handleTurnstileVerify}
                    onExpire={() => setCaptchaToken("")}
                    onError={() => setCaptchaToken("")}
                    theme="dark"
                  />
                </div>

              </form>
            ) : (
              /* STEP 2: 8-DIGIT OTP ENTRY */
              <form onSubmit={handleVerifyOtp} className="space-y-6">
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
                      Verification Passcode
                    </label>
                    <button
                      type="button"
                      onClick={handleBackToEmail}
                      className="text-xs text-[#FF6500] hover:underline cursor-pointer font-medium"
                    >
                      Change Email
                    </button>
                  </div>

                  <div className="grid grid-cols-8 gap-1.5 sm:gap-2">
                    {otp.map((digit, idx) => (
                      <input
                        key={idx}
                        id={`otp-${idx}`}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(idx, e)}
                        onPaste={(e) => {
                          e.preventDefault();
                          handlePasteDigits(e.clipboardData.getData("text"), idx);
                        }}
                        className="w-full h-11 sm:h-13 text-center text-lg sm:text-xl font-bold bg-zinc-900 border border-zinc-700/80 rounded-xl sm:rounded-2xl text-white focus:outline-none focus:border-white/40 transition"
                      />
                    ))}
                  </div>

                  <p className="text-[11px] text-zinc-500">
                    Enter the 8-digit passcode sent to your official university email.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-[#FF6500] hover:bg-[#E55B00] text-white text-sm font-bold rounded-full transition flex items-center justify-center cursor-pointer disabled:opacity-50"
                >
                  <span>{loading ? "Verifying..." : "Verify & Access Platform"}</span>
                </button>

                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setOtp(["", "", "", "", "", "", "", ""]);
                      setError("");
                    }}
                    className="text-xs text-zinc-400 hover:text-white inline-flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Clear Digits</span>
                  </button>

                  <a
                    href="https://outlook.office.com/mail/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-[#0078D4] hover:text-[#2899f5] font-semibold transition cursor-pointer"
                  >
                    <span>Open LPU Outlook</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* "Didn't find code?" Guide Trigger */}
                <div className="pt-2 text-center">
                  <button
                    type="button"
                    onClick={() => setShowHelpModal(true)}
                    className="text-xs text-zinc-200 hover:text-white transition inline-flex items-center gap-1.5 cursor-pointer font-medium"
                  >
                    <span>Didn&apos;t find your code?</span>
                    <span className="text-[#FF6500] hover:text-[#FF8533] underline underline-offset-4 font-bold transition">View Guide</span>
                  </button>
                </div>

              </form>
            )}

            {/* Bottom Security Assurance */}
            <div className="pt-6 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-500">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Passwordless OTP Session
              </span>
              <span>Exclusively LPU</span>
            </div>

          </div>

        </div>

      </div>

      {/* ============================================================== */}
      {/* 3. MICROSOFT DEFENDER QUARANTINE RELEASE GUIDE MODAL           */}
      {/* ============================================================== */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto bg-[#161616] border border-zinc-800 rounded-2xl p-6 sm:p-7 text-white shadow-2xl space-y-5">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-transparent border border-sky-500/40">
                  <Image
                    src="/defender-shield.png"
                    alt="Microsoft Defender"
                    width={18}
                    height={18}
                    className="w-4 h-4 object-contain"
                  />
                  <span className="text-[10.5px] font-bold text-sky-400 uppercase tracking-wider">
                    Microsoft Quarantine Guide
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight pt-1">
                  Releasing Your Code from Quarantine
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  LPU email filters temporarily hold external automated emails in Microsoft Defender Quarantine. Follow these steps to release your verification code in 30 seconds:
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowHelpModal(false)}
                className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800 transition cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Direct Quarantine Portal Hero Button (Only Blue Border, No BG) */}
            <a
              href="https://security.microsoft.com/quarantine"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 bg-transparent hover:bg-zinc-900/70 text-white rounded-xl transition flex items-center justify-between group cursor-pointer border border-[#0078D4] hover:border-sky-400"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
                  <Image
                    src="/defender-shield.png"
                    alt="Microsoft Defender"
                    width={20}
                    height={20}
                    className="w-5 h-5 object-contain"
                  />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>Open Microsoft Quarantine Portal</span>
                  </div>
                  <div className="text-[11px] text-zinc-400 font-mono group-hover:text-zinc-300">
                    security.microsoft.com/quarantine
                  </div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#0078D4] group-hover:text-sky-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
            </a>

            {/* Step-by-Step Instructions */}
            <div className="space-y-2.5 text-xs">
              
              {/* Step 1 */}
              <div className="flex items-start gap-3 p-3 rounded-xl bg-zinc-900/80 border border-zinc-800/80">
                <span className="w-5 h-5 rounded-full border border-[#0078D4]/70 text-sky-400 font-extrabold flex items-center justify-center text-[11px] shrink-0 mt-0.5">
                  1
                </span>
                <div className="space-y-0.5">
                  <div className="font-bold text-white">Click Portal Link &amp; Sign In</div>
                  <p className="text-zinc-400 leading-relaxed text-[11.5px]">
                    Open the link above. It will automatically log in with your saved LPU university Microsoft account.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-3 p-3 rounded-xl bg-zinc-900/80 border border-zinc-800/80">
                <span className="w-5 h-5 rounded-full border border-[#0078D4]/70 text-sky-400 font-extrabold flex items-center justify-center text-[11px] shrink-0 mt-0.5">
                  2
                </span>
                <div className="space-y-0.5">
                  <div className="font-bold text-white">Select LPU PATH Email</div>
                  <p className="text-zinc-400 leading-relaxed text-[11.5px]">
                    In your Quarantine messages table, locate and click the email from <strong className="text-white">verify@lpupath.online</strong> (Sender: <em>LPU PATH</em>).
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-3 p-3 rounded-xl bg-zinc-900/80 border border-zinc-800/80">
                <span className="w-5 h-5 rounded-full border border-[#0078D4]/70 text-sky-400 font-extrabold flex items-center justify-center text-[11px] shrink-0 mt-0.5">
                  3
                </span>
                <div className="space-y-1">
                  <div className="font-bold text-white">Click &quot;Release message&quot; &amp; Check Threat Box</div>
                  <p className="text-zinc-400 leading-relaxed text-[11.5px]">
                    Click the <strong>Release message</strong> button at the top. On the panel that opens, tick the checkbox:
                  </p>
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-zinc-800/90 border border-zinc-700/80 text-[11px] text-emerald-400 font-medium">
                    <span>☑</span>
                    <span className="text-white font-semibold">Report message having no threats</span>
                  </div>
                  <p className="text-zinc-400 text-[11px]">
                    Then click the blue <strong>Release message</strong> button at the bottom.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex items-start gap-3 p-3 rounded-xl bg-zinc-900/80 border border-zinc-800/80">
                <span className="w-5 h-5 rounded-full border border-[#0078D4]/70 text-sky-400 font-extrabold flex items-center justify-center text-[11px] shrink-0 mt-0.5">
                  4
                </span>
                <div className="space-y-0.5">
                  <div className="font-bold text-white">Click &quot;Done&quot; &amp; Open Outlook Inbox</div>
                  <p className="text-zinc-400 leading-relaxed text-[11.5px]">
                    You will see a success notification: <em>&quot;Messages released to your inbox&quot;</em>. Click <strong>Done</strong>. Your 8-digit verification code will now appear directly in your regular Outlook Inbox!
                  </p>
                </div>
              </div>

            </div>

            {/* Modal Actions */}
            <div className="space-y-2 pt-1 border-t border-zinc-800/80">
              <div className="flex items-center gap-2">
                <a
                  href="https://outlook.office.com/mail/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 text-white text-xs font-semibold rounded-full transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Open LPU Outlook</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-sky-400" />
                </a>

                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={loading || cooldown > 0}
                  className="flex-1 py-2.5 bg-[#FF6500] hover:bg-[#E55B00] text-white text-xs font-bold rounded-full transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading
                    ? "Resending..."
                    : cooldown > 0
                    ? `Resend in ${cooldown}s`
                    : "Resend Passcode"}
                </button>
              </div>

              <button
                type="button"
                onClick={() => setShowHelpModal(false)}
                className="w-full py-2 bg-transparent hover:bg-zinc-900 text-zinc-400 hover:text-white text-xs font-medium rounded-full transition cursor-pointer"
              >
                Close Guide
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
