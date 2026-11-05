"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarPlus } from "lucide-react";

const OPPORTUNITY_TABS = [
  { id: "all", label: "All Opportunities" },
  { id: "hackathons", label: "Hackathons & Ideathons" },
  { id: "contests", label: "Coding Contests" },
  { id: "hiring", label: "Hiring Challenges (Jobs)" },
  { id: "internships", label: "Internships" },
];

export default function CompetitionsPage() {
  const [activeTab, setActiveTab] = useState<string>("all");
  return (
    <div className="min-h-screen bg-white text-[#111111] flex flex-col font-sans selection:bg-[#FF6500] selection:text-white">
      {/* MAIN SECTION */}
      <main className="flex-1 w-full bg-[#FAFAFA] py-16 sm:py-20 lg:py-24 px-6 sm:px-12 lg:px-16 xl:px-24 relative overflow-hidden select-none">
        <div className="max-w-7xl mx-auto space-y-16">
          
          {/* Page Header (Left: Single Line Title + Matter | Right: Vector Artwork Placeholder with Baseline Line) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center text-left">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 xl:col-span-7 space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-[48px] xl:text-[52px] font-black text-[#111111] tracking-tight leading-none whitespace-nowrap">
                Competitions &amp; <span className="text-[#FF6500]">Hiring</span>
              </h1>

              <div className="space-y-2.5 max-w-xl text-[#52525B] text-sm sm:text-base leading-relaxed font-normal">
                <p>
                  From intra-university hackathons and live coding contests to corporate hiring challenges and internships — discover every verified opportunity to build with peers, test your skills, and get recruited.
                </p>
                <p className="text-xs sm:text-sm text-[#71717A]">
                  Participate in live algorithmic sprints, collaborate with multidisciplinary peer teams, showcase working prototypes to industry mentors, and win recognized accolades.
                </p>
              </div>
            </div>

            {/* Right Vector Illustration with Horizontal Cut Baseline */}
            <div className="lg:col-span-5 xl:col-span-5 flex flex-col items-center justify-center lg:justify-end">
              <div className="relative w-full max-w-[460px] flex flex-col items-center">
                <Image
                  src="/hackathons-vector.png"
                  alt="LPU PATH Competitions, Hackathons & Hiring - Compete, Build, Get Hired"
                  width={1024}
                  height={640}
                  className="w-full h-auto object-contain block"
                  priority
                  unoptimized
                />
                {/* Signature Horizontal Baseline Cut Line */}
                <div className="w-full h-[2px] bg-[#111111] -mt-[1px]" />
              </div>
            </div>

          </div>

          {/* FULL WIDTH HORIZONTAL DIVIDER LINE */}
          <div className="w-full h-[1px] bg-[#E4E4E7]" />

          {/* CATEGORY SWITCHING TABS */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-left">
            {OPPORTUNITY_TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer border select-none ${
                    isActive
                      ? "bg-[#111111] text-white border-[#111111] shadow-2xs"
                      : "bg-white text-[#52525B] border-[#E4E4E7] hover:border-zinc-400 hover:text-[#111111]"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* EMPTY STATE UI (Clean corporate placeholder until real submissions arrive) */}
          <div className="bg-white border border-[#E4E4E7] rounded-xs p-12 sm:p-16 lg:p-20 text-center flex flex-col items-center justify-center space-y-5 max-w-2xl mx-auto shadow-2xs select-none">
            <div className="w-14 h-14 bg-[#FAFAFA] border border-[#E4E4E7] rounded-full flex items-center justify-center text-[#71717A]">
              <CalendarPlus className="w-6 h-6 text-[#111111]" />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg sm:text-xl font-bold text-[#111111] tracking-tight">
                No Active Opportunities Listed Yet
              </h3>
              <p className="text-xs sm:text-sm text-[#71717A] max-w-md mx-auto leading-relaxed">
                New hackathons, competitive coding challenges, and corporate hiring drives submitted by campus clubs and recruiters will be published here once verified.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/host-event"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-[#111111] hover:bg-black text-white text-xs sm:text-sm font-medium rounded-full transition-colors duration-150 cursor-pointer select-none"
              >
                Host the First Event or Job
              </Link>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}