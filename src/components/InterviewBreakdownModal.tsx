"use client";

import { useEffect } from "react";
import Image from "next/image";
import { SeniorPlacementPost } from "@/data/seniorPlacements";
import { MapPin, Clock, ExternalLink, CheckCircle2 } from "lucide-react";

interface InterviewBreakdownModalProps {
  placement: SeniorPlacementPost | null;
  onClose: () => void;
}

export default function InterviewBreakdownModal({
  placement,
  onClose,
}: InterviewBreakdownModalProps) {
  // Close modal on Escape key press & prevent background scroll
  useEffect(() => {
    if (!placement) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [placement, onClose]);

  if (!placement) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/65 backdrop-blur-xs select-none animate-in fade-in duration-150"
      onClick={onClose}
    >
      {/* Modal Dialog Card */}
      <div
        className="relative w-full max-w-4xl lg:max-w-[960px] bg-white border border-[#E4E4E7] rounded-xs shadow-2xl flex flex-col max-h-[92vh] overflow-hidden text-left"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* ============================================================== */}
        {/* MODAL HEADER: SENIOR + ENLARGED COMPANY LOGO (NO CROSS / VERIFIED) */}
        {/* ============================================================== */}
        <div className="p-6 sm:p-7 border-b border-[#E4E4E7] bg-white flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Senior Photo */}
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xs border border-[#E4E4E7] overflow-hidden shrink-0 bg-[#F4F4F5]">
              <Image
                src={placement.avatar}
                alt={placement.studentName}
                width={80}
                height={80}
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Senior Details */}
            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-black text-[#111111] tracking-tight">
                {placement.studentName}
              </h3>

              <p className="text-xs text-[#71717A] font-semibold">
                {placement.batch}
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-0.5">
                <span className="text-xs font-bold text-[#111111]">
                  {placement.role}
                </span>
                <span className="text-zinc-300">•</span>
                <span className="inline-flex items-center gap-1 text-xs text-[#71717A] font-medium">
                  <MapPin className="w-3 h-3 text-[#FF6500]" />
                  <span>{placement.location}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Top Right: Enlarged Company Logo (No Cross Button) */}
          <div className="h-14 sm:h-16 w-36 sm:w-44 px-3.5 py-2 bg-[#F8F9FA] border border-[#E4E4E7] rounded-xs flex items-center justify-center shrink-0">
            <Image
              src={placement.companyLogo}
              alt={placement.companyName}
              width={160}
              height={48}
              className="max-h-10 sm:max-h-11 max-w-[130px] sm:max-w-[150px] w-auto h-auto object-contain"
            />
          </div>
        </div>

        {/* ============================================================== */}
        {/* MODAL BODY (SCROLLABLE - PURE TEXT HEADINGS, NO ICONS)         */}
        {/* ============================================================== */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
          
          {/* SECTION 1: REAL SALARY BREAKDOWN (NO ICON) */}
          <div className="space-y-3.5">
            <div className="flex items-center justify-between pb-2 border-b border-[#E4E4E7]">
              <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#111111]">
                1. Real Salary Breakdown
              </h4>

              <span className="text-[11px] font-semibold text-[#71717A]">
                Placement Tier: <strong className="text-[#111111]">{placement.tier}</strong>
              </span>
            </div>

            {/* 4 Salary KPI Boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="bg-[#FAF9F6] border border-[#E4E4E7] rounded-xs p-3.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#71717A] block mb-1">
                  Total CTC
                </span>
                <div className="text-xl sm:text-2xl font-black text-[#FF6500] tracking-tight">
                  {placement.salaryBreakdown.totalCtc}
                </div>
                <span className="text-[10px] text-[#71717A] font-medium mt-0.5 block">
                  Annual Gross Package
                </span>
              </div>

              <div className="bg-[#FAF9F6] border border-[#E4E4E7] rounded-xs p-3.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#71717A] block mb-1">
                  Fixed In-Hand Base
                </span>
                <div className="text-sm sm:text-base font-bold text-[#111111] tracking-tight leading-snug">
                  {placement.salaryBreakdown.fixedBase}
                </div>
                <span className="text-[10px] text-[#059669] font-semibold mt-0.5 block">
                  Guaranteed Take-Home
                </span>
              </div>

              <div className="bg-[#FAF9F6] border border-[#E4E4E7] rounded-xs p-3.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#71717A] block mb-1">
                  Stocks / Sign-on
                </span>
                <div className="text-xs sm:text-sm font-bold text-[#111111] tracking-tight leading-snug">
                  {placement.salaryBreakdown.bonusStocks}
                </div>
                <span className="text-[10px] text-[#71717A] font-medium mt-0.5 block">
                  Joining Bonus &amp; RSUs
                </span>
              </div>

              <div className="bg-[#FAF9F6] border border-[#E4E4E7] rounded-xs p-3.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#71717A] block mb-1">
                  Internship Stipend
                </span>
                <div className="text-xs sm:text-sm font-bold text-[#111111] tracking-tight leading-snug">
                  {placement.salaryBreakdown.internshipStipend}
                </div>
                <span className="text-[10px] text-[#71717A] font-medium mt-0.5 block">
                  Pre-Placement Period
                </span>
              </div>
            </div>
          </div>

          {/* SECTION 2: RECRUITER ELIGIBILITY CUTOFFS (NO ICON) */}
          <div className="space-y-3.5">
            <div className="pb-2 border-b border-[#E4E4E7]">
              <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#111111]">
                2. Recruiter Eligibility Cutoffs
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-[#F8F9FA] border border-[#E4E4E7] rounded-xs p-3.5 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#71717A] block">
                  Minimum CGPA
                </span>
                <p className="text-xs font-bold text-[#111111]">
                  {placement.eligibility.minCgpa}
                </p>
              </div>

              <div className="bg-[#F8F9FA] border border-[#E4E4E7] rounded-xs p-3.5 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#71717A] block">
                  Allowed Branches
                </span>
                <p className="text-xs font-bold text-[#111111]">
                  {placement.eligibility.allowedBranches}
                </p>
              </div>

              <div className="bg-[#F8F9FA] border border-[#E4E4E7] rounded-xs p-3.5 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#71717A] block">
                  Backlog Policy
                </span>
                <p className="text-xs font-bold text-[#111111]">
                  {placement.eligibility.backlogPolicy}
                </p>
              </div>
            </div>
          </div>

          {/* SECTION 3: ROUND-BY-ROUND INTERVIEW PROCESS (NO ICON) */}
          <div className="space-y-3.5">
            <div className="flex items-center justify-between pb-2 border-b border-[#E4E4E7]">
              <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#111111]">
                3. Round-by-Round Interview Process
              </h4>

              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-[#F4F4F5] text-[#71717A] text-[10px] font-bold rounded-xs">
                  {placement.roundsCount} Total Rounds
                </span>
                <span className="px-2 py-0.5 bg-[#FFF7ED] border border-[#FFEDD5] text-[#C2410C] text-[10px] font-bold rounded-xs">
                  Difficulty: {placement.difficulty}
                </span>
              </div>
            </div>

            {/* Stepper / Timeline of Rounds */}
            <div className="space-y-3">
              {placement.rounds.map((round) => (
                <div
                  key={round.roundNumber}
                  className="bg-white border border-[#E4E4E7] rounded-xs p-4 sm:p-5 space-y-2 hover:border-[#111111] transition-colors"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h5 className="text-sm font-bold text-[#111111]">
                      {round.roundName}
                    </h5>

                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 text-[11px] text-[#71717A] font-semibold">
                        <Clock className="w-3 h-3 text-[#FF6500]" />
                        <span>{round.duration}</span>
                      </span>
                      <span className="text-zinc-300">•</span>
                      <span className="text-[11px] text-[#52525B] font-semibold bg-[#F4F4F5] px-2 py-0.5 rounded-xs">
                        {round.platformMode}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-[#52525B] leading-relaxed">
                    {round.description}
                  </p>

                  <div className="pt-1.5 flex items-start gap-1.5 text-[11px] text-[#111111] font-semibold">
                    <span className="text-[#FF6500] font-bold shrink-0">Key Focus:</span>
                    <span className="text-[#71717A] font-medium">{round.keyFocus}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 4: SENIOR'S PRO-TIPS & MENTORSHIP ROADMAP (NO ICON) */}
          <div className="space-y-3.5">
            <div className="pb-2 border-b border-[#E4E4E7]">
              <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#111111]">
                4. Senior&apos;s Pro-Tips &amp; Mentorship Roadmap
              </h4>
            </div>

            <div className="bg-[#FAF9F6] border border-[#E4E4E7] rounded-xs p-4 sm:p-5 space-y-3.5">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#71717A] block mb-1">
                  Preparation Advice for Juniors
                </span>
                <p className="text-xs sm:text-sm text-[#111111] leading-relaxed italic">
                  &ldquo;{placement.seniorTips.whatToPrepare}&rdquo;
                </p>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#71717A] block mb-1.5">
                  Recommended Learning Resources
                </span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {placement.seniorTips.keyResources.map((res) => (
                    <span
                      key={res}
                      className="px-2.5 py-1 bg-white border border-[#DCDCE0] text-[#111111] text-[11px] font-semibold rounded-xs"
                    >
                      {res}
                    </span>
                  ))}
                </div>
              </div>

              {/* LinkedIn Connect Button */}
              <div className="pt-2 flex items-center justify-between border-t border-[#E4E4E7]">
                <span className="text-[11px] text-[#71717A] font-medium">
                  Have doubts about this drive?
                </span>

                <a
                  href={placement.seniorTips.linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#111111] hover:bg-[#FF6500] text-white text-xs font-medium rounded-full transition-colors cursor-pointer select-none"
                >
                  <span>Connect on LinkedIn</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* ============================================================== */}
        {/* MODAL FOOTER: VERIFIED NOTE + CLOSE BUTTON                     */}
        {/* ============================================================== */}
        <div className="p-4 sm:p-5 border-t border-[#E4E4E7] bg-white flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-[#71717A] font-medium">
            <CheckCircle2 className="w-4 h-4 text-[#059669]" />
            <span>Verified from LPU Placement Cell &amp; Offer Letter Records</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 bg-[#F4F4F5] hover:bg-[#E4E4E7] text-[#111111] text-xs font-semibold rounded-full transition cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
