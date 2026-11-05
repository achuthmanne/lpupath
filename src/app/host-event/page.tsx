"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Upload, FileCheck, X, FileText } from "lucide-react";

export default function HostEventPage() {
  const [submitted, setSubmitted] = useState(false);

  // ONLY THE CORE MAIN-PAGE CARD DETAILS - ZERO PRE-FILLS!
  const [formData, setFormData] = useState({
    eventTitle: "",
    description: "",
    leaderName: "",
    leaderRole: "",
    registrationLink: "",
  });

  // 1. Logo File (Left side of card)
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [isLogoDragging, setIsLogoDragging] = useState(false);

  // 2. Event Document File (Holds every detail of the event)
  const [eventDocFile, setEventDocFile] = useState<File | null>(null);
  const [isDocDragging, setIsDocDragging] = useState(false);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogoFile(e.target.files[0]);
    }
  };

  const handleDocChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setEventDocFile(e.target.files[0]);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / 1048576).toFixed(1) + " MB";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#111111] flex flex-col font-sans selection:bg-[#FF6500] selection:text-white">
      {/* Main Container */}
      <main className="flex-1 py-12 sm:py-16 lg:py-20 px-6 sm:px-12 lg:px-16 select-none">
        <div className="max-w-3xl mx-auto space-y-10">
          
          {/* Header */}
          <div className="space-y-3 text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111111] tracking-tight leading-none">
              Host an Event, Job or <span className="text-[#FF6500]">Internship Drive</span>
            </h1>
            <p className="text-sm sm:text-base text-[#52525B] max-w-2xl leading-relaxed">
              Whether you are organizing a university hackathon, a competitive coding sprint, or hiring for a full-time job or internship drive — submit your core showcase details and upload your official document (Event brochure, Job Description / JD, or circular). Our team will verify and craft your live listing on LPU PATH.
            </p>
          </div>

          {/* Form or Success State */}
          {submitted ? (
            <div className="bg-white border border-[#E4E4E7] rounded-xs p-10 sm:p-14 text-center space-y-6 shadow-sm">
              <div className="w-16 h-16 bg-[#ECFDF5] border border-[#A7F3D0] rounded-full mx-auto flex items-center justify-center text-[#059669]">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-black text-[#111111] tracking-tight">
                  Event Submitted Successfully!
                </h2>
                <p className="text-sm text-[#71717A] max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-[#111111]">{formData.leaderName || "Organizer"}</strong>! Your event <strong className="text-[#111111]">{formData.eventTitle || "details"}</strong> and attached document have been received. We will craft and feature your showcase card on the main page.
                </p>
              </div>

              <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/"
                  className="px-8 py-3.5 bg-[#111111] hover:bg-black text-white text-sm font-medium rounded-full transition cursor-pointer select-none"
                >
                  Return to Home
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white border border-[#E4E4E7] rounded-xs p-6 sm:p-10 lg:p-12 space-y-8 shadow-sm text-left">
              
              {/* 1. Event / Organization Title */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#71717A] mb-2">
                  Company / Organization / Event Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. HackerRank / Google SDE Intern Hiring / Infineon GET Drive / GDSC LPU"
                  value={formData.eventTitle}
                  onChange={(e) => setFormData({ ...formData, eventTitle: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-[#DCDCE0] rounded-xs text-[#111111] text-sm focus:outline-none focus:border-[#FF6500]"
                />
              </div>

              {/* 2. Logo Upload (For Left Side of Card) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#71717A] mb-2">
                  Company / Organization Logo (Left Side of Card) *
                </label>
                {!logoFile ? (
                  <label
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsLogoDragging(true);
                    }}
                    onDragLeave={() => setIsLogoDragging(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsLogoDragging(false);
                      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                        setLogoFile(e.dataTransfer.files[0]);
                      }
                    }}
                    className={`border-2 border-dashed ${
                      isLogoDragging
                        ? "border-[#FF6500] bg-[#FFF7ED]"
                        : "border-[#DCDCE0] hover:border-[#111111] bg-[#FAFAFA]"
                    } rounded-xs p-6 sm:p-8 flex flex-col items-center justify-center text-center cursor-pointer transition select-none`}
                  >
                    <input
                      type="file"
                      accept=".png,.svg,.jpg,.jpeg,.webp"
                      required
                      onChange={handleLogoChange}
                      className="sr-only"
                    />
                    <div className="w-12 h-12 bg-white border border-[#E4E4E7] rounded-full flex items-center justify-center text-[#71717A] mb-3">
                      <Upload className="w-5 h-5 text-[#FF6500]" />
                    </div>
                    <p className="text-xs sm:text-sm font-bold text-[#111111]">
                      Click to upload logo or drag and drop here
                    </p>
                    <p className="text-[11px] text-[#71717A] mt-1">
                      Transparent PNG or SVG recommended (Company or Event logo shown on the left of the card)
                    </p>
                  </label>
                ) : (
                  <div className="p-4 bg-white border border-[#059669] rounded-xs flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 bg-[#ECFDF5] border border-[#A7F3D0] rounded-xs flex items-center justify-center text-[#059669] shrink-0">
                        <FileCheck className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm font-bold text-[#111111] truncate">
                          {logoFile.name}
                        </p>
                        <p className="text-[11px] text-[#059669] font-medium">
                          {formatFileSize(logoFile.size)} • Logo Uploaded
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setLogoFile(null)}
                      className="p-1.5 text-[#71717A] hover:text-[#EF4444] hover:bg-[#FEE2E2] rounded-xs transition cursor-pointer"
                      title="Remove logo"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* 3. Description (For Right Side of Card) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#71717A] mb-2">
                  Description / Opportunity Overview (Right Side of Card) *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe your hackathon theme, competition format, job profile, or internship stipend overview to be shown on the card..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-[#DCDCE0] rounded-xs text-[#111111] text-sm focus:outline-none focus:border-[#FF6500] resize-none"
                />
              </div>

              {/* 4. Founder / Recruiter / Team Leader Details (Bottom of Card) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#71717A] mb-2">
                    Founder / Recruiter / Team Leader Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vivek Ravisankar or HR Talent Acquisition / Rahul Sharma"
                    value={formData.leaderName}
                    onChange={(e) => setFormData({ ...formData, leaderName: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-[#DCDCE0] rounded-xs text-[#111111] text-sm focus:outline-none focus:border-[#FF6500]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#71717A] mb-2">
                    Designation / Role *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Co-Founder & CEO, University Recruiter, or Club Lead"
                    value={formData.leaderRole}
                    onChange={(e) => setFormData({ ...formData, leaderRole: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-[#DCDCE0] rounded-xs text-[#111111] text-sm focus:outline-none focus:border-[#FF6500]"
                  />
                </div>
              </div>

              {/* 5. Registration / Application Link */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#71717A] mb-2">
                  Registration / Application / Career Link *
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://... (Where students will apply, register or submit resumes)"
                  value={formData.registrationLink}
                  onChange={(e) => setFormData({ ...formData, registrationLink: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-[#DCDCE0] rounded-xs text-[#111111] text-sm focus:outline-none focus:border-[#FF6500]"
                />
                <span className="text-[11px] text-[#71717A] mt-1 block">
                  Students will be directed here when they click to apply or participate.
                </span>
              </div>

              {/* 6. Document Upload (Event Brochure, Job Description / JD, or Internship Circular) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#71717A] mb-2">
                  Upload Opportunity File: Event Brochure, Job Description (JD), or Circular *
                </label>
                {!eventDocFile ? (
                  <label
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDocDragging(true);
                    }}
                    onDragLeave={() => setIsDocDragging(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDocDragging(false);
                      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                        setEventDocFile(e.dataTransfer.files[0]);
                      }
                    }}
                    className={`border-2 border-dashed ${
                      isDocDragging
                        ? "border-[#FF6500] bg-[#FFF7ED]"
                        : "border-[#DCDCE0] hover:border-[#111111] bg-[#FAFAFA]"
                    } rounded-xs p-6 sm:p-8 flex flex-col items-center justify-center text-center cursor-pointer transition select-none`}
                  >
                    <input
                      type="file"
                      accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                      required
                      onChange={handleDocChange}
                      className="sr-only"
                    />
                    <div className="w-12 h-12 bg-white border border-[#E4E4E7] rounded-full flex items-center justify-center text-[#71717A] mb-3">
                      <FileText className="w-5 h-5 text-[#FF6500]" />
                    </div>
                    <p className="text-xs sm:text-sm font-bold text-[#111111]">
                      Upload Event Brochure, Job Description (JD), or Internship Document
                    </p>
                    <p className="text-[11px] text-[#71717A] mt-1">
                      Attach your PDF or document containing all details: rules, eligibility cutoffs, CTC/stipend, rounds, or guidelines
                    </p>
                  </label>
                ) : (
                  <div className="p-4 bg-white border border-[#059669] rounded-xs flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 bg-[#ECFDF5] border border-[#A7F3D0] rounded-xs flex items-center justify-center text-[#059669] shrink-0">
                        <FileCheck className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm font-bold text-[#111111] truncate">
                          {eventDocFile.name}
                        </p>
                        <p className="text-[11px] text-[#059669] font-medium">
                          {formatFileSize(eventDocFile.size)} • Opportunity Document Attached
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEventDocFile(null)}
                      className="p-1.5 text-[#71717A] hover:text-[#EF4444] hover:bg-[#FEE2E2] rounded-xs transition cursor-pointer"
                      title="Remove document"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Bottom Actions */}
              <div className="pt-6 border-t border-[#E4E4E7] flex flex-col sm:flex-row items-center justify-between gap-4">
                <Link
                  href="/"
                  className="text-xs sm:text-sm font-semibold text-[#71717A] hover:text-[#111111] transition"
                >
                  Cancel and Go Back
                </Link>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 bg-[#111111] hover:bg-black text-white text-sm font-medium rounded-full transition-colors duration-150 shadow-sm cursor-pointer select-none"
                >
                  Submit for Review
                </button>
              </div>

            </form>
          )}

          {/* Page Footer Note */}
          <div className="pt-6 text-center">
            <p className="text-xs text-[#71717A] font-semibold">
              LPU PATH — On-Campus Placement, Hackathon &amp; Hiring Intelligence
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}