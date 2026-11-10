"use client";

import { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { CheckCircle2, Plus, Trash2, ShieldCheck, Upload, FileCheck, X, PartyPopper, Sparkles, Camera, User } from "lucide-react";

// Silicon Valley Grade Corporate Confetti & Ribbon Cannon Blast
// Dual Cannons firing from bottom corners, gracefully meeting & overlapping in the center, then cascading down
function CorporateConfettiCannons() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Premium Corporate Metallic & Foil Palette (Face color + 3D Shadow shade)
    const PALETTE = [
      { color: "#FF6500", dark: "#B33E00" }, // LPU Brand Cadmium Orange
      { color: "#FFA266", dark: "#D96C24" }, // Shimmering Peach
      { color: "#F59E0B", dark: "#B45309" }, // Metallic Gold
      { color: "#10B981", dark: "#047857" }, // Emerald Foil
      { color: "#3B82F6", dark: "#1D4ED8" }, // Deep Sky Blue
      { color: "#EC4899", dark: "#BE185D" }, // Carmine Pink
      { color: "#8B5CF6", dark: "#5B21B6" }, // Imperial Violet
      { color: "#FFFFFF", dark: "#D4D4D8" }, // Crisp White / Silver Foil
    ];

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      w: number;
      h: number;
      color: string;
      dark: string;
      wobble: number;
      wobbleSpeed: number;
      tiltAngle: number;
      tiltSpeed: number;
      isRibbon: boolean;
      opacity: number;
      alive: boolean;
      drag: number;
      gravity: number;
    }

    const particles: Particle[] = [];

    // Helper to fire a cannon burst angled inwards so it reaches & intermixes in the middle
    const fireCannon = (
      originX: number,
      originY: number,
      baseAngleDeg: number,
      count: number,
      speedMultiplier = 1
    ) => {
      for (let i = 0; i < count; i++) {
        const isRibbon = Math.random() < 0.35; // 35% elegant ribbons, 65% metallic flakes

        // Smooth ~48 degree cone pointing towards center ceiling
        const angleDeg = baseAngleDeg + (Math.random() * 46 - 23);
        const angleRad = (angleDeg * Math.PI) / 180;

        // Velocity tuned so particles gracefully glide right into the center 50%
        const speed = (Math.random() * 12 + 28) * speedMultiplier;

        const colorItem = PALETTE[Math.floor(Math.random() * PALETTE.length)];

        particles.push({
          x: originX,
          y: originY,
          vx: Math.cos(angleRad) * speed,
          vy: Math.sin(angleRad) * speed,
          w: isRibbon ? Math.random() * 4 + 5 : Math.random() * 5 + 7,
          h: isRibbon ? Math.random() * 32 + 22 : Math.random() * 8 + 8,
          color: colorItem.color,
          dark: colorItem.dark,
          wobble: Math.random() * Math.PI * 2,
          wobbleSpeed: Math.random() * 0.12 + 0.06,
          tiltAngle: Math.random() * Math.PI * 2,
          tiltSpeed: (Math.random() - 0.5) * 0.1,
          isRibbon,
          opacity: 1,
          alive: true,
          drag: isRibbon ? 0.963 : 0.961, // Calibrated drag allows both streams to cross into the center!
          gravity: isRibbon ? 0.35 : 0.38, // Smooth, buoyant descent
        });
      }
    };

    // Wave 1: Immediate dual-cannon explosion from bottom-left & bottom-right
    // Angled at -47 deg and -133 deg so both streams fly towards and meet in the center
    fireCannon(width * 0.06, height * 0.82, -47, 75, 1.0);
    fireCannon(width * 0.94, height * 0.82, -133, 75, 1.0);

    // Wave 2: Staggered accent blast at 200ms for rich theatrical depth in the center!
    let timeoutId = setTimeout(() => {
      fireCannon(width * 0.1, height * 0.8, -45, 40, 1.08);
      fireCannon(width * 0.9, height * 0.8, -135, 40, 1.08);
    }, 200);

    let frameCount = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      frameCount++;

      let anyAlive = false;

      particles.forEach((p) => {
        if (!p.alive) return;

        // Fluid Aerodynamics:
        p.vx *= p.drag;
        p.vy += p.gravity;
        p.vy *= p.drag;

        p.x += p.vx;
        p.y += p.vy;

        p.wobble += p.wobbleSpeed;
        p.tiltAngle += p.tiltSpeed;

        // Smooth gradual fade after ~2.3 seconds (frame ~135)
        if (frameCount > 130) {
          p.opacity -= 0.015;
          if (p.opacity <= 0) {
            p.alive = false;
            return;
          }
        }

        // Screen exit check
        if (p.y > height + 80) {
          p.alive = false;
          return;
        }

        anyAlive = true;

        // 3D Fluttering Simulation (Sine/Cosine dual-face flip)
        const cosWobble = Math.cos(p.wobble);

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.tiltAngle);
        ctx.scale(cosWobble, 1); // 3D rotation flip along vertical axis

        // Dual-face lighting: when flipped to underside, use rich 3D shadow color
        ctx.fillStyle = cosWobble > 0 ? p.color : p.dark;
        ctx.globalAlpha = Math.max(0, p.opacity);

        if (p.isRibbon) {
          // Curled twisting ribbon streamer
          ctx.beginPath();
          ctx.rect(-p.w / 2, -p.h / 2, p.w, p.h);
          ctx.fill();

          // Delicate specular highlight line along ribbon center
          if (cosWobble > 0.3) {
            ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
            ctx.fillRect(-1, -p.h / 2, 2, p.h);
          }
        } else {
          // High-sheen metallic paper flake
          ctx.beginPath();
          ctx.rect(-p.w / 2, -p.h / 2, p.w, p.h);
          ctx.fill();
        }

        ctx.restore();
      });

      if (anyAlive) {
        animId = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, width, height);
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-screen h-screen pointer-events-none z-50"
    />
  );
}

