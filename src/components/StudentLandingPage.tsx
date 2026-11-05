"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { CAMPUS_JOB_STATS } from "@/data/campusJobs";
import { SENIOR_PLACEMENT_POSTS, SeniorPlacementPost } from "@/data/seniorPlacements";
import InterviewBreakdownModal from "@/components/InterviewBreakdownModal";
import {
  ArrowRight,
  Compass,
  Building2,
  Code2,
  Target,
  Trophy,
  BadgeIndianRupee,
  CheckCircle2,
  Sparkles,
  Globe2,
  ChevronLeft,
  ChevronRight,
  Award,
  Handshake,
  Star,
  ExternalLink,
  X,
  Users,
  Headphones,
} from "lucide-react";

interface StudentLandingPageProps {
  email: string;
  onSignOut: () => void;
}

// 5 Core Intelligence Pillars of LPU PATH
const PILLARS = [
  {
    id: "companies",
    name: "Companies Directory",
    shortName: "Companies",
    badge: "Super Dream & Dream Tiers",
    color: "#FF6500", // Energy Orange
    bgTint: "#FFF5EB",
    borderTint: "#FFD8B2",
    icon: Building2,
    stat: "150+ Recruiters",
    xPct: 70.3,
    yPct: 22.0,
    description:
      "A comprehensive intelligence catalog of 150+ recurring LPU on-campus recruiters. Discover branch-wise eligibility cutoffs, CGPA gates, and verified hiring timelines.",
    features: [
      "Super Dream (₹10+ LPA), Dream (₹5-10 LPA) & Regular tier categorization",
      "Branch-wise eligibility criteria (CSE, IT, ECE, ME, Civil, Biotech)",
      "Recruiter hiring patterns, intake numbers & interview round structures",
    ],
    buttonText: "Explore Company Directory",
  },
  {
    id: "oa-vault",
    name: "OA Question Vault",
    shortName: "OA Vault",
    badge: "Online Assessments",
    color: "#4F46E5", // Indigo
    bgTint: "#EEF2FF",
    borderTint: "#C7D2FE",
    icon: Code2,
    stat: "1,200+ Questions",
    xPct: 82.9,
    yPct: 60.7,
    description:
      "Exact online assessment coding questions and aptitude patterns asked in real LPU drives on platforms like HackerRank, Mettl, CoCubes, and Superset.",
    features: [
      "Real DSA coding challenges with verified test cases & constraints",
      "Aptitude, quantitative, logical, and verbal problem archives",
      "Company-specific assessment formats and time limit blueprints",
    ],
    buttonText: "Practice Real OA Problems",
  },
  {
    id: "interviews",
    name: "Interview Archive",
    shortName: "Interviews",
    badge: "Senior Experiences",
    color: "#059669", // Emerald Green
    bgTint: "#ECFDF5",
    borderTint: "#A7F3D0",
    icon: Target,
    stat: "500+ Reports",
    xPct: 50.0,
    yPct: 84.6,
    description:
      "Authentic, unedited interview debriefs submitted by verified LPU seniors who successfully cleared on-campus technical and HR rounds.",
    features: [
      "Technical round coding, system design, and OOPs interview questions",
      "Managerial situational judgment, resume grilling, and HR blueprints",
      "Crucial elimination traps and interview conversion strategies",
    ],
    buttonText: "Read Verified Experiences",
  },
  {
    id: "hackathons",
    name: "Hackathons & Contests",
    shortName: "Hackathons",
    badge: "Direct Interview Bypass",
    color: "#D97706", // Amber
    bgTint: "#FFFBEB",
    borderTint: "#FDE68A",
    icon: Trophy,
    stat: "35+ Contests",
    xPct: 17.1,
    yPct: 60.7,
    description:
      "Curated pre-placement hackathons and competitions that offer LPU students direct interview shortlists or Pre-Placement Offers (PPOs).",
    features: [
      "Smart India Hackathon (SIH) project templates & mentor archives",
      "Corporate hackathons: Flipkart GRiD, Tata Crucible, EY GDS, Optum Stratethon",
      "Direct bypass routes to skip mass preliminary tests",
    ],
    buttonText: "Explore Direct Hiring Contests",
  },
  {
    id: "salary-intel",
    name: "Salary & CTC Intel",
    shortName: "Salary Intel",
    badge: "In-Hand Reality",
    color: "#111111", // Obsidian Black
    bgTint: "#F4F4F5",
    borderTint: "#E4E4E7",
    icon: BadgeIndianRupee,
    stat: "100% Unmasked",
    xPct: 29.7,
    yPct: 22.0,
    description:
      "Honest, transparent breakdowns of CTC packages offered at LPU. Unmask real fixed in-hand monthly bank deposits, variable bonuses, ESOPs, and service bonds.",
    features: [
      "Real in-hand monthly take-home salary vs inflated paper CTC",
      "Joining bonuses, retention clauses, and relocation reimbursements",
      "Service agreement & employment bond tenure transparency",
    ],
    buttonText: "Check In-Hand Breakdowns",
  },
];

interface CompanyLogoItem {
  id: string;
  name: string;
  logo?: string;
}

