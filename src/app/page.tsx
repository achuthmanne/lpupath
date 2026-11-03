"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { createClient } from "@/lib/supabase/client";
import { Mail, CheckCircle2, RotateCcw, GraduationCap, ShieldCheck } from "lucide-react";

export default function Home() {
  const [supabase] = useState(() => createClient());
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [step, setStep] = useState<"email" | "otp">("email");
  const [transitionStage, setTransitionStage] = useState<"idle" | "exiting" | "entering">("idle");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

    const timer = setTimeout(() => {
      setAnimating(true);
    }, 200);
    return () => clearTimeout(timer);
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

    const isLpu = trimmed.endsWith("@lpu.in") || trimmed.endsWith("@lpu.co.in");
    if (!isLpu) {
      setError("Only official university emails ending in @lpu.in are allowed");
      return;
    }

    setLoading(true);

    try {
      // Trigger Supabase Email OTP
      const { error: otpError } = await supabase.auth.signInWithOtp({
        email: trimmed,
        options: {
          shouldCreateUser: true,
        },
      });

      if (otpError) {
        setLoading(false);
        setError(otpError.message);
        return;
      }

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
    setTransitionStage("exiting");

    setTimeout(() => {
      setStep("email");
      setTransitionStage("entering");

      setTimeout(() => {
        setTransitionStage("idle");
      }, 50);
    }, 380);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  // Handle Real Supabase OTP Verification
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const enteredToken = otp.join("").trim();
    if (enteredToken.length < 6) {
      setError("Please enter the complete 6-digit verification code");
      return;
    }

    setLoading(true);

    try {
      const { data, error: verifyError } = await supabase.auth.verifyOtp({
        email: email.trim().toLowerCase(),
        token: enteredToken,
        type: "email",
      });

      if (verifyError) {
        setLoading(false);
        setError(verifyError.message || "Invalid or expired verification code");
        return;
      }

      if (data.session) {
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
    setOtp(["", "", "", "", "", ""]);
  };

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-white text-[#111111] flex flex-col">
        <Navbar />
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 py-10">
          <div className="p-8 rounded-2xl border border-[#E4E4E7] bg-[#FAFAFA] flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 mb-2">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Verified Student Access
              </div>
              <h1 className="text-2xl font-black text-[#111111]">
                Welcome to LPU PATH
              </h1>
              <p className="text-sm text-[#71717A] mt-1">
                Signed in as <span className="font-semibold text-[#111111]">{email}</span>
              </p>
            </div>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 text-xs font-semibold text-[#71717A] hover:text-[#111111] bg-white border border-[#E4E4E7] rounded-xl transition cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </main>
      </div>
    );
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
          <div className="w-[3px] h-4 bg-[#FF6500] rounded-full flex-shrink-0" />
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
              className={`flex-shrink-0 flex items-center transition-all duration-700 ease-out ${
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
                className="h-[58px] sm:h-[76px] w-auto object-contain block"
                priority
              />
            </div>

            {/* 2. Vertical Divider Line */}
            <div
              style={{
                transitionDuration: "500ms",
                transitionDelay: "100ms",
              }}
              className={`w-[2.5px] sm:w-[3.5px] h-[58px] sm:h-[76px] bg-[#111111] rounded-full flex-shrink-0 origin-center transition-all ease-out ${
                animating
                  ? "opacity-100 scale-y-100"
                  : "opacity-0 scale-y-0"
              }`}
            />

            {/* 3. Masked Container - Slit Reveal */}
            <div className="overflow-hidden h-[58px] sm:h-[76px] flex items-center pl-1.5 pr-2">
              <div
                style={{
                  transitionDuration: "850ms",
                  transitionDelay: "220ms",
                  transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                className={`h-[58px] sm:h-[76px] flex flex-col justify-between py-[1.5px] transition-all ${
                  animating
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-full"
                }`}
              >
                {/* Wordmark: LPU PATH */}
                <div className="flex items-baseline gap-1.5 sm:gap-2 leading-none">
                  <span
                    className="text-4xl sm:text-6xl font-black text-[#111111] tracking-[-0.035em] leading-none"
                    style={{ fontWeight: 800 }}
                  >
                    LPU
                  </span>
                  <span
                    className="text-4xl sm:text-6xl font-black text-[#FF6500] tracking-[-0.035em] leading-none"
                    style={{ fontWeight: 800 }}
                  >
                    PATH
                  </span>
                </div>

                {/* Tagline: KNOW BEFORE YOUR TURN. */}
                <div className="leading-none">
                  <p
                    className="text-[10px] sm:text-[14px] text-[#111111] uppercase tracking-[0.25em] font-semibold whitespace-nowrap leading-none"
                    style={{ fontWeight: 600 }}
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
      <div className="relative w-full lg:w-[52%] h-full flex items-center justify-center p-6 sm:p-12 lg:p-16 z-10 overflow-hidden">
        
        {/* DESKTOP CURVED BLACK BACKGROUND SVG */}
        <div className="hidden lg:block absolute inset-0 pointer-events-none">
          <svg
            className="w-full h-full"
            viewBox="0 0 500 1000"
            preserveAspectRatio="none"
          >
            <path
              d="M 0,0 C 76,320 76,680 0,1000 L 500,1000 L 500,0 Z"
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
                  : `Enter the 6-digit code delivered to ${email}`}
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium">
                {error}
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

              </form>
            ) : (
              /* STEP 2: 6-DIGIT OTP ENTRY */
              <form onSubmit={handleVerifyOtp} className="space-y-6">
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
                      6-Digit Security OTP
                    </label>
                    <button
                      type="button"
                      onClick={handleBackToEmail}
                      className="text-xs text-[#FF6500] hover:underline cursor-pointer font-medium"
                    >
                      Change Email
                    </button>
                  </div>

                  <div className="grid grid-cols-6 gap-2 sm:gap-2.5">
                    {otp.map((digit, idx) => (
                      <input
                        key={idx}
                        id={`otp-${idx}`}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                        className="w-full h-12 sm:h-14 text-center text-xl font-bold bg-zinc-900 border border-zinc-700/80 rounded-2xl text-white focus:outline-none focus:border-white/40 transition"
                      />
                    ))}
                  </div>

                  <p className="text-[11px] text-zinc-500">
                    Enter the 6-digit one-time password sent to your inbox.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-[#FF6500] hover:bg-[#E55B00] text-white text-sm font-bold rounded-full transition flex items-center justify-center cursor-pointer disabled:opacity-50"
                >
                  <span>{loading ? "Verifying..." : "Verify & Access Platform"}</span>
                </button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setOtp(["", "", "", "", "", ""]);
                      setError("");
                    }}
                    className="text-xs text-zinc-400 hover:text-white inline-flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Clear Digits</span>
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

    </div>
  );
}