interface FormRound {
  id: string;
  roundTitle: string;
  platformMode: string;
  duration: string;
  description: string;
  keyFocus: string;
}

export default function SharePlacementPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const supabase = createClient();
        const { data: { session } } = await supabase.auth.getSession();
        setIsLoggedIn(!!session?.user);
      } catch (err) {
        console.error("Auth session check error:", err);
      }
    };
    checkAuth();
  }, []);

  // 100% EMPTY STATE - ZERO HARDCODED PRE-FILLS!
  const [formData, setFormData] = useState({
    // 1. Student & Company Details
    fullName: "",
    branch: "",
    passingYear: "",
    companyName: "",
    role: "",
    location: "",
    tier: "",

    // 2. Real Salary Figures
    totalCtc: "",
    fixedBase: "",
    bonusStocks: "",
    internshipStipend: "",

    // 3. Eligibility
    minCgpa: "",
    allowedBranches: "",
    backlogPolicy: "",

    // 4. Overall Interview Experience
    difficulty: "",

    // 5. Senior Tips & Mentorship
    whatToPrepare: "",
    keyResources: "",
    linkedInUrl: "",
  });

  // Dynamic Rounds - Student decides how many rounds and names each round!
  // Starts with 1 empty round; student clicks "+ Add Another Interview Round" as needed.
  const [rounds, setRounds] = useState<FormRound[]>([
    {
      id: "1",
      roundTitle: "",
      platformMode: "",
      duration: "",
      description: "",
      keyFocus: "",
    },
  ]);

  const addRound = () => {
    setRounds([
      ...rounds,
      {
        id: Date.now().toString(),
        roundTitle: "",
        platformMode: "",
        duration: "",
        description: "",
        keyFocus: "",
      },
    ]);
  };

  const removeRound = (indexToRemove: number) => {
    if (rounds.length <= 1) return;
    setRounds(rounds.filter((_, idx) => idx !== indexToRemove));
  };

  const updateRound = (index: number, field: keyof FormRound, value: string) => {
    const updated = [...rounds];
    updated[index] = { ...updated[index], [field]: value };
    setRounds(updated);
  };

  // Senior Student Profile Photo (Headshot)
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState<string | null>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPhotoFile(file);
      setPhotoPreviewUrl(URL.createObjectURL(file));
    }
  };

  const removePhotoFile = () => {
    setPhotoFile(null);
    setPhotoPreviewUrl(null);
  };

  // Proof Document Upload (UMS Screenshot or Offer Letter / Mail)
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProofFile(e.target.files[0]);
    }
  };

  const removeProofFile = () => {
    setProofFile(null);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / 1048576).toFixed(1) + " MB";
  };

  const autoFillSampleData = () => {
    setFormData({
      fullName: "Rahul Sharma",
      branch: "B.Tech Computer Science & Engineering",
      passingYear: "2025 Batch",
      companyName: "Microsoft",
      role: "Software Development Engineer (SDE-1)",
      location: "Bangalore, Karnataka",
      tier: "Super Dream",
      totalCtc: "₹42.0 LPA",
      fixedBase: "₹24.0 LPA (~₹1,65,000 / month)",
      bonusStocks: "₹5.0 Lakh Bonus + $15k RSUs over 4 yrs",
      internshipStipend: "₹1,00,000 / month",
      minCgpa: "7.5+ CGPA",
      allowedBranches: "B.Tech CSE, IT, ECE",
      backlogPolicy: "0 Active Backlogs (Cleared history allowed)",
      difficulty: "Medium - Hard",
      whatToPrepare: "Master Striver SDE sheet for Trees & Graphs. Make sure your Major Project code is something you wrote yourself because technical interviewers will drill into why you selected specific libraries or database tables.",
      keyResources: "Striver SDE Sheet, NeetCode 150, Gate Smashers OS & DBMS, TakeUForward",
      linkedInUrl: "https://www.linkedin.com/in/rahul-sharma-sde",
    });

    setRounds([
      {
        id: "1",
        roundTitle: "Round 1: Online Assessment (OA)",
        platformMode: "HackerEarth Platform",
        duration: "90 Mins",
        description: "2 DSA questions on Binary Trees and Dynamic Programming (Coin Change variation). 20 Core CS MCQs covering OS virtual memory and DBMS indexing.",
        keyFocus: "Clean code modularity, edge cases handling, optimal O(N) time complexity.",
      },
      {
        id: "2",
        roundTitle: "Round 2: Technical Interview 1",
        platformMode: "MS Teams Video Call",
        duration: "60 Mins",
        description: "Live coding on shared editor. Graph BFS traversal problem, followed by detailed discussion on Redis caching and database indexing.",
        keyFocus: "Explain brute force first, speak thoughts aloud while coding, optimize space complexity.",
      },
    ]);

    // Auto-attach sample student profile photo & verification proof file for rapid 1-click test
    setPhotoPreviewUrl("https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80");
    setPhotoFile(null);

    try {
      const sampleBlob = new Blob([
        "OFFER OF EMPLOYMENT\nMicrosoft India (R&D) Private Limited\nCandidate: Rahul Sharma\nRole: Software Development Engineer (SDE-1)\nTotal CTC: INR 42,00,000\nStatus: Officially Verified & Accepted"
      ], { type: "text/plain" });
      const dummyFile = new File([sampleBlob], "Microsoft_Offer_Letter_Rahul_Sharma.pdf", { type: "application/pdf" });
      setProofFile(dummyFile);
    } catch {
      // ignore
    }
  };

  const clearForm = () => {
    setFormData({
      fullName: "",
      branch: "",
      passingYear: "",
      companyName: "",
      role: "",
      location: "",
      tier: "",
      totalCtc: "",
      fixedBase: "",
      bonusStocks: "",
      internshipStipend: "",
      minCgpa: "",
      allowedBranches: "",
      backlogPolicy: "",
      difficulty: "",
      whatToPrepare: "",
      keyResources: "",
      linkedInUrl: "",
    });
    setRounds([
      {
        id: "1",
        roundTitle: "",
        platformMode: "",
        duration: "",
        description: "",
        keyFocus: "",
      },
    ]);
    setPhotoFile(null);
    setPhotoPreviewUrl(null);
    setProofFile(null);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e && typeof e.preventDefault === "function") {
      e.preventDefault();
    }
    
    // 1. Check that profile photo is attached (MANDATORY)
    if (!photoFile && !photoPreviewUrl) {
      alert("Please upload your profile photo before submitting.");
      return;
    }

    // 2. Check that verification proof document is attached (MANDATORY)
    if (!proofFile) {
      alert("Please attach your verification document (UMS Result Screenshot or Job Offer Mail / Letter) before submitting.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      let proofFileUrl: string | null = null;
      let proofFileName: string | null = null;
      let studentPhotoUrl: string | null = null;

      // 1. Upload student photo if attached as File
      if (photoFile) {
        const photoBody = new FormData();
        photoBody.append("file", photoFile);
        const photoRes = await fetch("/api/upload-proof", {
          method: "POST",
          body: photoBody,
        });
        const photoJson = await photoRes.json();
        if (photoJson.success && photoJson.publicUrl) {
          studentPhotoUrl = photoJson.publicUrl;
        }
      } else if (photoPreviewUrl && photoPreviewUrl.startsWith("http")) {
        // Autofill sample image URL or external photo URL
        studentPhotoUrl = photoPreviewUrl;
      }

      // 2. Upload verification proof document through our secure server API route (bypasses RLS)
      if (proofFile) {
        proofFileName = proofFile.name;
        const uploadBody = new FormData();
        uploadBody.append("file", proofFile);

        const uploadRes = await fetch("/api/upload-proof", {
          method: "POST",
          body: uploadBody,
        });

        const uploadJson = await uploadRes.json();
        if (uploadJson.success && uploadJson.publicUrl) {
          proofFileUrl = uploadJson.publicUrl;
        } else {
          console.error("Storage upload failed:", uploadJson.error);
          setSubmitError("Failed to upload proof document: " + (uploadJson.error || "Storage error"));
          setIsSubmitting(false);
          return;
        }
      }

      // Embed student_photo_url in rounds JSONB so it is guaranteed to persist even if DB column is missing
      const roundsWithPhoto = rounds.map((r, i) =>
        i === 0 ? { ...r, student_photo_url: studentPhotoUrl } : r
      );

      // 3. Insert placement story into Supabase 'placement_stories' table
      const supabase = createClient();
      const insertPayload: any = {
        full_name: formData.fullName.trim(),
        branch: formData.branch.trim(),
        passing_year: formData.passingYear,
        company_name: formData.companyName.trim(),
        role: formData.role.trim(),
        location: formData.location.trim(),
        tier: formData.tier,
        total_ctc: formData.totalCtc.trim(),
        fixed_base: formData.fixedBase.trim(),
        bonus_stocks: formData.bonusStocks.trim() || null,
        internship_stipend: formData.internshipStipend.trim() || null,
        min_cgpa: formData.minCgpa.trim() || null,
        allowed_branches: formData.allowedBranches.trim() || null,
        backlog_policy: formData.backlogPolicy.trim() || null,
        difficulty: formData.difficulty || "Medium",
        rounds: roundsWithPhoto,
        what_to_prepare: formData.whatToPrepare.trim() || null,
        key_resources: formData.keyResources.trim() || null,
        linkedin_url: formData.linkedInUrl.trim() || null,
        proof_file_url: proofFileUrl,
        proof_file_name: proofFileName,
        status: "pending",
        is_verified: false,
      };

      if (studentPhotoUrl) {
        insertPayload.student_photo_url = studentPhotoUrl;
      }

      let { error: insertErr } = await supabase
        .from("placement_stories")
        .insert([insertPayload]);

      // If student_photo_url column is not yet in Supabase schema, retry cleanly without it (photo is still safe in rounds JSONB!)
      if (insertErr && (insertErr.message?.includes("student_photo_url") || insertErr.code === "PGRST204")) {
        console.warn("Retrying insert without student_photo_url column (photo safely preserved in rounds JSONB)");
        delete insertPayload.student_photo_url;
        const retryResult = await supabase.from("placement_stories").insert([insertPayload]);
        insertErr = retryResult.error;
      }

      if (insertErr) {
        console.error("Supabase insert error:", insertErr.message || insertErr);
        setSubmitError(insertErr.message || "Failed to submit. Please check your data.");
        setIsSubmitting(false);
        return;
      }

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: any) {
      console.error("Submission exception:", err);
      setSubmitError(err.message || "Network exception during submission");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#111111] flex flex-col font-sans selection:bg-[#FF6500] selection:text-white">
      {/* Main Container */}
      <main className="flex-1 py-12 sm:py-16 lg:py-20 px-6 sm:px-12 lg:px-16 select-none">
        <div className="max-w-4xl mx-auto space-y-10">
          
          {/* Conditional Rendering: Success Screen vs Form + Header */}
          {submitted ? (
            <div className="relative overflow-hidden bg-white border border-[#E4E4E7] rounded-xs p-8 sm:p-14 lg:p-16 text-center space-y-8 shadow-xs">
              
              {/* Confetti & Ribbons Celebration Canvas Layer (One-time cascade) */}
              <CorporateConfettiCannons />

              {/* Decorative Subtle Ambient Glow */}
              <div className="absolute -top-12 -left-12 w-36 h-36 bg-gradient-to-br from-[#FF6500]/15 to-transparent rounded-full blur-xl pointer-events-none" />
              <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-gradient-to-tl from-[#10B981]/15 to-transparent rounded-full blur-xl pointer-events-none" />

              {/* Content Box (Elevated Above Canvas, Zero Pills!) */}
              <div className="relative z-20 space-y-7 max-w-2xl mx-auto">
                
                {/* Heartfelt Congratulations on Getting Placed */}
                <div className="space-y-3">
                  <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-[#111111] tracking-tight leading-[1.18]">
                    Hearty Congratulations, <br />
                    <span className="text-[#FF6500]">
                      {formData.fullName.trim() || "Achuth"}!
                    </span>{" "}
                    🎉
                  </h2>

                  <p className="text-base sm:text-lg font-bold text-[#111111]">
                    Proud of your incredible achievement at{" "}
                    <span className="underline decoration-[#FF6500] decoration-2 underline-offset-4">
                      {formData.companyName.trim() || "Google"}
                    </span>
                    {formData.role.trim() ? ` as ${formData.role.trim()}` : ""}!
                  </p>
                </div>

                {/* Heartfelt Gratitude for Paying It Forward to Juniors */}
                <div className="space-y-4 pt-1 max-w-2xl mx-auto text-[#52525B]">
                  <p className="text-sm sm:text-base leading-relaxed font-normal">
                    Cracking campus placements takes immense dedication, endless problem-solving, and perseverance. You have earned every bit of this proud success!
                  </p>

                  <p className="text-sm sm:text-base leading-relaxed font-normal">
                    From the bottom of our hearts, <strong className="text-[#111111] font-semibold">thank you for paying it forward</strong>. By openly sharing your real interview questions, coding rounds, and salary transparency, you are giving 1st, 2nd, and 3rd-year juniors walking into Block 32 the exact roadmap and confidence they need before their own placement drive arrives.
                  </p>
                </div>

                {/* Primary Action Buttons */}
                {isLoggedIn ? (
                  <>
                    <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
                      <Link
                        href="/on-campus-placements"
                        className="px-8 py-3.5 bg-[#FF6500] hover:bg-[#E55B00] text-white text-sm font-semibold rounded-full transition shadow-sm cursor-pointer"
                      >
                        Explore Placement Feed
                      </Link>

                      <Link
                        href="/"
                        className="px-8 py-3.5 bg-[#111111] hover:bg-black text-white text-sm font-semibold rounded-full transition cursor-pointer"
                      >
                        Back to Overview
                      </Link>
                    </div>

                    {/* Subtle Reset Link */}
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          clearForm();
                          setSubmitted(false);
                        }}
                        className="text-xs text-[#71717A] hover:text-[#111111] underline transition cursor-pointer"
                      >
                        Submit another company offer or return to form
                      </button>
                    </div>
                  </>
                ) : (
                  /* Public / Alumni View: No internal portal navigation buttons, only a clean primary Submit Another button */
                  <div className="pt-6 flex flex-col items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        clearForm();
                        setSubmitted(false);
                      }}
                      className="px-8 py-3.5 bg-[#FF6500] hover:bg-[#E55B00] text-white text-sm font-semibold rounded-full transition shadow-sm cursor-pointer"
                    >
                      Submit Another Placement Story
                    </button>
                  </div>
                )}

              </div>
            </div>
          ) : (
            <div className="space-y-10">
              {/* Title Header with Clean Auto-Fill Button */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="space-y-2 text-left">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111111] tracking-tight leading-none">
                    Share Your <span className="text-[#FF6500]">Placement Story</span>
                  </h1>
                  <p className="text-sm sm:text-base text-[#52525B] max-w-2xl leading-relaxed">
                    Every detail you fill in will directly empower LPU juniors with transparent in-hand salary figures, real OA problems, and round-by-round interview intelligence.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={autoFillSampleData}
                  className="shrink-0 self-start sm:self-center px-4 py-2 bg-white hover:bg-zinc-50 text-[#111111] hover:text-[#FF6500] border border-[#E4E4E7] hover:border-[#FF6500] rounded-xs text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-2xs"
                  title="Auto-fill sample data to see an example of what to fill in each box"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#FF6500]" />
                  <span>Auto-Fill Sample</span>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="bg-white border border-[#E4E4E7] rounded-xs p-6 sm:p-10 lg:p-12 space-y-12 shadow-sm text-left">
              
              {/* ============================================================== */}
              {/* 1. BASIC PLACEMENT & JOB INFO                                  */}
              {/* ============================================================== */}
              <div className="space-y-6">
                <div className="pb-3 border-b border-[#E4E4E7]">
                  <h3 className="text-base sm:text-lg font-bold text-[#111111] uppercase tracking-wider">
                    1. Basic Placement &amp; Job Info (Student &amp; Company)
                  </h3>
                  <p className="text-xs text-[#71717A] mt-1 font-medium">
                    Basic identification of the placed student, university batch, and hiring company.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Profile Photo Upload (MANDATORY) */}
                  <div className="sm:col-span-2 flex flex-col sm:flex-row sm:items-center gap-4 p-4 bg-zinc-50 border border-[#E4E4E7] rounded-xs">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden bg-white border-2 border-zinc-200 shadow-2xs flex items-center justify-center shrink-0">
                      {photoPreviewUrl ? (
                        <img
                          src={photoPreviewUrl}
                          alt="Student Profile Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-zinc-100 flex items-center justify-center text-zinc-400">
                          <Camera className="w-6 h-6" />
                        </div>
                      )}
                    </div>
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#111111]">
                          Profile Photo *
                        </label>
                        
                      </div>
                      <p className="text-[11px] text-[#71717A]">
                        Upload your photo to appear alongside your placement card (JPG, PNG, WebP) *
                      </p>
                      <div className="flex items-center gap-2 pt-1">
                        <label className="px-3.5 py-1.5 bg-white border border-[#DCDCE0] hover:border-[#FF6500] text-zinc-800 text-xs font-bold rounded-xs cursor-pointer transition inline-flex items-center gap-1.5 shadow-2xs">
                          <Upload className="w-3.5 h-3.5 text-[#FF6500]" />
                          <span>{photoFile || photoPreviewUrl ? "Change Photo" : "Upload Photo *"}</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handlePhotoChange}
                          />
                        </label>
                        {(photoFile || photoPreviewUrl) && (
                          <button
                            type="button"
                            onClick={removePhotoFile}
                            className="px-2.5 py-1.5 text-xs text-rose-600 hover:text-rose-700 font-bold cursor-pointer"
                          >
                            Remove Photo
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#71717A] mb-2">
                      Full Name *
                    </label>
                    <input type="text"
                      
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-[#DCDCE0] rounded-xs text-[#111111] text-sm focus:outline-none focus:border-[#FF6500]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#71717A] mb-2">
                      Degree &amp; Branch *
                    </label>
                    <input type="text"
                      
                      placeholder="e.g. B.Tech Computer Science &amp; Engineering"
                      value={formData.branch}
                      onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-[#DCDCE0] rounded-xs text-[#111111] text-sm focus:outline-none focus:border-[#FF6500]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#71717A] mb-2">
                      Passing Out Batch Year *
                    </label>
                    <select 
                      required
                      value={formData.passingYear}
                      onChange={(e) => setFormData({ ...formData, passingYear: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-[#DCDCE0] rounded-xs text-[#111111] text-sm focus:outline-none focus:border-[#FF6500]"
                    >
                      <option value="">-- Select Your Batch Year --</option>
                      <option value="2025 Batch">2025 Batch (Current Final Year)</option>
                      <option value="2026 Batch">2026 Batch (Pre-Final Year Intern)</option>
                      <option value="2024 Batch">2024 Batch (Alumni)</option>
                      <option value="2027 Batch">2027 Batch</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#71717A] mb-2">
                      Company Name Placed In *
                    </label>
                    <input type="text"
                      
                      required
                      placeholder="e.g. Microsoft, Google, Juspay, Infineon"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-[#DCDCE0] rounded-xs text-[#111111] text-sm focus:outline-none focus:border-[#FF6500]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#71717A] mb-2">
                      Job Profile / Designation *
                    </label>
                    <input type="text"
                      
                      required
                      placeholder="e.g. Software Development Engineer (SDE-1)"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-[#DCDCE0] rounded-xs text-[#111111] text-sm focus:outline-none focus:border-[#FF6500]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#71717A] mb-2">
                      Job Location *
                    </label>
                    <input type="text"
                      
                      required
                      placeholder="e.g. Bangalore, Karnataka / Hyderabad / Hybrid"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-[#DCDCE0] rounded-xs text-[#111111] text-sm focus:outline-none focus:border-[#FF6500]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#71717A] mb-2">
                      LPU Placement Tier Category *
                    </label>
                    <select 
                      required
                      value={formData.tier}
                      onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-[#DCDCE0] rounded-xs text-[#111111] text-sm focus:outline-none focus:border-[#FF6500]"
                    >
                      <option value="">-- Select Placement Tier Category --</option>
                      <option value="Super Dream">Super Dream Offer (Above ₹15 LPA)</option>
                      <option value="Dream">Dream Offer (₹7 LPA to ₹15 LPA)</option>
                      <option value="Regular">Regular / Differential Offer (Up to ₹7 LPA)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* ============================================================== */}
              {/* 2. REAL SALARY BREAKDOWN (Most Critical! 💰)                    */}
              {/* ============================================================== */}
              <div className="space-y-6">
                <div className="pb-3 border-b border-[#E4E4E7]">
                  <h3 className="text-base sm:text-lg font-bold text-[#111111] uppercase tracking-wider">
                    2. Real Salary Breakdown (Transparent In-Hand Figures)
                  </h3>
                  <p className="text-xs text-[#71717A] mt-1 font-medium">
                    Colleges quote high CTC numbers. Break down the real take-home so juniors have complete financial clarity.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#71717A] mb-2">
                      Total Annual CTC (LPA) *
                    </label>
                    <input type="text"
                      
                      required
                      placeholder="e.g. ₹42.0 LPA or ₹16.0 LPA"
                      value={formData.totalCtc}
                      onChange={(e) => setFormData({ ...formData, totalCtc: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-[#DCDCE0] rounded-xs text-[#111111] text-sm focus:outline-none focus:border-[#FF6500]"
                    />
                    <span className="text-[11px] text-[#71717A] mt-1 block">Full gross package mentioned on offer letter</span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#71717A] mb-2">
                      Fixed In-Hand Base Salary (~Per Month) *
                    </label>
                    <input type="text"
                      
                      required
                      placeholder="e.g. ₹24.0 LPA (~₹1,65,000 / month)"
                      value={formData.fixedBase}
                      onChange={(e) => setFormData({ ...formData, fixedBase: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-[#DCDCE0] rounded-xs text-[#111111] text-sm focus:outline-none focus:border-[#FF6500]"
                    />
                    <span className="text-[11px] text-[#059669] font-medium mt-1 block">Actual monthly credited salary before tax</span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#71717A] mb-2">
                      Joining Bonus &amp; Stocks / RSUs (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. ₹5.0 Lakh Bonus + $15k RSUs over 4 yrs (or None)"
                      value={formData.bonusStocks}
                      onChange={(e) => setFormData({ ...formData, bonusStocks: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-[#DCDCE0] rounded-xs text-[#111111] text-sm focus:outline-none focus:border-[#FF6500]"
                    />
                    <span className="text-[11px] text-[#71717A] mt-1 block">Sign-on bonus, retention, ESOPs or vesting shares</span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#71717A] mb-2">
                      6-Month Internship Stipend (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. ₹1,00,000 / month or ₹45,000 / month (or None)"
                      value={formData.internshipStipend}
                      onChange={(e) => setFormData({ ...formData, internshipStipend: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-[#DCDCE0] rounded-xs text-[#111111] text-sm focus:outline-none focus:border-[#FF6500]"
                    />
                    <span className="text-[11px] text-[#71717A] mt-1 block">Monthly stipend paid during final semester internship</span>
                  </div>
                </div>
              </div>

              {/* ============================================================== */}
              {/* 3. ELIGIBILITY CUTOFFS (Evariki chance icharu?)                 */}
              {/* ============================================================== */}
              <div className="space-y-6">
                <div className="pb-3 border-b border-[#E4E4E7]">
                  <h3 className="text-base sm:text-lg font-bold text-[#111111] uppercase tracking-wider">
                    3. Recruiter Eligibility Cutoffs (Who got shortlisted?)
                  </h3>
                  <p className="text-xs text-[#71717A] mt-1 font-medium">
                    What were the exact minimum academic requirements specified in the UMS placement drive announcement?
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#71717A] mb-2">
                      Minimum CGPA Cutoff *
                    </label>
                    <input type="text"
                      
                      required
                      placeholder="e.g. 7.5+ CGPA or No Cutoff"
                      value={formData.minCgpa}
                      onChange={(e) => setFormData({ ...formData, minCgpa: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-[#DCDCE0] rounded-xs text-[#111111] text-sm focus:outline-none focus:border-[#FF6500]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#71717A] mb-2">
                      Allowed Branches *
                    </label>
                    <input type="text"
                      
                      required
                      placeholder="e.g. B.Tech CSE, IT, ECE or All Branches"
                      value={formData.allowedBranches}
                      onChange={(e) => setFormData({ ...formData, allowedBranches: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-[#DCDCE0] rounded-xs text-[#111111] text-sm focus:outline-none focus:border-[#FF6500]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#71717A] mb-2">
                      Backlog Policy *
                    </label>
                    <input type="text"
                      
                      required
                      placeholder="e.g. 0 Active Backlogs (Cleared history allowed)"
                      value={formData.backlogPolicy}
                      onChange={(e) => setFormData({ ...formData, backlogPolicy: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-[#DCDCE0] rounded-xs text-[#111111] text-sm focus:outline-none focus:border-[#FF6500]"
                    />
                  </div>
                </div>
              </div>

              {/* ============================================================== */}
              {/* 4. ROUND-BY-ROUND INTERVIEW PROCESS (100% STUDENT CUSTOMIZABLE) */}
              {/* ============================================================== */}
              <div className="space-y-6">
                <div className="pb-3 border-b border-[#E4E4E7] flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#111111] uppercase tracking-wider">
                      4. Round-by-Round Interview Process
                    </h3>
                    <p className="text-xs text-[#71717A] mt-1 font-medium">
                      Add as many rounds as were conducted in your placement drive. Name each round, duration, platform, and questions asked.
                    </p>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#71717A] mb-1">
                      Overall Drive Difficulty *
                    </label>
                    <select 
                      required
                      value={formData.difficulty}
                      onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                      className="px-3.5 py-2 bg-white border border-[#DCDCE0] rounded-xs text-xs font-bold text-[#111111] focus:outline-none focus:border-[#FF6500]"
                    >
                      <option value="">-- Select Difficulty --</option>
                      <option value="Easy">Difficulty: Easy</option>
                      <option value="Medium">Difficulty: Medium</option>
                      <option value="Medium - Hard">Difficulty: Medium - Hard</option>
                      <option value="Hard">Difficulty: Hard</option>
                    </select>
                  </div>
                </div>

                {/* DYNAMIC EDITABLE ROUNDS LIST */}
                <div className="space-y-6">
                  {rounds.map((round, index) => (
                    <div
                      key={round.id}
                      className="bg-[#FAF9F6] border border-[#E4E4E7] rounded-xs p-5 sm:p-6 space-y-4 relative text-left"
                    >
                      {/* Round Header Bar with Editable Title, Platform, Duration, and Remove Button */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#E4E4E7]">
                        <div className="flex-1 min-w-[240px]">
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-[#71717A] mb-1">
                            Round {index + 1} Name / Title *
                          </label>
                          <input type="text"
                            
                            required
                            placeholder="e.g. Online Assessment (OA) / Technical Round 1 / HR Round"
                            value={round.roundTitle}
                            onChange={(e) => updateRound(index, "roundTitle", e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-[#DCDCE0] rounded-xs text-xs sm:text-sm font-bold text-[#111111] focus:outline-none focus:border-[#FF6500]"
                          />
                        </div>

                        <div className="w-full sm:w-auto flex flex-wrap items-center gap-3">
                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#71717A] mb-1">
                              Platform / Mode *
                            </label>
                            <input type="text"
                              
                              required
                              placeholder="e.g. HackerEarth / MS Teams / In-Person"
                              value={round.platformMode}
                              onChange={(e) => updateRound(index, "platformMode", e.target.value)}
                              className="px-3 py-2 bg-white border border-[#DCDCE0] rounded-xs text-xs text-[#111111] focus:outline-none focus:border-[#FF6500] w-full sm:w-56"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#71717A] mb-1">
                              Duration *
                            </label>
                            <input type="text"
                              
                              required
                              placeholder="e.g. 90 Mins / 60 Mins"
                              value={round.duration}
                              onChange={(e) => updateRound(index, "duration", e.target.value)}
                              className="px-3 py-2 bg-white border border-[#DCDCE0] rounded-xs text-xs text-[#111111] focus:outline-none focus:border-[#FF6500] w-full sm:w-28"
                            />
                          </div>

                          {rounds.length > 1 && (
                            <div className="pt-4">
                              <button
                                type="button"
                                onClick={() => removeRound(index)}
                                className="p-2 text-[#EF4444] hover:bg-[#FEE2E2] rounded-xs transition cursor-pointer"
                                title="Remove this round"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Description */}
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#71717A] mb-1.5">
                          Questions Asked, Coding Problems &amp; Discussion *
                        </label>
                        <textarea rows={3}
                          
                          required
                          placeholder="Describe the coding problems asked (DSA topics), MCQs, system design questions, SQL queries, or behavioral discussions in detail..."
                          value={round.description}
                          onChange={(e) => updateRound(index, "description", e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white border border-[#DCDCE0] rounded-xs text-[#111111] text-xs sm:text-sm focus:outline-none focus:border-[#FF6500] resize-none"
                        />
                      </div>

                      {/* Key Focus */}
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#71717A] mb-1.5">
                          Key Focus / What Interviewers Looked For In Round {index + 1} *
                        </label>
                        <input type="text"
                          
                          required
                          placeholder="e.g. Clean code modularity, edge case handling, explain brute force first before optimizing..."
                          value={round.keyFocus}
                          onChange={(e) => updateRound(index, "keyFocus", e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white border border-[#DCDCE0] rounded-xs text-[#111111] text-xs sm:text-sm focus:outline-none focus:border-[#FF6500]"
                        />
                      </div>
                    </div>
                  ))}

                  {/* Add Another Round Button */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={addRound}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-[#F4F4F5] text-[#111111] text-xs font-bold border border-dashed border-zinc-400 hover:border-[#111111] rounded-xs transition cursor-pointer select-none"
                    >
                      <Plus className="w-4 h-4 text-[#FF6500]" />
                      <span>Add Another Interview Round</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* ============================================================== */}
              {/* 5. PRO-TIPS & PREPARATION ROADMAP                              */}
              {/* ============================================================== */}
              <div className="space-y-6">
                <div className="pb-3 border-b border-[#E4E4E7]">
                  <h3 className="text-base sm:text-lg font-bold text-[#111111] uppercase tracking-wider">
                    5. Pro-Tips &amp; Preparation Roadmap (Guidance for Juniors)
                  </h3>
                  <p className="text-xs text-[#71717A] mt-1 font-medium">
                    What should a 2nd or 3rd-year LPU junior study right now to crack this exact company?
                  </p>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#71717A] mb-2">
                      What to Prepare? (Preparation Roadmap &amp; Key Recommendations) *
                    </label>
                    <textarea rows={4}
                      
                      required
                      placeholder="e.g. Master Striver's SDE sheet for Trees & Graphs. Make sure your Major Project code is something you wrote yourself, because technical interviewers will drill into why you selected specific libraries or database tables."
                      value={formData.whatToPrepare}
                      onChange={(e) => setFormData({ ...formData, whatToPrepare: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-[#DCDCE0] rounded-xs text-[#111111] text-sm focus:outline-none focus:border-[#FF6500] resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#71717A] mb-2">
                      Key Learning Resources Recommended (Separated by commas) *
                    </label>
                    <input type="text"
                      
                      required
                      placeholder="e.g. Striver SDE Sheet, NeetCode 150, Gate Smashers OS & DBMS, TakeUForward"
                      value={formData.keyResources}
                      onChange={(e) => setFormData({ ...formData, keyResources: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-[#DCDCE0] rounded-xs text-[#111111] text-sm focus:outline-none focus:border-[#FF6500]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#71717A] mb-2">
                      Your LinkedIn Profile Link (To allow juniors to connect with you) *
                    </label>
                    <input type="url"
                      
                      required
                      placeholder="https://www.linkedin.com/in/your-profile-name"
                      value={formData.linkedInUrl}
                      onChange={(e) => setFormData({ ...formData, linkedInUrl: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-[#DCDCE0] rounded-xs text-[#111111] text-sm focus:outline-none focus:border-[#FF6500]"
                    />
                    <span className="text-[11px] text-[#71717A] mt-1 block">Your link will be attached to the 'Connect on LinkedIn' button inside the breakdown modal.</span>
                  </div>

                  {/* Verification Proof Document Upload */}
                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#71717A] mb-1">
                        Placement Verification Document (UMS Proof or Job Offer Mail) *
                      </label>
                      <p className="text-xs text-[#52525B] leading-relaxed">
                        To maintain 100% genuine placement records for LPU juniors, please attach your verification document. Either of the two formats below is fully acceptable:
                      </p>
                    </div>

                    {/* Acceptable Proof Types Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div className="p-3 bg-[#FAFAFA] border border-[#E4E4E7] rounded-xs text-xs text-[#111111]">
                        <strong className="font-bold">Option 1:</strong> UMS Placement Portal Result Screenshot
                      </div>
                      <div className="p-3 bg-[#FAFAFA] border border-[#E4E4E7] rounded-xs text-xs text-[#111111]">
                        <strong className="font-bold">Option 2:</strong> Official Offer Letter / Job Email (PDF/Image)
                      </div>
                    </div>

                    {/* Uploader Box */}
                    {!proofFile ? (
                      <label
                        onDragOver={(e) => {
                          e.preventDefault();
                          setIsDragging(true);
                        }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={(e) => {
                          e.preventDefault();
                          setIsDragging(false);
                          if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                            setProofFile(e.dataTransfer.files[0]);
                          }
                        }}
                        className={`border-2 border-dashed ${
                          isDragging
                            ? "border-[#FF6500] bg-[#FFF7ED]"
                            : "border-[#DCDCE0] hover:border-[#111111] bg-white"
                        } rounded-xs p-6 sm:p-8 flex flex-col items-center justify-center text-center cursor-pointer transition select-none`}
                      >
                        <input type="file"
                          accept=".pdf,image/png,image/jpeg,image/webp,image/jpg"
                          
                          onChange={handleFileChange}
                          className="sr-only"
                        />
                        <div className="w-12 h-12 bg-[#FAFAFA] border border-[#E4E4E7] rounded-full flex items-center justify-center text-[#71717A] mb-3">
                          <Upload className="w-5 h-5 text-[#FF6500]" />
                        </div>
                        <p className="text-xs sm:text-sm font-bold text-[#111111]">
                          Click to upload document or drag and drop here
                        </p>
                        <p className="text-[11px] text-[#71717A] mt-1">
                          Supported formats: PDF, PNG, JPG, or JPEG (Max 15MB)
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
                              {proofFile.name}
                            </p>
                            <p className="text-[11px] text-[#059669] font-medium">
                              {formatFileSize(proofFile.size)} • Document Attached &amp; Ready for Verification
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={removeProofFile}
                          className="p-1.5 text-[#71717A] hover:text-[#EF4444] hover:bg-[#FEE2E2] rounded-xs transition cursor-pointer"
                          title="Remove attached document"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Verification Pledge */}
                  <div className="bg-[#FAF9F6] border border-[#E4E4E7] rounded-xs p-4 flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-[#059669] shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-[#111111]">
                        Offer Letter &amp; UMS Verification Pledge
                      </p>
                      <p className="text-[11px] text-[#71717A] leading-relaxed">
                        By submitting this document, you certify that this job offer was officially secured via Lovely Professional University campus recruitment or confirmed placement drive. Your attached proof is strictly confidential and reviewed only by student moderators.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              {submitError && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xs text-xs text-red-600 font-medium">
                    {submitError}
                  </div>
                )}

                <div className={`pt-6 border-t border-[#E4E4E7] flex flex-col sm:flex-row items-center ${isLoggedIn ? "justify-between" : "justify-end"} gap-4`}>
                {isLoggedIn && (
                  <Link
                    href="/on-campus-placements"
                    className="text-xs sm:text-sm font-semibold text-[#71717A] hover:text-[#111111] transition"
                  >
                    Cancel and Go Back
                  </Link>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 bg-[#FF6500] hover:bg-[#E55B00] disabled:bg-[#FF6500]/70 text-white text-sm font-semibold rounded-full transition-colors duration-150 shadow-sm cursor-pointer select-none gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <span>Submit Placement Story</span>
                  )}
                </button>
              </div>

            </form>
            </div>
          )}

          {/* Page Footer Note */}
          <div className="pt-6 text-center">
            <p className="text-xs text-[#71717A] font-semibold">
              LPU PATH — On-Campus Placement Intelligence
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}