const TOP_ORGANISATIONS: CompanyLogoItem[] = [
  { id: "infosys", name: "Infosys", logo: "/companies/infosys.png" },
  { id: "cognizant", name: "Cognizant", logo: "/companies/cognizant.png" },
  { id: "capgemini", name: "Capgemini", logo: "/companies/capgemini.png" },
  { id: "bosch", name: "Bosch", logo: "/companies/bosch.png" },
  { id: "informatica", name: "Informatica", logo: "/companies/informatica.png" },
  { id: "shl", name: "SHL", logo: "/companies/shl.png" },
  { id: "business-today", name: "Business Today", logo: "/companies/business-today.png" },
];

const ESTEEMED_PARTNERS: CompanyLogoItem[] = [
  { id: "google", name: "Google", logo: "/companies/google.png" },
  { id: "microsoft", name: "Microsoft", logo: "/companies/microsoft-logo.png" },
  { id: "cadence", name: "Cadence Design Systems", logo: "/companies/cadence.png" },
  { id: "cipla", name: "Cipla", logo: "/companies/cipla.png" },
  { id: "jpmorgan", name: "JPMorganChase", logo: "/companies/jpmorgan-chase.png" },
  { id: "juspay", name: "JUSPAY", logo: "/companies/juspay.png" },
  { id: "nutanix", name: "Nutanix", logo: "/companies/nutanix.png" },
  { id: "infineon", name: "Infineon Technologies", logo: "/companies/infineon.png" },
  { id: "cultfit", name: "cult.fit", logo: "/companies/cultfit.png" },
  { id: "jio-bp", name: "Jio-bp", logo: "/companies/jio-bp.png" },
  { id: "jtp", name: "JTP", logo: "/companies/jtp.png" },
  { id: "jw-marriott", name: "JW Marriott", logo: "/companies/jw-marriott.png" },
  { id: "jubilant", name: "Jubilant Life Sciences", logo: "/companies/jubilant-lifesciences.png" },
];

// Helper to calculate polar to cartesian coordinates
const polarToCartesian = (cx: number, cy: number, r: number, angleDeg: number) => {
  const rad = ((angleDeg - 90) * Math.PI) / 180.0;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
};

