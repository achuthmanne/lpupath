"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  ExternalLink,
  FileText,
  Trash2,
  RefreshCw,
  Building2,
  GraduationCap,
  Briefcase,
  DollarSign,
  BookOpen,
  Calendar,
  Layers,
  MapPin,
  AlertCircle,
  Award,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface FormRound {
  id?: string;
  roundTitle?: string;
  platformMode?: string;
  duration?: string;
  description?: string;
  keyFocus?: string;
}

interface PlacementSubmission {
  id: string;
  full_name: string;
  branch: string;
  passing_year: string;
  company_name: string;
  role: string;
  location: string | null;
  tier: string;
  total_ctc: string;
  fixed_base: string;
  bonus_stocks: string | null;
  internship_stipend: string | null;
  min_cgpa: string | null;
  allowed_branches: string | null;
  backlog_policy: string | null;
  difficulty: string | null;
  rounds: FormRound[] | null;
  what_to_prepare: string | null;
  key_resources: string | null;
  linkedin_url: string | null;
  proof_file_url: string | null;
  proof_file_name: string | null;
  student_photo_url?: string | null;
  status: "pending" | "verified" | "rejected";
  is_verified: boolean;
  created_at: string;
}

export default function AdminPage() {
  const [submissions, setSubmissions] = useState<PlacementSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "verified" | "rejected">("all");
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // Expand / Collapse state for each submission card
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    const all: Record<string, boolean> = {};
    submissions.forEach((s) => {
      all[s.id] = true;
    });
    setExpandedIds(all);
  };

  const collapseAll = () => {
    setExpandedIds({});
  };

  // Fetch placement submissions from our secure admin API
  const loadSubmissions = async (isManual = false) => {
    if (isManual) setRefreshing(true);
    else setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/admin/placements");
      const json = await res.json();

      if (json.success) {
        setSubmissions(json.data || []);
      } else {
        setErrorMsg(json.error || "Failed to load submissions from Supabase");
      }
    } catch (err: any) {
      console.error("Error loading submissions:", err);
      setErrorMsg(err.message || "Network error while connecting to database");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadSubmissions();
  }, []);

  // Update status (Verify / Reject)
  const handleStatusUpdate = async (id: string, newStatus: "verified" | "rejected") => {
    try {
      const res = await fetch("/api/admin/placements", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const json = await res.json();

      if (json.success) {
        setSubmissions((prev) =>
          prev.map((item) =>
            item.id === id
              ? { ...item, status: newStatus, is_verified: newStatus === "verified" }
              : item
          )
        );
        setActionNotice(`Submission marked as ${newStatus.toUpperCase()}`);
        setTimeout(() => setActionNotice(null), 3000);
      } else {
        alert("Failed to update status: " + json.error);
      }
    } catch (err: any) {
      alert("Error updating status: " + err.message);
    }
  };

  // Delete submission
  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to permanently delete submission from "${name}"?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/placements?id=${id}`, {
        method: "DELETE",
      });
      const json = await res.json();

      if (json.success) {
        setSubmissions((prev) => prev.filter((item) => item.id !== id));
        setActionNotice("Submission deleted permanently.");
        setTimeout(() => setActionNotice(null), 3000);
      } else {
        alert("Failed to delete: " + json.error);
      }
    } catch (err: any) {
      alert("Error deleting submission: " + err.message);
    }
  };

  const filteredSubmissions = submissions.filter((item) => {
    if (statusFilter === "all") return true;
    return item.status === statusFilter;
  });

  const pendingCount = submissions.filter((s) => s.status === "pending").length;
  const verifiedCount = submissions.filter((s) => s.status === "verified" || s.is_verified).length;
  const rejectedCount = submissions.filter((s) => s.status === "rejected").length;

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#111111] font-sans selection:bg-[#FF6500] selection:text-white">
      {/* Top Navigation Bar */}
      <header className="w-full bg-white border-b border-[#E4E4E7] sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-xl font-black text-[#111111] tracking-tight group-hover:text-[#FF6500] transition">
                LPU PATH
              </span>
            </Link>
            <span className="px-2.5 py-0.5 bg-[#111111] text-white rounded-xs text-[10px] font-bold tracking-wider uppercase">
              Admin Moderation
            </span>
          </div>

          <div className="flex items-center gap-3">
            {submissions.length > 0 && (
              <button
                onClick={Object.keys(expandedIds).length === submissions.length ? collapseAll : expandAll}
                className="px-3 py-1.5 bg-white border border-[#E4E4E7] hover:border-zinc-400 text-xs font-bold text-zinc-700 rounded-xs transition flex items-center gap-1.5 cursor-pointer"
              >
                {Object.keys(expandedIds).length === submissions.length ? (
                  <>
                    <ChevronUp className="w-3.5 h-3.5 text-zinc-500" />
                    <span>Collapse All</span>
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
                    <span>Expand All</span>
                  </>
                )}
              </button>
            )}

            <button
              onClick={() => loadSubmissions(true)}
              disabled={refreshing}
              className="px-3 py-1.5 bg-white border border-[#E4E4E7] hover:border-zinc-400 text-xs font-bold text-zinc-700 rounded-xs transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin text-[#FF6500]" : ""}`} />
              <span>{refreshing ? "Refreshing..." : "Refresh Data"}</span>
            </button>

            <Link
              href="/share-placement"
              className="px-3.5 py-1.5 bg-[#FF6500] hover:bg-[#E05800] text-white rounded-xs text-xs font-bold transition flex items-center gap-1.5"
            >
              <span>+ Add Submission</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        
        {/* Page Title & Status Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-[#E4E4E7] p-5 rounded-xs shadow-2xs">
          <div>
            <h1 className="text-2xl font-black text-[#111111] tracking-tight flex items-center gap-2.5">
              <GraduationCap className="w-7 h-7 text-[#FF6500]" />
              <span>Placement Submissions</span>
            </h1>
            <p className="text-xs text-[#71717A] mt-1">
              Live database records directly submitted by placed students. Every single field filled in the form is displayed below.
            </p>
          </div>

          {/* Quick Filter Buttons */}
          <div className="flex items-center gap-1.5 bg-zinc-100 p-1 rounded-xs border border-[#E4E4E7] text-xs font-bold">
            <button
              onClick={() => setStatusFilter("all")}
              className={`px-3 py-1.5 rounded-xs transition ${
                statusFilter === "all"
                  ? "bg-white text-[#111111] shadow-2xs"
                  : "text-[#71717A] hover:text-[#111111]"
              }`}
            >
              All ({submissions.length})
            </button>
            <button
              onClick={() => setStatusFilter("pending")}
              className={`px-3 py-1.5 rounded-xs transition flex items-center gap-1.5 ${
                statusFilter === "pending"
                  ? "bg-amber-500 text-white shadow-2xs"
                  : "text-amber-700 hover:text-amber-900"
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Pending ({pendingCount})</span>
            </button>
            <button
              onClick={() => setStatusFilter("verified")}
              className={`px-3 py-1.5 rounded-xs transition flex items-center gap-1.5 ${
                statusFilter === "verified"
                  ? "bg-emerald-600 text-white shadow-2xs"
                  : "text-emerald-700 hover:text-emerald-900"
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Verified ({verifiedCount})</span>
            </button>
            <button
              onClick={() => setStatusFilter("rejected")}
              className={`px-3 py-1.5 rounded-xs transition flex items-center gap-1.5 ${
                statusFilter === "rejected"
                  ? "bg-rose-600 text-white shadow-2xs"
                  : "text-rose-700 hover:text-rose-900"
              }`}
            >
              <XCircle className="w-3.5 h-3.5" />
              <span>Rejected ({rejectedCount})</span>
            </button>
          </div>
        </div>

        {/* Action Notice Alert */}
        {actionNotice && (
          <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 px-4 py-2.5 rounded-xs text-xs font-bold flex items-center justify-between">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{actionNotice}</span>
            </span>
          </div>
        )}

        {/* Error Alert */}
        {errorMsg && (
          <div className="bg-rose-50 border border-rose-300 text-rose-800 px-4 py-3 rounded-xs text-xs font-bold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="bg-white border border-[#E4E4E7] p-12 text-center rounded-xs space-y-3">
            <RefreshCw className="w-6 h-6 animate-spin text-[#FF6500] mx-auto" />
            <p className="text-xs font-bold text-[#71717A]">
              Loading placement submissions from Supabase database...
            </p>
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredSubmissions.length === 0 && (
          <div className="bg-white border border-[#E4E4E7] p-12 text-center rounded-xs space-y-3">
            <FileText className="w-8 h-8 text-zinc-300 mx-auto" />
            <h3 className="text-sm font-bold text-[#111111]">
              No {statusFilter !== "all" ? statusFilter : ""} placement submissions found
            </h3>
            <p className="text-xs text-[#71717A] max-w-sm mx-auto">
              When students submit their placement stories and proof documents via the share form, they will appear here.
            </p>
            <div className="pt-2">
              <Link
                href="/share-placement"
                className="px-4 py-2 bg-[#FF6500] text-white rounded-xs text-xs font-bold inline-flex items-center gap-1.5"
              >
                <span>Submit a Test Placement Story</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* List of Placement Submissions (Showing EVERY SINGLE FIELD filled by the student) */}
        {!loading && filteredSubmissions.length > 0 && (
          <div className="space-y-6">
            {filteredSubmissions.map((item, index) => {
              const roundsList: FormRound[] = Array.isArray(item.rounds) ? item.rounds : [];
              const isExpanded = !!expandedIds[item.id];
              const photoUrl =
                item.student_photo_url ||
                (Array.isArray(item.rounds) && (item.rounds[0] as any)?.student_photo_url) ||
                null;

              const isImageProof = (url?: string | null, name?: string | null) => {
                if (!url) return false;
                const target = (name || url).toLowerCase();
                return (
                  target.includes(".png") ||
                  target.includes(".jpg") ||
                  target.includes(".jpeg") ||
                  target.includes(".webp") ||
                  target.includes(".gif") ||
                  target.includes(".svg")
                );
              };

              return (
                <div
                  key={item.id}
                  className="bg-white border border-[#E4E4E7] rounded-xs shadow-2xs overflow-hidden transition hover:border-zinc-400"
                >
                  {/* Card Header: Student Photo, Info, Tier, Status, and Action Buttons (Clickable to Expand) */}
                  <div
                    onClick={() => toggleExpand(item.id)}
                    className={`p-5 bg-[#FAFAFA] flex flex-wrap items-center justify-between gap-4 cursor-pointer select-none transition ${
                      isExpanded ? "border-b border-[#E4E4E7]" : "hover:bg-zinc-100/75"
                    }`}
                  >
                    
                    {/* Student Photo & Core Info */}
                    <div className="flex items-center gap-3.5 flex-wrap sm:flex-nowrap">
                      {/* Student Profile Photo or Initials Avatar */}
                      {photoUrl ? (
                        <a
                          href={photoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#FF6500] shadow-sm shrink-0 bg-[#FFF4EC] flex items-center justify-center hover:opacity-90 hover:scale-105 transition cursor-pointer"
                          title="Click to view full photo"
                        >
                          <img
                            src={photoUrl}
                            alt={item.full_name}
                            className="w-full h-full object-cover"
                          />
                        </a>
                      ) : (
                        <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-zinc-200 shadow-2xs shrink-0 bg-[#FFF4EC] flex items-center justify-center">
                          <span className="text-base font-black text-[#FF6500]">
                            {item.full_name
                              ? item.full_name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")
                                  .substring(0, 2)
                                  .toUpperCase()
                              : "LP"}
                          </span>
                        </div>
                      )}

                      <div className="space-y-1">
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <span className="text-xs font-mono font-bold text-zinc-400">
                            #{String(index + 1).padStart(2, "0")}
                          </span>
                          <h2 className="text-lg font-black text-[#111111]">
                            {item.full_name}
                          </h2>
                          <span className="px-2 py-0.5 bg-zinc-200/80 text-zinc-800 rounded-xs text-[10px] font-bold">
                            {item.passing_year}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-xs text-[10px] font-bold uppercase tracking-wider ${
                              item.tier === "Super Dream"
                                ? "bg-purple-100 text-purple-800 border border-purple-200"
                                : item.tier === "Dream"
                                ? "bg-blue-100 text-blue-800 border border-blue-200"
                                : "bg-zinc-100 text-zinc-800 border border-zinc-200"
                            }`}
                          >
                            {item.tier}
                          </span>

                          {/* Status Badge */}
                          {item.status === "verified" || item.is_verified ? (
                            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-xs text-[10px] font-bold flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              <span>VERIFIED</span>
                            </span>
                          ) : item.status === "rejected" ? (
                            <span className="px-2 py-0.5 bg-rose-100 text-rose-800 border border-rose-300 rounded-xs text-[10px] font-bold flex items-center gap-1">
                              <XCircle className="w-3 h-3 text-rose-600" />
                              <span>REJECTED</span>
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 bg-amber-100 text-amber-800 border border-amber-300 rounded-xs text-[10px] font-bold flex items-center gap-1">
                              <Clock className="w-3 h-3 text-amber-600" />
                              <span>PENDING VERIFICATION</span>
                            </span>
                          )}
                        </div>

                        <div className="text-xs text-[#52525B] flex flex-wrap items-center gap-x-3 gap-y-1">
                          <span className="font-bold text-[#111111]">
                            {item.company_name} — {item.role}
                          </span>
                          <span>•</span>
                          <span>{item.branch}</span>
                          {item.location && (
                            <>
                              <span>•</span>
                              <span className="flex items-center gap-1 text-zinc-500">
                                <MapPin className="w-3 h-3" />
                                <span>{item.location}</span>
                              </span>
                            </>
                          )}
                          <span>•</span>
                          <span className="text-[11px] text-zinc-400">
                            Submitted on {new Date(item.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Moderation Action Buttons + Expand Toggle */}
                    <div className="flex items-center gap-2">
                      {item.status !== "verified" && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStatusUpdate(item.id, "verified");
                          }}
                          className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xs text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Approve</span>
                        </button>
                      )}

                      {item.status !== "rejected" && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStatusUpdate(item.id, "rejected");
                          }}
                          className="px-3.5 py-1.5 bg-white border border-rose-300 text-rose-700 hover:bg-rose-50 rounded-xs text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Reject</span>
                        </button>
                      )}

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(item.id, item.full_name);
                        }}
                        className="p-1.5 text-zinc-400 hover:text-rose-600 rounded-xs hover:bg-zinc-100 transition cursor-pointer"
                        title="Delete permanently"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      {/* Expand / Collapse Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleExpand(item.id);
                        }}
                        className={`ml-1 px-3 py-1.5 rounded-xs text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border ${
                          isExpanded
                            ? "bg-[#111111] text-white border-[#111111]"
                            : "bg-white text-zinc-800 border-zinc-300 hover:border-[#FF6500] hover:text-[#FF6500]"
                        }`}
                      >
                        <span>{isExpanded ? "Hide" : "Details"}</span>
                        {isExpanded ? (
                          <ChevronUp className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                  </div>

                  {/* Card Body: Expanded Details (Opened on tap) */}
                  {isExpanded && (
                    <div className="p-6 space-y-6">

                      {/* Section 1: Real Salary Breakdown Figures */}
                      <div className="space-y-2">
                        <div className="text-[11px] font-bold text-[#FF6500] uppercase tracking-wider flex items-center gap-1.5">
                          <DollarSign className="w-3.5 h-3.5" />
                          <span>1. Real Salary Figures &amp; Compensation</span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-zinc-50 p-3.5 rounded-xs border border-[#E4E4E7]">
                          <div>
                            <span className="text-[10px] uppercase font-bold text-[#71717A] block">Total CTC</span>
                            <span className="text-sm font-black text-[#111111]">{item.total_ctc || "—"}</span>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase font-bold text-[#71717A] block">Fixed Base Salary</span>
                            <span className="text-sm font-bold text-emerald-700">{item.fixed_base || "—"}</span>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase font-bold text-[#71717A] block">Bonus / Stocks</span>
                            <span className="text-xs font-bold text-[#111111]">{item.bonus_stocks || "None / N/A"}</span>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase font-bold text-[#71717A] block">Internship Stipend</span>
                            <span className="text-xs font-bold text-[#111111]">{item.internship_stipend || "None / N/A"}</span>
                          </div>
                        </div>
                      </div>

                      {/* Section 2: Recruiter Eligibility Cutoffs */}
                      <div className="space-y-2">
                        <div className="text-[11px] font-bold text-[#FF6500] uppercase tracking-wider flex items-center gap-1.5">
                          <Award className="w-3.5 h-3.5" />
                          <span>2. Recruiter Eligibility Cutoffs</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-zinc-50 p-3.5 rounded-xs border border-[#E4E4E7] text-xs">
                          <div>
                            <span className="text-[10px] uppercase font-bold text-[#71717A] block">Minimum CGPA</span>
                            <span className="font-bold text-[#111111]">{item.min_cgpa || "No minimum cutoff specified"}</span>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase font-bold text-[#71717A] block">Allowed Branches</span>
                            <span className="font-bold text-[#111111]">{item.allowed_branches || "All branches eligible"}</span>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase font-bold text-[#71717A] block">Backlog Policy</span>
                            <span className="font-bold text-[#111111]">{item.backlog_policy || "Not mentioned"}</span>
                          </div>
                        </div>
                      </div>

                      {/* Section 3: Interview Experience & Dynamic Rounds */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="text-[11px] font-bold text-[#FF6500] uppercase tracking-wider flex items-center gap-1.5">
                            <Layers className="w-3.5 h-3.5" />
                            <span>3. Interview Rounds &amp; Selection Process ({roundsList.length} Rounds)</span>
                          </div>
                          <div className="text-xs font-bold text-zinc-600">
                            Overall Difficulty: <span className="text-[#FF6500]">{item.difficulty || "Medium"}</span>
                          </div>
                        </div>

                        {roundsList.length > 0 ? (
                          <div className="space-y-3">
                            {roundsList.map((rnd, rIdx) => (
                              <div
                                key={rnd.id || rIdx}
                                className="border border-[#E4E4E7] rounded-xs p-4 bg-white space-y-2"
                              >
                                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-100 pb-2">
                                  <div className="font-bold text-xs text-[#111111] flex items-center gap-2">
                                    <span className="w-5 h-5 rounded-full bg-[#111111] text-white flex items-center justify-center text-[10px]">
                                      {rIdx + 1}
                                    </span>
                                    <span>{rnd.roundTitle || `Round ${rIdx + 1}`}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-[11px] text-zinc-500">
                                    {rnd.platformMode && (
                                      <span className="px-2 py-0.5 bg-zinc-100 rounded-xs font-medium">
                                        {rnd.platformMode}
                                      </span>
                                    )}
                                    {rnd.duration && (
                                      <span className="px-2 py-0.5 bg-zinc-100 rounded-xs font-medium flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        <span>{rnd.duration}</span>
                                      </span>
                                    )}
                                  </div>
                                </div>

                                {rnd.keyFocus && (
                                  <div className="text-xs">
                                    <span className="font-bold text-zinc-700">Key Focus / Topics: </span>
                                    <span className="text-zinc-600">{rnd.keyFocus}</span>
                                  </div>
                                )}

                                {rnd.description && (
                                  <div className="text-xs text-[#52525B] leading-relaxed bg-zinc-50 p-2.5 rounded-xs border border-zinc-100 whitespace-pre-wrap">
                                    {rnd.description}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-xs text-zinc-400 italic bg-zinc-50 p-3 rounded-xs border border-[#E4E4E7]">
                            No detailed interview rounds recorded.
                          </div>
                        )}
                      </div>

                      {/* Section 4: Preparation Advice & Resources */}
                      <div className="space-y-2">
                        <div className="text-[11px] font-bold text-[#FF6500] uppercase tracking-wider flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>4. Mentorship &amp; Key Resources</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          <div className="bg-zinc-50 p-3.5 rounded-xs border border-[#E4E4E7] space-y-1">
                            <span className="text-[10px] uppercase font-bold text-[#71717A] block">What Students Should Prepare</span>
                            <p className="text-zinc-800 leading-relaxed whitespace-pre-wrap">
                              {item.what_to_prepare || "No specific advice provided"}
                            </p>
                          </div>
                          <div className="bg-zinc-50 p-3.5 rounded-xs border border-[#E4E4E7] space-y-1">
                            <span className="text-[10px] uppercase font-bold text-[#71717A] block">Key Preparation Resources / Links</span>
                            <p className="text-zinc-800 leading-relaxed whitespace-pre-wrap">
                              {item.key_resources || "No specific resources listed"}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Section 5: Verification Document Proof & Contact (CLEAN & SINGLE) */}
                      <div className="pt-4 border-t border-[#E4E4E7] space-y-3">
                        
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <span className="text-[11px] font-bold text-[#FF6500] uppercase tracking-wider flex items-center gap-1.5">
                            <FileText className="w-3.5 h-3.5" />
                            <span>5. Offer / UMS Verification Document</span>
                          </span>

                          {/* Student LinkedIn Profile Link */}
                          {item.linkedin_url && (
                            <a
                              href={item.linkedin_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs font-bold text-[#0077B5] hover:underline inline-flex items-center gap-1.5"
                            >
                              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                              </svg>
                              <span>View LinkedIn Profile</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>

                        {/* Single Clean Proof Display (Zero duplicate elements!) */}
                        {item.proof_file_url ? (
                          isImageProof(item.proof_file_url, item.proof_file_name) ? (
                            <div className="space-y-2">
                              <a
                                href={item.proof_file_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block max-w-lg rounded-xs overflow-hidden border border-zinc-200 bg-white hover:border-[#FF6500] transition group shadow-2xs"
                                title="Click to open image in full tab"
                              >
                                <img
                                  src={item.proof_file_url}
                                  alt="Offer Verification Proof"
                                  className="w-full max-h-72 object-contain bg-zinc-900/5 group-hover:opacity-95 transition"
                                />
                              </a>
                              <span className="text-[11px] text-[#71717A] block">
                                Click on the screenshot above to view full size in new tab.
                              </span>
                            </div>
                          ) : (
                            <a
                              href={item.proof_file_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFF4EC] text-[#FF6500] border border-[#FF6500] hover:bg-[#FF6500] hover:text-white rounded-xs text-xs font-bold transition shadow-2xs"
                            >
                              <FileText className="w-4 h-4" />
                              <span>View Official Offer Document ({item.proof_file_name || "PDF"})</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )
                        ) : (
                          <span className="text-xs text-zinc-400 italic">
                            No proof document uploaded
                          </span>
                        )}

                      </div>

                    </div>
                  )}

                </div>
              );
            })}
          </div>
        )}

      </main>
    </div>
  );
}
