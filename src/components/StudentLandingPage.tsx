"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { ArrowRight, Compass } from "lucide-react";

interface StudentLandingPageProps {
  email: string;
  onSignOut: () => void;
}

// High-Performance Smooth Count-Up Animation Component
function CountUp({
  target,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1600,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Smooth cubic ease-out
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setValue(easeOut * target);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setValue(target);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [target, duration]);

  return (
    <span>
      {prefix}
      {decimals > 0 ? value.toFixed(decimals) : Math.round(value)}
      {suffix}
    </span>
  );
}

export default function StudentLandingPage({ email, onSignOut }: StudentLandingPageProps) {
  return (
    <div className="min-h-screen bg-white text-[#111111] flex flex-col font-sans selection:bg-[#FF6500] selection:text-white">
      {/* 1. TOP NAVBAR */}
      <Navbar userEmail={email} onSignOut={onSignOut} />

      {/* ============================================================== */}
      {/* 2. HERO SECTION WITH MINIMAL CORPORATE WAVE CURVES             */}
      {/* ============================================================== */}
      <section className="flex-1 w-full bg-white relative overflow-hidden flex items-center min-h-[calc(100vh-72px)]">
        
        {/* RISING EXPANDING WAVE BACKDROP (Continuous Steep Upward Flow into Navbar without any Dome/Corner Down-Curl) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg
            className="w-full h-full"
            viewBox="0 0 1440 800"
            preserveAspectRatio="none"
          >
            {/* Wave Layer 1: Soft Warm Peach/White Ascending Wave - Shoots straight up into navbar */}
            <path
              d="M 0,710 C 600,740 920,220 1050,0 L 1440,0 L 1440,800 L 0,800 Z"
              fill="#FFF5EB"
            />

            {/* Wave Layer 2: Refined Warm Orange Ascending Ribbon - Shoots straight up into navbar */}
            <path
              d="M 0,742 C 630,770 1000,240 1150,0 L 1440,0 L 1440,800 L 0,800 Z"
              fill="#F26522"
            />

            {/* Wave Layer 3: Solid Natural Obsidian Black - Shoots straight up into navbar */}
            <path
              d="M 0,770 C 660,795 1080,260 1250,0 L 1440,0 L 1440,800 L 0,800 Z"
              fill="#111111"
            />
          </svg>
        </div>

        {/* Hero Content (Full Width Grid) */}
        <div className="relative z-10 w-full px-6 sm:px-12 lg:px-16 xl:px-24 py-10 lg:py-16">
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-center">
            
            {/* HERO LEFT COLUMN: Matter & CTAs (Elevated Upwards for Perfect Balance) */}
            <div className="lg:col-span-7 xl:col-span-7 space-y-6 -translate-y-4 lg:-translate-y-8">
              
              {/* Main Headline (Clean Corporate Size) */}
              <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-black text-[#111111] tracking-tight leading-[1.14]">
                Crack Your Dream Company <br />
                <span className="text-[#FF6500]">on Campus.</span>
              </h1>

              {/* Subtitle Matter */}
              <p className="text-sm sm:text-base text-[#52525B] leading-relaxed max-w-xl font-normal">
                An exclusive student-driven intelligence encyclopedia built specifically around Lovely Professional University. Discover verified company hiring patterns, transparent fixed in-hand salaries vs CTC, branch cutoffs, and real interview assessment questions well before placement season.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                <button
                  type="button"
                  className="px-6 py-3.5 bg-[#FF6500] hover:bg-[#E55B00] text-white text-sm font-bold rounded-full transition flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>Explore Companies Directory</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  className="px-6 py-3.5 bg-white hover:bg-[#F4F4F5] text-[#111111] text-sm font-bold border border-zinc-300 hover:border-zinc-400 rounded-full transition flex items-center gap-2 cursor-pointer"
                >
                  <Compass className="w-4 h-4 text-[#FF6500]" />
                  <span>Campus Tier Breakdown</span>
                </button>
              </div>

            </div>

            {/* HERO RIGHT COLUMN: Vector Image Slot + Placement Metric Cards */}
            <div className="lg:col-span-5 xl:col-span-5 flex flex-col items-center justify-center w-full max-w-[500px] mx-auto">
              
              {/* Vector Image Slot: Sits flush directly on top of the metric cards */}
              <div className="relative w-full max-w-[460px] flex items-end justify-center -mb-2 z-10">
                <Image
                  src="/hero-pathway-guide.png"
                  alt="LPU PATH Placement Intelligence Guide"
                  width={512}
                  height={341}
                  className="w-full h-auto object-contain block"
                  priority
                />
              </div>

              {/* 4 Placement Metric Cards (Grounded flush beneath the illustration) */}
              <div className="w-full grid grid-cols-2 gap-3 sm:gap-4 relative z-20">
                <div className="bg-white/95 backdrop-blur-sm border border-[#E4E4E7] rounded-2xl p-4 sm:p-5 transition hover:border-[#FF6500]/50 shadow-sm">
                  <div className="text-2xl sm:text-3xl font-black text-[#111111] tracking-tight">
                    <CountUp target={50} suffix="+" duration={1600} />
                  </div>
                  <div className="text-xs text-[#71717A] font-semibold mt-1">Companies Profiled</div>
                </div>

                <div className="bg-white/95 backdrop-blur-sm border border-[#E4E4E7] rounded-2xl p-4 sm:p-5 transition hover:border-[#FF6500]/50 shadow-sm">
                  <div className="text-2xl sm:text-3xl font-black text-[#FF6500] tracking-tight">
                    <CountUp target={2.5} prefix="₹" suffix=" Cr" decimals={1} duration={1800} />
                  </div>
                  <div className="text-xs text-[#71717A] font-semibold mt-1">Highest LPU Offer</div>
                </div>

                <div className="bg-white/95 backdrop-blur-sm border border-[#E4E4E7] rounded-2xl p-4 sm:p-5 transition hover:border-[#FF6500]/50 shadow-sm">
                  <div className="text-2xl sm:text-3xl font-black text-[#111111] tracking-tight">
                    <CountUp target={200} suffix="+" duration={1700} />
                  </div>
                  <div className="text-xs text-[#71717A] font-semibold mt-1">OA Questions Vault</div>
                </div>

                <div className="bg-white/95 backdrop-blur-sm border border-[#E4E4E7] rounded-2xl p-4 sm:p-5 transition hover:border-[#FF6500]/50 shadow-sm">
                  <div className="text-2xl sm:text-3xl font-black text-emerald-600 tracking-tight">
                    <CountUp target={100} suffix="%" duration={1500} />
                  </div>
                  <div className="text-xs text-[#71717A] font-semibold mt-1">Student Verified</div>
                </div>
              </div>

            </div>

          </div>
        </div>

      </section>

    </div>
  );
}