// SVG Donut Segment Path Generator
function getDonutSegmentPath(
  cx: number,
  cy: number,
  rInner: number,
  rOuter: number,
  startAngle: number,
  endAngle: number
) {
  const p1 = polarToCartesian(cx, cy, rOuter, startAngle);
  const p2 = polarToCartesian(cx, cy, rOuter, endAngle);
  const p3 = polarToCartesian(cx, cy, rInner, endAngle);
  const p4 = polarToCartesian(cx, cy, rInner, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;

  return `M ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} A ${rOuter} ${rOuter} 0 ${largeArcFlag} 1 ${p2.x.toFixed(2)} ${p2.y.toFixed(2)} L ${p3.x.toFixed(2)} ${p3.y.toFixed(2)} A ${rInner} ${rInner} 0 ${largeArcFlag} 0 ${p4.x.toFixed(2)} ${p4.y.toFixed(2)} Z`;
}

// High-Performance Smooth Count-Up Animation Component with Scroll & Re-Trigger Support
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

    let startTimestamp: number | null = null;
    let animationFrameId: number;

    setValue(0);

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
  }, [target, duration, trigger, enabled]);

  return (
    <span>
      {prefix}
      {decimals > 0 ? value.toFixed(decimals) : Math.round(value)}
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

// Competitive Event / Hackathon Showcases (Sliding Carousel Data)
const EVENT_SHOWCASES = [
  {
    id: "hackerrank",
    name: "HackerRank",
    logo: "/hackerrank-logo.png",
    description:
      "HackerRank is the industry-standard developer assessment and competitive programming platform. From university coding leagues to live hackathons, it enables students to solve real-world algorithmic problems, benchmark problem-solving speed, and unlock high-tier campus hiring opportunities.",
    leaderName: "Vivek Ravisankar",
    leaderRole: "Co-Founder & CEO, HackerRank",
  },
  {
    id: "codechef",
    name: "CodeChef",
    logo: "/codechef-logo.png",
    description:
      "CodeChef is a premier competitive programming platform that hosts globally recognized monthly contests like Starters, Cook-Off, and Long Challenges. It fosters a thriving community of student developers preparing for ICPC, global Olympiads, and top-tier product engineering careers.",
    leaderName: "Bhavin Turakhia",
    leaderRole: "Founder, CodeChef",
  },
];

// Continuous Forward-Only Loop (Clones first slide at end for seamless left-only scroll)
const EXTENDED_SHOWCASES = [...EVENT_SHOWCASES, EVENT_SHOWCASES[0]];

export default function StudentLandingPage({ email, onSignOut }: StudentLandingPageProps) {
  const [activePillar, setActivePillar] = useState(0);
  const [companyTab, setCompanyTab] = useState<"ranked" | "partners">("ranked");
  const [companyIdx, setCompanyIdx] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const active = PILLARS[activePillar];

  // Section 7 Event Showcase Sliding Carousel State (Strict Left-Only Infinite Scroll)
  const [activeEventSlide, setActiveEventSlide] = useState(0);
  const [enableSlideTransition, setEnableSlideTransition] = useState(true);
  const [isEventSlidePaused, setIsEventSlidePaused] = useState(false);

  const currentCompanies = companyTab === "ranked" ? TOP_ORGANISATIONS : ESTEEMED_PARTNERS;
  const [selectedPlacement, setSelectedPlacement] = useState<SeniorPlacementPost | null>(null);

  // Scroll-triggered viewport observer for Section 5 KPI stat cards
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
          setStatsViewTrigger((v) => v + 1);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Auto-scroll horizontal carousel timer (middle company lifts up smoothly)
  useEffect(() => {
    if (isCarouselPaused || currentCompanies.length === 0) return;
    const interval = setInterval(() => {
      setCompanyIdx((prev) => (prev + 1) % currentCompanies.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [isCarouselPaused, currentCompanies.length]);

  const handleCompanyTabChange = (tab: "ranked" | "partners") => {
    setCompanyTab(tab);
    setCompanyIdx(0);
  };

  // Auto-slide timer for Section 7 (Strict Left-Only Infinite Scroll, Never Rewinds)
  useEffect(() => {
    if (isEventSlidePaused) return;
    const interval = setInterval(() => {
      setEnableSlideTransition(true);
      setActiveEventSlide((prev) => prev + 1);
    }, 4500);
    return () => clearInterval(interval);
  }, [isEventSlidePaused]);

  const handleSlideTransitionEnd = () => {
    if (activeEventSlide >= EVENT_SHOWCASES.length) {
      setEnableSlideTransition(false);
      setActiveEventSlide(0);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setEnableSlideTransition(true);
        });
      });
    }
  };

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
                  src="/hero-placement-pathway.png"
                  alt="LPU PATH Placement Intelligence Guide"
                  width={512}
                  height={341}
                  className="w-full h-auto object-contain block"
                  priority
                  unoptimized
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

      {/* ============================================================== */}
      {/* 3. CORE INTELLIGENCE PILLARS (INTERACTIVE 5-CATEGORY WHEEL)    */}
      {/* ============================================================== */}
      <section className="w-full bg-[#FAFAFA] border-t border-[#E4E4E7] py-20 lg:py-28 px-6 sm:px-12 lg:px-16 xl:px-24 relative overflow-hidden">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-[#111111] tracking-tight leading-[1.15]">
            Explore Placement Intelligence <br />
            <span className="text-[#FF6500]">by Category.</span>
          </h2>

          <p className="text-sm sm:text-base text-[#52525B] max-w-2xl mx-auto font-normal leading-relaxed">
            Hover or tap any segment in the circular intelligence wheel to unlock verified recruiter cutoffs, past assessment banks, senior interview debriefs, and transparent salary breakdowns.
          </p>
        </div>

        {/* UNIFIED MASTER SHOWCASE CARD (FLAT ZERO-ELEVATION - TRANSPARENT WHEEL SIDE + PURE WHITE DETAILS SIDE) */}
        <div className="mt-12 lg:mt-16 max-w-7xl mx-auto border border-[#E4E4E7] rounded-3xl sm:rounded-[36px] lg:rounded-[44px] overflow-hidden relative">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            
            {/* LEFT: 5-SEGMENT DONUT WHEEL (COMPACT, HEIGHT DRIVEN BY WHEEL ALONE) */}
            <div className="lg:col-span-6 xl:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col items-center justify-center relative bg-transparent">
              
              {/* Donut Container (Increased Size for Enhanced Wheel Presence) */}
              <div className="relative w-full max-w-[460px] sm:max-w-[500px] lg:max-w-[520px] aspect-square flex items-center justify-center">
                
                {/* SVG 5-Segment Donut Ring (Precision 600x600 Coordinates) */}
                <svg
                  viewBox="0 0 600 600"
                  className="w-full h-full overflow-visible select-none"
                >
                  {PILLARS.map((pillar, idx) => {
                    const startAngle = idx * 72 + 2;
                    const endAngle = (idx + 1) * 72 - 2;
                    const isActive = activePillar === idx;
                    const d = getDonutSegmentPath(300, 300, 150, 265, startAngle, endAngle);

                    return (
                      <path
                        key={pillar.id}
                        d={d}
                        fill={pillar.color}
                        opacity={isActive ? 1 : 0.85}
                        stroke="white"
                        strokeWidth={isActive ? 3.5 : 2}
                        className="cursor-pointer transition-all duration-300 hover:opacity-100"
                        onClick={() => setActivePillar(idx)}
                        onMouseEnter={() => setActivePillar(idx)}
                      />
                    );
                  })}
                </svg>

                {/* Minimalist Corporate Icons Placed Directly on the Colored Wheel Segments */}
                {PILLARS.map((pillar, idx) => {
                  const isActive = activePillar === idx;
                  const IconComponent = pillar.icon;

                  return (
                    <button
                      key={pillar.id}
                      type="button"
                      onClick={() => setActivePillar(idx)}
                      onMouseEnter={() => setActivePillar(idx)}
                      className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer z-20 outline-none p-3 group"
                      style={{ left: `${pillar.xPct}%`, top: `${pillar.yPct}%` }}
                      aria-label={pillar.name}
                      title={pillar.name}
                    >
                      <IconComponent
                        className={`w-7 h-7 sm:w-8 sm:h-8 text-white transition-opacity duration-200 ${
                          isActive
                            ? "opacity-100"
                            : "opacity-75 group-hover:opacity-100"
                        }`}
                        strokeWidth={1.75}
                      />
                    </button>
                  );
                })}

                {/* WHEEL CENTER: ONLY ACTIVE CATEGORY NAME (SMOOTH ANIMATED SWITCH) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 sm:w-56 flex items-center justify-center text-center pointer-events-none select-none z-10 px-2 overflow-hidden">
                  <span
                    key={`wheel-text-${activePillar}`}
                    className="animate-wheel-text text-base sm:text-lg lg:text-xl font-black text-[#111111] leading-tight tracking-tight block"
                  >
                    {active.shortName}
                  </span>
                </div>

              </div>

            </div>

            {/* RIGHT: ACTIVE CATEGORY DEEP-DIVE DETAILS (LOWERED VERTICALLY FOR OPTIMAL BALANCE) */}
            <div className="lg:col-span-6 xl:col-span-6 p-6 sm:p-8 lg:px-12 lg:pt-16 lg:pb-12 xl:pt-20 xl:pb-14 flex flex-col justify-between bg-white relative">

              {/* Desktop Curved Arc Separator connecting to white panel (Deepened Curve Radius Hugging the Wheel) */}
              <div className="hidden lg:block absolute -left-24 top-0 bottom-0 w-24 pointer-events-none overflow-hidden z-10">
                <svg viewBox="0 0 96 600" preserveAspectRatio="none" className="h-full w-full">
                  <path d="M 96,0 L 96,600 L 0,600 C 90,460 90,140 0,0 Z" fill="white" />
                  <path d="M 0,0 C 90,140 90,460 0,600" fill="none" stroke="#E4E4E7" strokeWidth="1.5" />
                </svg>
              </div>

              {/* Mobile Curved Arc Separator connecting to white panel (Deepened Curve Radius Hugging the Wheel) */}
              <div className="block lg:hidden absolute -top-14 left-0 right-0 h-14 pointer-events-none overflow-hidden z-10">
                <svg viewBox="0 0 600 56" preserveAspectRatio="none" className="w-full h-full">
                  <path d="M 0,56 L 600,56 L 600,0 C 440,52 160,52 0,0 Z" fill="white" />
                  <path d="M 0,0 C 160,52 440,52 600,0" fill="none" stroke="#E4E4E7" strokeWidth="1.5" />
                </svg>
              </div>

              {/* Top Section with Smooth Switch Animation */}
              <div key={`pillar-content-${activePillar}`} className="animate-pillar-switch space-y-4 sm:space-y-5">

                {/* Card Title (Clean, Icon Removed) */}
                <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#F4F4F5]">
                  <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-black text-[#111111] tracking-tight leading-tight">
                    {active.name}
                  </h3>
                  <div
                    className="hidden sm:flex px-3.5 py-1.5 rounded-full border text-xs font-black items-center transition-colors duration-300 shrink-0"
                    style={{
                      backgroundColor: active.bgTint,
                      borderColor: active.borderTint,
                      color: active.color,
                    }}
                  >
                    <span>{active.stat}</span>
                  </div>
                </div>

                {/* Category Detailed Description */}
                <p className="text-sm sm:text-base text-[#52525B] leading-relaxed font-normal">
                  {active.description}
                </p>

                {/* 3 Key Verified Features (Lines from User Sketch) */}
                <div className="space-y-2.5 pt-1">
                  {active.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-colors duration-300"
                        style={{ backgroundColor: active.bgTint, color: active.color }}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={2} />
                      </div>
                      <span className="text-sm text-[#27272A] font-medium leading-snug">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

              </div>

              {/* Card Bottom CTA & Navigation Dots (Close & Snug) */}
              <div className="pt-5 mt-5 border-t border-[#F4F4F5] flex flex-wrap items-center justify-between gap-4">
                <button
                  key={`pillar-btn-${activePillar}`}
                  type="button"
                  className="animate-pillar-switch px-6 py-3.5 text-white text-sm font-bold rounded-full transition flex items-center gap-2 cursor-pointer hover:opacity-90"
                  style={{ backgroundColor: active.color }}
                >
                  <span>{active.buttonText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* 5 Indicator Dots */}
                <div className="flex items-center gap-2">
                  {PILLARS.map((p, idx) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setActivePillar(idx)}
                      className={`h-2.5 rounded-full transition-all cursor-pointer ${
                        activePillar === idx ? "w-6" : "w-2.5 bg-zinc-200 hover:bg-zinc-300"
                      }`}
                      style={{
                        backgroundColor: activePillar === idx ? p.color : undefined,
                      }}
                      title={p.name}
                      aria-label={p.name}
                    />
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ============================================================== */}
      {/* 4. RECRUITERS DIRECTORY (CLEAN LOGOS ONLY)                     */}
      {/* ============================================================== */}
      <section className="w-full bg-white border-t border-[#E4E4E7] py-20 lg:py-28 px-6 sm:px-12 lg:px-16 xl:px-24 select-none">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Section Header */}
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-[#111111] tracking-tight leading-[1.15]">
              Highly Ranked for Placements <br />
              <span className="text-[#FF6500]">by Top Organisations.</span>
            </h2>

            <p className="text-sm sm:text-base text-[#52525B] max-w-2xl mx-auto font-normal leading-relaxed">
              Explore verified ranking benchmarks, assessment leaders, and esteemed global corporate partners recruiting on-campus at Lovely Professional University.
            </p>

            {/* Category Filter Tabs with Clean Lucide Icons (NO Emojis) */}
            <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => handleCompanyTabChange("ranked")}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer border ${
                  companyTab === "ranked"
                    ? "bg-[#111111] text-white border-[#111111]"
                    : "bg-white text-[#52525B] border-[#E4E4E7] hover:border-zinc-400 hover:text-[#111111]"
                }`}
              >
                <Award className="w-4 h-4" strokeWidth={1.75} />
                <span>Top Ranked Organisations</span>
              </button>

              <button
                type="button"
                onClick={() => handleCompanyTabChange("partners")}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer border ${
                  companyTab === "partners"
                    ? "bg-[#111111] text-white border-[#111111]"
                    : "bg-white text-[#52525B] border-[#E4E4E7] hover:border-zinc-400 hover:text-[#111111]"
                }`}
              >
                <Handshake className="w-4 h-4" strokeWidth={1.75} />
                <span>Esteemed Corporate Partners</span>
              </button>
            </div>
          </div>

          {/* HORIZONTAL AUTO-SCROLL CAROUSEL (CLEAN, LARGE LOGOS ONLY - NO CARD BORDERS) */}
          <div
            className="relative w-full max-w-7xl mx-auto h-36 sm:h-44 lg:h-48 overflow-hidden flex items-center justify-center mt-6 mb-2"
            onMouseEnter={() => setIsCarouselPaused(true)}
            onMouseLeave={() => setIsCarouselPaused(false)}
          >
            {currentCompanies.map((company, idx) => {
              const n = currentCompanies.length;
              let diff = (idx - companyIdx) % n;
              if (diff < -Math.floor(n / 2)) diff += n;
              if (diff > Math.floor(n / 2)) diff -= n;

              const isCenter = diff === 0;
              const isAdjacent = Math.abs(diff) === 1;

              return (
                <div
                  key={company.id}
                  onClick={() => setCompanyIdx(idx)}
                  className="absolute top-1/2 cursor-pointer transition-all duration-700 ease-out flex items-center justify-center select-none"
                  style={{
                    left: `calc(50% + ${diff} * clamp(280px, 34vw, 440px))`,
                    transform: `translate(-50%, ${isCenter ? "-56%" : "-50%"}) scale(${
                      isCenter ? 1.2 : isAdjacent ? 0.92 : 0.72
                    })`,
                    zIndex: isCenter ? 30 : isAdjacent ? 20 : 10,
                    opacity: isCenter ? 1 : isAdjacent ? 0.45 : 0.12,
                  }}
                >
                  <div className="w-[280px] sm:w-[340px] lg:w-[400px] h-28 sm:h-34 lg:h-38 flex items-center justify-center">
                    {company.logo ? (
                      <Image
                        src={company.logo}
                        alt={company.name}
                        width={460}
                        height={187}
                        className={`${
                          company.id === "microsoft"
                            ? "max-h-9 sm:max-h-11 lg:max-h-12 max-w-[150px] sm:max-w-[180px] lg:max-w-[210px]"
                            : company.id === "google"
                            ? "max-h-12 sm:max-h-15 lg:max-h-18 max-w-[170px] sm:max-w-[210px] lg:max-w-[240px]"
                            : "max-h-20 sm:max-h-26 lg:max-h-30 max-w-[260px] sm:max-w-[320px] lg:max-w-[380px]"
                        } w-auto object-contain transition-all duration-500 pointer-events-none drop-shadow-none`}
                        priority
                      />
                    ) : (
                      <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#111111] tracking-tight text-center px-2">
                        {company.name}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Carousel Manual Controls & Indicators (< > Neat Buttons) */}
          <div className="flex items-center justify-center gap-5 pt-0 mt-2">
            <button
              type="button"
              onClick={() =>
                setCompanyIdx((prev) => (prev - 1 + currentCompanies.length) % currentCompanies.length)
              }
              className="w-10 h-10 rounded-full bg-white border border-[#E4E4E7] text-[#52525B] hover:text-[#111111] hover:border-zinc-400 hover:bg-zinc-50 flex items-center justify-center transition cursor-pointer shadow-xs active:scale-95"
              aria-label="Previous company"
            >
              <ChevronLeft className="w-5 h-5" strokeWidth={2} />
            </button>

            {/* Indicator Dots */}
            <div className="flex items-center gap-2">
              {currentCompanies.map((c, idx) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCompanyIdx(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    companyIdx === idx ? "w-6 bg-[#111111]" : "w-2 bg-zinc-200 hover:bg-zinc-300"
                  }`}
                  title={c.name}
                  aria-label={c.name}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => setCompanyIdx((prev) => (prev + 1) % currentCompanies.length)}
              className="w-10 h-10 rounded-full bg-white border border-[#E4E4E7] text-[#52525B] hover:text-[#111111] hover:border-zinc-400 hover:bg-zinc-50 flex items-center justify-center transition cursor-pointer shadow-xs active:scale-95"
              aria-label="Next company"
            >
              <ChevronRight className="w-5 h-5" strokeWidth={2} />
            </button>
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. EARN WHILE YOU LEARN (ON-CAMPUS STUDENT WORK & EMPLOYMENT)  */}
      {/* ============================================================== */}
      <section className="w-full bg-[#FAFAFA] border-t border-[#E4E4E7] py-20 lg:py-28 px-6 sm:px-12 lg:px-16 xl:px-24 relative overflow-hidden select-none">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Section Header */}
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-[#111111] tracking-tight leading-[1.15]">
              Earn While You Learn <br />
              <span className="text-[#FF6500]">on Campus.</span>
            </h2>

            <p className="text-sm sm:text-base text-[#52525B] max-w-2xl mx-auto font-normal leading-relaxed">
              Students have the option to work part-time jobs on campus to help make college more affordable while gaining verified professional experience.
            </p>
          </div>

          {/* 4 HORIZONTAL KEY METRIC CARDS (SCROLL-TRIGGERED & MOUSE-HOVER COUNT ANIMATIONS) */}
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

          {/* MINIMAL CORPORATE CTA BUTTON: SOLID BG + NO ARROW + REFINED MEDIUM FONT WEIGHT */}
          <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/on-campus-jobs"
              className="inline-flex items-center justify-center px-8 sm:px-10 py-3.5 sm:py-4 bg-[#111111] text-white text-sm sm:text-base font-medium tracking-normal rounded-full transition-all duration-200 shadow-sm hover:shadow-md select-none cursor-pointer"
            >
              See On-Campus Jobs Available
            </Link>
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 6. ON-CAMPUS JOBS & PLACEMENT OFFERS POSTED BY SENIORS         */}
      {/* ============================================================== */}
      <section className="w-full bg-white border-t border-[#E4E4E7] py-20 lg:py-28 px-6 sm:px-12 lg:px-16 xl:px-24 relative overflow-hidden select-none">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Section Header */}
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-[#111111] tracking-tight leading-[1.15]">
              On-Campus Job Offers <br />
              <span className="text-[#FF6500]">Posted by Seniors.</span>
            </h2>

            <p className="text-sm sm:text-base text-[#52525B] max-w-2xl mx-auto font-normal leading-relaxed">
              Real company placement selections, job profiles, and package details secured directly on campus and shared by placed LPU seniors.
            </p>
          </div>

          {/* FEED / CARDS GRID (VERTICAL SHARP MINIMAL CORPORATE CARDS - TOP 3 HIGHLIGHTS) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {SENIOR_PLACEMENT_POSTS.slice(0, 3).map((post) => (
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

          {/* BOTTOM DUAL ACTIONS: VIEW MORE + SHARE YOUR PLACEMENT (PILL BUTTONS) */}
          <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/on-campus-placements"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 sm:px-10 py-3.5 sm:py-4 bg-white hover:bg-[#F8F9FA] text-[#111111] text-sm sm:text-base font-medium tracking-normal border border-[#DCDCE0] hover:border-zinc-400 rounded-full transition-colors duration-150 select-none cursor-pointer"
            >
              View More Placements
            </Link>

            <Link
              href="/share-placement"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 sm:px-10 py-3.5 sm:py-4 bg-[#FF6500] hover:bg-[#E55B00] text-white text-sm sm:text-base font-medium tracking-normal rounded-full transition-colors duration-150 select-none cursor-pointer"
            >
              Share Your Placement
            </Link>
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 7. HACKATHONS & COMPETITIVE EVENTS (ON-CAMPUS & EXTERNAL)      */}
      {/* ============================================================== */}
      <section className="w-full bg-[#FAFAFA] border-t border-[#E4E4E7] py-20 lg:py-28 px-6 sm:px-12 lg:px-16 xl:px-24 relative overflow-hidden select-none">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Section Header */}
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-[#111111] tracking-tight leading-[1.15]">
              Competitions, Hackathons &amp; Hiring <br />
              <span className="text-[#FF6500]">Compete. Build. Get Hired.</span>
            </h2>

            <p className="text-sm sm:text-base text-[#52525B] max-w-2xl mx-auto font-normal leading-relaxed">
              From intra-university hackathons and live coding contests to corporate hiring challenges and internships — discover every verified opportunity to build with peers, test your skills, and get recruited.
            </p>
          </div>

          {/* CAROUSEL SHOWCASE RECTANGLE (STATIONARY OUTER RECTANGLE, SLIDING INNER ITEMS) */}
          <div
            onMouseEnter={() => setIsEventSlidePaused(true)}
            onMouseLeave={() => setIsEventSlidePaused(false)}
            className="w-full max-w-6xl mx-auto bg-[#EFEFEF] rounded-xs overflow-hidden relative select-none"
          >
            {/* Sliding Track: ALWAYS slides to the LEFT (Never rewinds or slides backward) */}
            <div
              onTransitionEnd={handleSlideTransitionEnd}
              className={`flex w-full ${
                enableSlideTransition ? "transition-transform duration-700 ease-in-out" : ""
              }`}
              style={{ transform: `translateX(-${activeEventSlide * 100}%)` }}
            >
              {EXTENDED_SHOWCASES.map((item, idx) => (
                <div key={`${item.id}-${idx}`} className="w-full shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-12 items-stretch min-h-[360px] sm:min-h-[400px]">
                    
                    {/* Left Column: Organization Logo */}
                    <div className="md:col-span-4 lg:col-span-5 flex items-center justify-center p-8 sm:p-12 border-b md:border-b-0 md:border-r border-[#DCDCE0]">
                      <div className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 drop-shadow-xs">
                        <Image
                          src={item.logo}
                          alt={`${item.name} Logo`}
                          fill
                          className="object-contain"
                          priority
                        />
                      </div>
                    </div>

                    {/* Right Column: Title, Event Description & Founder/Lead */}
                    <div className="md:col-span-8 lg:col-span-7 p-8 sm:p-12 lg:p-14 flex flex-col justify-center space-y-4 text-left">
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#111111] tracking-tight">
                        {item.name}
                      </h3>

                      <p className="text-sm sm:text-base text-[#3F3F46] leading-relaxed font-normal">
                        {item.description}
                      </p>

                      <div className="pt-3 border-t border-[#DCDCE0] space-y-0.5">
                        <p className="text-sm sm:text-base font-bold text-[#111111]">
                          {item.leaderName}
                        </p>
                        <p className="text-xs sm:text-sm font-medium text-[#71717A]">
                          {item.leaderRole}
                        </p>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DUAL ACTIONS: EXPLORE EVENTS (FOR VIEWERS) + HOST AN EVENT (FOR ORGANIZERS) */}
          <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/competitions"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 sm:px-10 py-3.5 sm:py-4 bg-white hover:bg-[#F8F9FA] text-[#111111] text-sm sm:text-base font-medium tracking-normal border border-[#DCDCE0] hover:border-zinc-400 rounded-full transition-colors duration-150 select-none cursor-pointer"
            >
              Explore Competitions &amp; Hiring
            </Link>

            <Link
              href="/host-event"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 sm:px-10 py-3.5 sm:py-4 bg-[#111111] hover:bg-black text-white text-sm sm:text-base font-medium tracking-normal rounded-full transition-colors duration-150 select-none cursor-pointer"
            >
              Host an Event or Job
            </Link>
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 8. ON-CAMPUS PLACEMENT SUPPORT BY CAREER SERVICES              */}
      {/* ============================================================== */}
      <section className="w-full bg-white border-t border-[#E4E4E7] py-20 lg:py-28 px-6 sm:px-12 lg:px-16 xl:px-24 relative overflow-hidden select-none">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Section Header */}
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-[#111111] tracking-tight leading-[1.15]">
              On-Campus Placement Support <br />
              <span className="text-[#FF6500]">by Career Services.</span>
            </h2>

            <p className="text-sm sm:text-base text-[#52525B] max-w-2xl mx-auto font-normal leading-relaxed">
              Everything you need to navigate recruitment season on campus — interview venues in Block 32, UMS digital portal access, and official Career Services helpline contact.
            </p>
          </div>

          {/* 3 CIRCLES CONTAINER (3 SIDE BY SIDE - 100% HORIZONTALLY ALIGNED) */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-8 lg:gap-8 xl:gap-10">
            
            {/* CIRCLE 1: REPORTING & INTERVIEW VENUES (BLOCK 32) */}
            <div className="w-[300px] h-[300px] sm:w-[340px] sm:h-[340px] xl:w-[360px] xl:h-[360px] rounded-full bg-white border border-[#D4D4D8] hover:border-[#111111] transition-all duration-300 p-6 sm:p-7 flex flex-col items-center justify-center text-center shadow-xs select-none shrink-0">
              
              {/* TOP: Large Outline Icon */}
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#FAFAFA] border border-[#D4D4D8] flex items-center justify-center text-[#111111] mb-2">
                <Building2 className="w-6.5 h-6.5 sm:w-7 sm:h-7" strokeWidth={1.5} />
              </div>

              {/* Title (Fixed Height for Universal Horizontal Alignment) */}
              <div className="h-11 sm:h-12 flex items-center justify-center px-2">
                <h3 className="text-sm sm:text-base xl:text-lg font-black text-[#111111] tracking-tight leading-tight">
                  Reporting &amp; Interview Venues
                </h3>
              </div>

              {/* Middle Horizontal Divider Line (100% Level Across All 3 Circles) */}
              <div className="w-40 sm:w-44 xl:w-48 h-[1px] bg-[#D4D4D8] my-3 sm:my-3.5" />

              {/* BOTTOM: Landmark Rooms & Details */}
              <div className="space-y-1 max-w-[240px] sm:max-w-[260px]">
                <div className="h-9 sm:h-10 flex items-center justify-center">
                  <p className="text-xs sm:text-sm font-bold text-[#111111]">
                    Rooms 32-306 &amp; 32-405
                  </p>
                </div>
                <div className="h-14 sm:h-16 flex items-start justify-center">
                  <p className="text-[11px] sm:text-xs text-[#71717A] leading-relaxed">
                    Specific placement drives and company recruitment interviews are hosted on-site in{" "}
                    <span className="text-[#FF6500] font-semibold whitespace-nowrap">Block 32</span>.
                  </p>
                </div>
              </div>

            </div>

            {/* CIRCLE 2: DIGITAL ACCESS (UMS PORTAL) */}
            <div className="w-[300px] h-[300px] sm:w-[340px] sm:h-[340px] xl:w-[360px] xl:h-[360px] rounded-full bg-white border border-[#D4D4D8] hover:border-[#111111] transition-all duration-300 p-6 sm:p-7 flex flex-col items-center justify-center text-center shadow-xs select-none shrink-0">
              
              {/* TOP: Large Outline Icon */}
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#FAFAFA] border border-[#D4D4D8] flex items-center justify-center text-[#111111] mb-2">
                <Globe2 className="w-6.5 h-6.5 sm:w-7 sm:h-7" strokeWidth={1.5} />
              </div>

              {/* Title (Fixed Height for Universal Horizontal Alignment) */}
              <div className="h-11 sm:h-12 flex items-center justify-center px-2">
                <h3 className="text-sm sm:text-base xl:text-lg font-black text-[#111111] tracking-tight leading-tight">
                  Digital Access
                </h3>
              </div>

              {/* Middle Horizontal Divider Line (100% Level Across All 3 Circles) */}
              <div className="w-40 sm:w-44 xl:w-48 h-[1px] bg-[#D4D4D8] my-3 sm:my-3.5" />

              {/* BOTTOM: Landmark Rooms & Details */}
              <div className="space-y-1 max-w-[240px] sm:max-w-[260px]">
                <div className="h-9 sm:h-10 flex items-center justify-center">
                  <p className="text-xs sm:text-sm font-bold text-[#111111]">
                    Placement Services &gt; Placement Portal
                  </p>
                </div>
                <div className="h-14 sm:h-16 flex items-start justify-center">
                  <p className="text-[11px] sm:text-xs text-[#71717A] leading-relaxed">
                    Access placement registration, CV uploads, and company updates online via the <br />
                    <a
                      href="https://ums.lpu.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#FF6500] font-semibold hover:underline whitespace-nowrap"
                    >
                      UMS Portal
                    </a>.
                  </p>
                </div>
              </div>

            </div>

            {/* CIRCLE 3: HELPLINE CONTACT */}
            <div className="w-[300px] h-[300px] sm:w-[340px] sm:h-[340px] xl:w-[360px] xl:h-[360px] rounded-full bg-white border border-[#D4D4D8] hover:border-[#111111] transition-all duration-300 p-6 sm:p-7 flex flex-col items-center justify-center text-center shadow-xs select-none shrink-0">
              
              {/* TOP: Large Outline Icon */}
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#FAFAFA] border border-[#D4D4D8] flex items-center justify-center text-[#111111] mb-2">
                <Headphones className="w-6.5 h-6.5 sm:w-7 sm:h-7" strokeWidth={1.5} />
              </div>

              {/* Title (Fixed Height for Universal Horizontal Alignment) */}
              <div className="h-11 sm:h-12 flex items-center justify-center px-2">
                <h3 className="text-sm sm:text-base xl:text-lg font-black text-[#111111] tracking-tight leading-tight">
                  Helpline Contact
                </h3>
              </div>

              {/* Middle Horizontal Divider Line (100% Level Across All 3 Circles) */}
              <div className="w-40 sm:w-44 xl:w-48 h-[1px] bg-[#D4D4D8] my-3 sm:my-3.5" />

              {/* BOTTOM: Landmark Rooms & Details */}
              <div className="space-y-1 max-w-[240px] sm:max-w-[260px]">
                <div className="h-9 sm:h-10 flex items-center justify-center">
                  <p className="text-xs sm:text-sm font-bold text-[#111111]">
                    <a
                      href="tel:+911824444500"
                      className="hover:text-[#FF6500] transition-colors"
                    >
                      +91-1824-444500
                    </a>
                  </p>
                </div>
                <div className="h-14 sm:h-16 flex items-start justify-center">
                  <p className="text-[11px] sm:text-xs text-[#71717A] leading-relaxed">
                    For direct inquiries with the placement/career services office or email{" "}
                    <a
                      href="mailto:placement@lpu.co.in"
                      className="text-[#FF6500] font-semibold hover:underline"
                    >
                      placement@lpu.co.in
                    </a>.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* INTERACTIVE FULL INTERVIEW BREAKDOWN MODAL */}
      <InterviewBreakdownModal
        placement={selectedPlacement}
        onClose={() => setSelectedPlacement(null)}
      />

    </div>
  );
}
