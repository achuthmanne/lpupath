"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
  CAMPUS_JOB_STATS,
  CAMPUS_AVAILABLE_JOBS,
  PART_TIME_PROCESS_STEPS,
  STUDENT_WORK_ELIGIBILITY_POINTS,
  UMS_NAVIGATION_LINKS,
} from "@/data/campusJobs";
import {
  ArrowLeft,
  ChevronRight,
  Star,
  Briefcase,
  Layers,
  GraduationCap,
  ExternalLink,
} from "lucide-react";

// Smooth Count-Up Animation Component with Scroll & Re-Trigger Support
function CountUp({
  target,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1000,
  trigger = 0,
  enabled = true,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  trigger?: number;
  enabled?: boolean;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!enabled) {
      setValue(0);
      return;
    }

    let start = 0;
    const startTime = performance.now();

    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Quad ease-out curve
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + (target - start) * eased;

      setValue(current);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        setValue(target);
      }
    };

    requestAnimationFrame(update);
  }, [target, duration, trigger, enabled]);

  const formatted =
    decimals > 0
      ? value.toFixed(decimals)
      : Math.floor(value).toLocaleString();

  return (
    <span>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

// Interactive Card with Scroll-Triggered & Mouse Hover-Triggered Count Animation
function CampusStatCard({
  stat,
  viewTrigger,
  hasEnteredView,
}: {
  stat: (typeof CAMPUS_JOB_STATS)[number];
  viewTrigger: number;
  hasEnteredView: boolean;
}) {
  const [hoverTrigger, setHoverTrigger] = useState(0);

  return (
    <div
      onMouseEnter={() => setHoverTrigger((h) => h + 1)}
      className={`${stat.bgClass} ${stat.borderClass} ${stat.hoverClass} border rounded-xs p-6 sm:p-7 min-h-[140px] flex flex-col justify-start transition-all duration-200 hover:-translate-y-1 hover:shadow-sm select-none text-left cursor-pointer group`}
    >
      <div
        className={`text-3xl sm:text-4xl lg:text-[42px] font-black ${stat.numberColor} tracking-tight leading-none mb-3 tabular-nums transition-transform duration-200 group-hover:scale-105 origin-left`}
      >
        <CountUp
          target={stat.target}
          suffix={stat.suffix}
          duration={1000}
          trigger={viewTrigger + hoverTrigger}
          enabled={hasEnteredView}
        />
      </div>
      <p className="text-sm font-semibold text-[#111111] leading-snug">
        {stat.label}
      </p>
    </div>
  );
}

export default function OnCampusJobsPage() {
  // Scroll-triggered viewport observer for KPI stat cards
  const [statsViewTrigger, setStatsViewTrigger] = useState(0);
  const [statsEnteredView, setStatsEnteredView] = useState(false);
  const statsSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = statsSectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsEnteredView(true);
          setStatsViewTrigger((t) => t + 1);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#111111] flex flex-col font-sans selection:bg-[#FF6500] selection:text-white">
      {/* 1. TOP NAVBAR */}
      <Navbar />

      {/* 2. SUB-BAR WITH BACK NAVIGATION & BREADCRUMBS */}
      <div className="w-full bg-[#FAFAFA] border-b border-[#E4E4E7] py-3.5 px-6 sm:px-12 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#111111] hover:text-[#FF6500] transition group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Overview</span>
          </Link>

          <div className="hidden sm:flex items-center gap-2 text-xs text-[#71717A] font-semibold">
            <span>UMS Integration</span>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
            <span className="text-[#111111] font-bold">On-Campus Jobs Directory</span>
          </div>
        </div>
      </div>

      {/* 3. MAIN SECTION */}
      <main className="flex-1 w-full bg-[#FAFAFA] py-12 sm:py-16 lg:py-20 px-6 sm:px-12 lg:px-16 xl:px-24 relative overflow-hidden select-none">
        <div className="max-w-7xl mx-auto space-y-16">
          
          {/* Page Header */}
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#E4E4E7] rounded-xs text-[11px] font-bold tracking-widest uppercase text-[#FF6500]">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Earn While You Learn on Campus</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-black text-[#111111] tracking-tight leading-[1.15]">
              On-Campus Available Jobs <br />
              <span className="text-[#FF6500]">&amp; Student Assistantships.</span>
            </h1>

            <p className="text-sm sm:text-base text-[#52525B] max-w-2xl mx-auto font-normal leading-relaxed">
              Students have the option to work part-time jobs on campus to help make college more affordable while gaining verified professional experience across various university divisions.
            </p>
          </div>

          {/* 4 HORIZONTAL KEY METRIC CARDS */}
          <div
            ref={statsSectionRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 lg:gap-5 max-w-7xl mx-auto"
          >
            {CAMPUS_JOB_STATS.map((stat) => (
              <CampusStatCard
                key={stat.id}
                stat={stat}
                viewTrigger={statsViewTrigger}
                hasEnteredView={statsEnteredView}
              />
            ))}
          </div>

          {/* ========================================================= */}
          {/* ON CAMPUS AVAILABLE JOBS (16 VERIFIED PROFILES)           */}
          {/* ========================================================= */}
          <div className="pt-6 sm:pt-10 space-y-6 text-left">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#E4E4E7] pb-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-[#111111] tracking-tight">
                  On Campus Available Jobs
                </h2>
                <p className="text-xs sm:text-sm text-[#71717A] mt-1 font-medium">
                  16 verified student assistantship roles offered across academic and administrative departments
                </p>
              </div>
              <div className="text-xs font-mono font-bold text-[#FF6500] uppercase tracking-wider">
                16 Profiles Listed
              </div>
            </div>

            {/* 4 Cards Per Row Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
              {CAMPUS_AVAILABLE_JOBS.map((job) => (
                <div
                  key={job.id}
                  className="bg-[#F1F1F4] border border-[#DCDCE0] rounded-xs p-7 sm:p-8 min-h-[220px] sm:min-h-[240px] flex flex-col justify-start select-none text-left"
                >
                  {/* Fixed 2-line height title container */}
                  <div className="h-[60px] sm:h-[68px] lg:h-[72px] flex items-center mb-3">
                    <h3 className="text-xl sm:text-2xl font-black text-[#111111] tracking-tight leading-[1.2]">
                      {job.title}
                    </h3>
                  </div>
                  {/* Description starts on the exact same baseline across all cards */}
                  <p className="text-sm sm:text-[15px] text-[#4B5563] leading-relaxed font-normal">
                    {job.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ========================================================= */}
          {/* PROCESS FLOW OF PART-TIME JOB (4 STEPS HORIZONTAL FLOW)  */}
          {/* ========================================================= */}
          <div className="pt-8 sm:pt-12 space-y-6 text-left">
            <div className="border-b border-[#E4E4E7] pb-4">
              <h2 className="text-2xl sm:text-3xl font-black text-[#111111] tracking-tight">
                Process Flow of Part-time Job
              </h2>
              <p className="text-xs sm:text-sm text-[#71717A] mt-1 font-medium">
                Official university onboarding workflow from initial announcement to final HR joining
              </p>
            </div>

            {/* 4 Cards In A Row (Linear Process Flow) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
              {PART_TIME_PROCESS_STEPS.map((step) => (
                <div
                  key={step.number}
                  className="bg-white border border-[#E4E4E7] rounded-xs p-7 sm:p-8 min-h-[200px] flex flex-col justify-start select-none text-left relative"
                >
                  {/* Monospace Step Number */}
                  <div className="text-3xl sm:text-4xl font-black text-[#111111] tracking-tight mb-3 font-mono">
                    {step.number}
                  </div>

                  {/* Title Area */}
                  <div className="h-[54px] sm:h-[60px] flex items-center mb-2.5">
                    <h3 className="text-lg sm:text-xl font-bold text-[#111111] tracking-tight leading-snug">
                      {step.title}{" "}
                      {step.subtext && (
                        <span className="text-xs font-normal text-[#71717A] block">
                          {step.subtext}
                        </span>
                      )}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-[13px] text-[#52525B] leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ========================================================= */}
          {/* STUDENT'S WORK ELIGIBILITY CRITERIA (POINTS WITH STARS)   */}
          {/* ========================================================= */}
          <div className="pt-8 sm:pt-12 space-y-6 text-left">
            <div className="border-b border-[#E4E4E7] pb-4">
              <h2 className="text-2xl sm:text-3xl font-black text-[#111111] tracking-tight">
                Student’s Work Eligibility Criteria:
              </h2>
              <p className="text-xs sm:text-sm text-[#71717A] mt-1 font-medium">
                Mandatory criteria required by the Division of Student Welfare before applying
              </p>
            </div>

            {/* Direct Points with Filled Black Stars */}
            <div className="space-y-4 sm:space-y-5 select-none pl-1">
              {STUDENT_WORK_ELIGIBILITY_POINTS.map((point, idx) => (
                <div key={idx} className="flex items-start gap-3.5 sm:gap-4">
                  <Star className="w-4 h-4 fill-[#111111] text-[#111111] shrink-0 mt-1" />
                  <p className="text-sm sm:text-[15px] lg:text-base text-[#27272A] font-medium leading-relaxed">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ========================================================= */}
          {/* IMPORTANT LINKS (UMS STEP-BY-STEP NAVIGATION BREADCRUMBS) */}
          {/* ========================================================= */}
          <div className="pt-8 sm:pt-12 space-y-6 text-left">
            <div className="border-b border-[#E4E4E7] pb-4">
              <h2 className="text-2xl sm:text-3xl font-black text-[#111111] tracking-tight">
                Important Links &amp; UMS Navigation
              </h2>
              <p className="text-xs sm:text-sm text-[#71717A] mt-1 font-medium">
                Step-by-step breadcrumb paths to register and review official policy in University Management System
              </p>
            </div>

            {/* 2 Wide Monospace Breadcrumb Navigation Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
              {UMS_NAVIGATION_LINKS.map((nav) => (
                <div
                  key={nav.id}
                  className="bg-white border border-[#E4E4E7] rounded-xs p-7 sm:p-8 flex flex-col justify-between space-y-5 select-none text-left"
                >
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-[#111111] tracking-tight mb-2">
                      {nav.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed font-normal">
                      {nav.description}
                    </p>
                  </div>

                  {/* UMS Breadcrumb Terminal Box */}
                  <div className="bg-[#18181B] text-[#D4D4D8] rounded-xs p-4 sm:p-5 border border-[#27272A] font-mono text-xs leading-relaxed flex flex-wrap items-center gap-1.5 select-text">
                    {nav.path.map((segment, sIdx) => {
                      const isLast = sIdx === nav.path.length - 1;
                      return (
                        <span key={sIdx} className="inline-flex items-center gap-1.5">
                          <span
                            className={
                              isLast
                                ? "text-[#FF6500] font-black tracking-wide"
                                : "text-zinc-300 font-semibold"
                            }
                          >
                            {segment}
                          </span>
                          {!isLast && (
                            <ChevronRight className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
                          )}
                        </span>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Back to Home CTA */}
          <div className="pt-12 sm:pt-16 pb-8 border-t border-[#E4E4E7] flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#111111] hover:bg-[#FF6500] text-white text-sm font-bold rounded-xs transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Overview</span>
            </Link>

            <p className="text-xs text-[#71717A] font-semibold text-center sm:text-right">
              Lovely Professional University — On-Campus Placement &amp; Employment Intelligence
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}
