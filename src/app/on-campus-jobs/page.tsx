"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CAMPUS_JOB_STATS,
  CAMPUS_AVAILABLE_JOBS,
  PART_TIME_PROCESS_STEPS,
  STUDENT_WORK_ELIGIBILITY_POINTS,
  UMS_NAVIGATION_LINKS,
} from "@/data/campusJobs";
import {
  ChevronRight,
  Star,
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

// Plain Borderless KPI Metric Card
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
      className={`${stat.bgClass} rounded-xs p-6 sm:p-7 min-h-[140px] flex flex-col justify-start transition-all duration-200 hover:-translate-y-1 hover:shadow-sm select-none text-left cursor-pointer group`}
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
      {/* MAIN SECTION */}
      <main className="flex-1 w-full bg-[#FAFAFA] py-16 sm:py-20 lg:py-24 px-6 sm:px-12 lg:px-16 xl:px-24 relative overflow-hidden select-none">
        <div className="max-w-7xl mx-auto space-y-16">
          
          {/* Page Header (Left: Single Line Title + Matter | Right: Vector Artwork with Baseline Line) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center text-left">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 xl:col-span-7 space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-[48px] xl:text-[52px] font-black text-[#111111] tracking-tight leading-none whitespace-nowrap">
                Earn While You <span className="text-[#FF6500]">Learn</span>
              </h1>

              <div className="space-y-2.5 max-w-xl text-[#52525B] text-sm sm:text-base leading-relaxed font-normal">
                <p>
                  Students have the option to work part-time jobs on campus to help make college more affordable while gaining verified professional experience across various university divisions.
                </p>
                <p className="text-xs sm:text-sm text-[#71717A]">
                  Explore verified campus work profiles, stipend guidelines, step-by-step onboarding workflows, and official UMS registration procedures.
                </p>
              </div>
            </div>

            {/* Right Vector Illustration with Horizontal Cut Baseline */}
            <div className="lg:col-span-5 xl:col-span-5 flex flex-col items-center justify-center lg:justify-end">
              <div className="relative w-full max-w-[460px] flex flex-col items-center">
                <Image
                  src="/campus-assistants-vector.png"
                  alt="LPU PATH Campus Student Assistants - Earn While You Learn"
                  width={512}
                  height={341}
                  className="w-full h-auto object-contain block"
                  priority
                  unoptimized
                />
                {/* Horizontal Cut Line */}
                <div className="w-full h-[2px] bg-[#111111] -mt-[1px]" />
              </div>
            </div>

          </div>

          {/* 4 HORIZONTAL KEY METRIC CARDS (BORDERLESS PLAIN COLORS) */}
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
            <h2 className="text-2xl sm:text-3xl font-black text-[#111111] tracking-tight">
              On Campus Available Jobs
            </h2>

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
            <h2 className="text-2xl sm:text-3xl font-black text-[#111111] tracking-tight">
              Process Flow of Part-time Job
            </h2>

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
            <h2 className="text-2xl sm:text-3xl font-black text-[#111111] tracking-tight">
              Student’s Work Eligibility Criteria:
            </h2>

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
            <h2 className="text-2xl sm:text-3xl font-black text-[#111111] tracking-tight">
              Important Links
            </h2>

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

            {/* Centered Orange UMS Action Button */}
            <div className="pt-6 sm:pt-8 flex justify-center">
              <a
                href="https://ums.lpu.in/lpuums/frmPartTimeJobs.aspx"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-3.5 sm:py-4 bg-[#FF6500] hover:bg-[#E55B00] text-white text-sm sm:text-base font-medium rounded-full shadow-sm hover:shadow-md transition-all duration-200 select-none cursor-pointer group"
              >
                <span>Apply Now — Open UMS</span>
                <ExternalLink className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Bottom Back to Home CTA */}
          <div className="pt-12 sm:pt-16 pb-8 border-t border-[#E4E4E7] flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-7 py-3 bg-[#111111] text-white text-sm font-medium rounded-full transition-all duration-200 select-none cursor-pointer"
            >
              Back to Overview
            </Link>

            <p className="text-xs text-[#71717A] font-semibold text-center sm:text-right">
              LPU PATH — On-Campus Placement &amp; Employment Intelligence
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}
