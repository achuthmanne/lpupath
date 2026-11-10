"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SENIOR_PLACEMENT_POSTS, SeniorPlacementPost } from "@/data/seniorPlacements";
import InterviewBreakdownModal from "@/components/InterviewBreakdownModal";

export default function OnCampusPlacementsPage() {
  const [selectedPlacement, setSelectedPlacement] = useState<SeniorPlacementPost | null>(null);
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
                On-Campus <span className="text-[#FF6500]">Placements</span>
              </h1>

              <div className="space-y-2.5 max-w-xl text-[#52525B] text-sm sm:text-base leading-relaxed font-normal">
                <p>
                  Real company placement selections, job profiles, and package details secured directly on campus and shared by placed LPU seniors.
                </p>
                <p className="text-xs sm:text-sm text-[#71717A]">
                  Explore verified recruitment rounds, company cutoffs, online assessment patterns, and actionable interview tips to prepare effectively for upcoming drives.
                </p>
              </div>
            </div>

            {/* Right Vector Illustration with Horizontal Cut Baseline */}
            <div className="lg:col-span-5 xl:col-span-5 flex flex-col items-center justify-center lg:justify-end">
              <div className="relative w-full max-w-[460px] flex flex-col items-center">
                <Image
                  src="/placed-alumni-vector.png"
                  alt="LPU PATH Placed Alumni & Seniors - On-Campus Placement Offers"
                  width={1024}
                  height={649}
                  className="w-full h-auto object-contain block"
                  priority
                  unoptimized
                />
                {/* Horizontal Cut Line */}
                <div className="w-full h-[2px] bg-[#111111] -mt-[1px]" />
              </div>
            </div>

          </div>

          {/* ========================================================= */}
          {/* ALUMNI & SENIOR PLACEMENTS (10 VERIFIED OFFERS)           */}
          {/* ========================================================= */}
          <div className="pt-6 sm:pt-10 space-y-8 text-left">
            <h2 className="text-2xl sm:text-3xl font-black text-[#111111] tracking-tight">
              Alumni &amp; Senior Placements
            </h2>

            {/* 10 Senior Placement Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {SENIOR_PLACEMENT_POSTS.map((post) => (
                <div
                  key={post.id}
                  className="bg-white border border-[#E4E4E7] hover:border-[#111111] rounded-xs p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 select-none text-left h-full min-h-[390px] sm:min-h-[410px] shadow-sm group"
                >
                  {/* 1. TOP: Senior Photo + Company Logo */}
                  <div className="flex items-center justify-between gap-4">
                    {/* Senior Photo */}
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xs border border-[#E4E4E7] overflow-hidden shrink-0 bg-[#F4F4F5]">
                      <Image
                        src={post.avatar}
                        alt={post.studentName}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>

                    {/* Company Logo Badge */}
                    <div className="h-11 sm:h-12 w-28 sm:w-32 px-3 py-1.5 bg-[#F8F9FA] border border-[#E4E4E7] rounded-xs flex items-center justify-center shrink-0">
                      <Image
                        src={post.companyLogo}
                        alt={post.companyName}
                        width={120}
                        height={32}
                        className="max-h-7 max-w-[95px] sm:max-w-[105px] w-auto h-auto object-contain"
                      />
                    </div>
                  </div>

                  {/* 2. MIDDLE: Student Name + Role + Package (LOCKED HORIZONTAL ALIGNMENT) */}
                  <div className="my-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-xs text-[#71717A] font-semibold block mb-1 truncate">
                        {post.studentName}
                      </span>
                      <div className="h-[52px] sm:h-[56px] flex items-start">
                        <h3 className="text-lg sm:text-xl font-black text-[#111111] tracking-tight leading-snug line-clamp-2">
                          {post.role}
                        </h3>
                      </div>
                    </div>

                    <div className="pt-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#71717A] block mb-1">
                        Package
                      </span>
                      <div className="text-2xl sm:text-3xl font-black text-[#FF6500] tracking-tight tabular-nums">
                        {post.totalCtc}
                      </div>
                    </div>
                  </div>

                  {/* 3. BOTTOM: View Full Interview Breakdown Button */}
                  <div className="mt-auto pt-2">
                    <button
                      type="button"
                      onClick={() => setSelectedPlacement(post)}
                      className="w-full py-3.5 bg-[#111111] hover:bg-[#FF6500] text-white text-xs sm:text-sm font-medium rounded-xs transition-colors duration-200 text-center cursor-pointer select-none"
                    >
                      View Full Interview Breakdown
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Action Bar: Share Placement + Back to Overview */}
          <div className="pt-12 sm:pt-16 pb-8 border-t border-[#E4E4E7] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center justify-center px-7 py-3 bg-[#111111] text-white text-sm font-medium rounded-full transition-all duration-200 select-none cursor-pointer"
              >
                Back to Overview
              </Link>
              <Link
                href="/share-placement"
                className="inline-flex items-center justify-center px-7 py-3 bg-[#FF6500] hover:bg-[#E55B00] text-white text-sm font-medium rounded-full transition-all duration-200 shadow-sm hover:shadow-md select-none cursor-pointer"
              >
                Share Your Placement
              </Link>
            </div>

            <p className="text-xs text-[#71717A] font-semibold text-center sm:text-right">
              LPU PATH — On-Campus Placement &amp; Employment Intelligence
            </p>
          </div>

        </div>
      </main>

      {/* INTERACTIVE FULL INTERVIEW BREAKDOWN MODAL */}
      <InterviewBreakdownModal
        placement={selectedPlacement}
        onClose={() => setSelectedPlacement(null)}
      />

    </div>
  );
}
