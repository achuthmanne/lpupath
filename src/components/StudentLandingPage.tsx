"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
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

const INDIAN_COMPANIES: CompanyLogoItem[] = [
  { id: "infosys", name: "Infosys", logo: "/companies/infosys.png" },
  { id: "cognizant", name: "Cognizant", logo: "/companies/cognizant.png" },
  { id: "capgemini", name: "Capgemini", logo: "/companies/capgemini.png" },
  { id: "informatica", name: "Informatica", logo: "/companies/informatica.png" },
  { id: "business-today", name: "Business Today", logo: "/companies/business-today.png" },
];

const INTERNATIONAL_COMPANIES: CompanyLogoItem[] = [
  { id: "google", name: "Google" },
  { id: "microsoft", name: "Microsoft" },
  { id: "amazon", name: "Amazon" },
  { id: "apple", name: "Apple" },
  { id: "cisco", name: "Cisco Systems" },
  { id: "oracle", name: "Oracle" },
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
  const [activePillar, setActivePillar] = useState(0);
  const [companyTab, setCompanyTab] = useState<"national" | "international">("national");
  const [companyIdx, setCompanyIdx] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const active = PILLARS[activePillar];

  const currentCompanies = companyTab === "national" ? INDIAN_COMPANIES : INTERNATIONAL_COMPANIES;

  // Auto-scroll horizontal carousel timer (middle company lifts up smoothly)
  useEffect(() => {
    if (isCarouselPaused || currentCompanies.length === 0) return;
    const interval = setInterval(() => {
      setCompanyIdx((prev) => (prev + 1) % currentCompanies.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [isCarouselPaused, currentCompanies.length]);

  const handleCompanyTabChange = (tab: "national" | "international") => {
    setCompanyTab(tab);
    setCompanyIdx(0);
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

        {/* Circular Wheel + Interactive Showcase Grid */}
        <div className="mt-14 lg:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-20 items-start max-w-7xl mx-auto">
          
          {/* LEFT: 5-SEGMENT DONUT WHEEL WITH CENTRAL HOLE */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-center">
            
            {/* Donut Container (Increased Size for Generous Wheel Presence) */}
            <div className="relative w-full max-w-[450px] sm:max-w-[490px] lg:max-w-[500px] aspect-square flex items-center justify-center">
              
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

            </div>

            {/* Quick Segment Selector Pills (Under Wheel) */}
            <div className="mt-6 sm:mt-7 flex flex-wrap items-center justify-center gap-2 max-w-[480px]">
              {PILLARS.map((p, idx) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActivePillar(idx)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
                    activePillar === idx
                      ? "text-white"
                      : "bg-white text-[#52525B] border-[#E4E4E7] hover:border-zinc-400 hover:text-[#111111]"
                  }`}
                  style={{
                    backgroundColor: activePillar === idx ? p.color : undefined,
                    borderColor: activePillar === idx ? p.color : undefined,
                  }}
                >
                  <p.icon className="w-3.5 h-3.5" strokeWidth={activePillar === idx ? 2 : 1.75} />
                  <span>{p.shortName}</span>
                </button>
              ))}
            </div>

          </div>

          {/* RIGHT: ACTIVE CATEGORY DEEP-DIVE SHOWCASE CARD (FLAT & ALIGNED WITH WHEEL) */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-start">
            <div className="bg-white border border-[#E4E4E7] rounded-3xl p-6 sm:p-8 lg:p-9 lg:min-h-[500px] flex flex-col justify-between relative overflow-hidden transition-all duration-300">

              {/* Top Section */}
              <div className="space-y-6">
                {/* Card Header Row */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#F4F4F5]">
                  <div className="flex items-center gap-3.5">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center transition-colors duration-300"
                      style={{ backgroundColor: active.bgTint, color: active.color }}
                    >
                      <active.icon className="w-6 h-6" strokeWidth={1.75} />
                    </div>
                    <div>
                      <div
                        className="text-xs font-bold uppercase tracking-wider transition-colors duration-300"
                        style={{ color: active.color }}
                      >
                        {active.badge}
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-black text-[#111111] tracking-tight mt-0.5">
                        {active.name}
                      </h3>
                    </div>
                  </div>

                  {/* Key Stat Badge */}
                  <div
                    className="px-3.5 py-1.5 rounded-full border text-xs font-black flex items-center gap-1.5 transition-colors duration-300"
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

                {/* 3 Key Verified Features */}
                <div className="space-y-3 pt-1">
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

              {/* Card Bottom CTA & Navigation Dots */}
              <div className="pt-6 mt-6 border-t border-[#F4F4F5] flex flex-wrap items-center justify-between gap-4">
                <button
                  type="button"
                  className="px-6 py-3.5 text-white text-sm font-bold rounded-full transition flex items-center gap-2 cursor-pointer hover:opacity-90"
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
                      className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                        activePillar === idx ? "scale-125" : "bg-zinc-200 hover:bg-zinc-300"
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
              Explore leading national enterprises and verified organisations hiring on-campus at Lovely Professional University.
            </p>

            {/* Category Filter Tabs with Clean Lucide Icons (NO Emojis) */}
            <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => handleCompanyTabChange("national")}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer border ${
                  companyTab === "national"
                    ? "bg-[#111111] text-white border-[#111111]"
                    : "bg-white text-[#52525B] border-[#E4E4E7] hover:border-zinc-400 hover:text-[#111111]"
                }`}
              >
                <Building2 className="w-4 h-4" strokeWidth={1.75} />
                <span>Indian Organisations</span>
              </button>

              <button
                type="button"
                onClick={() => handleCompanyTabChange("international")}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer border ${
                  companyTab === "international"
                    ? "bg-[#111111] text-white border-[#111111]"
                    : "bg-white text-[#52525B] border-[#E4E4E7] hover:border-zinc-400 hover:text-[#111111]"
                }`}
              >
                <Globe2 className="w-4 h-4" strokeWidth={1.75} />
                <span>International Recruiters</span>
              </button>
            </div>
          </div>

          {/* HORIZONTAL AUTO-SCROLL CAROUSEL (MIDDLE ITEM LIFTS UP SMOOTHLY) */}
          <div
            className="relative w-full max-w-5xl mx-auto h-48 sm:h-52 lg:h-56 overflow-hidden flex items-center justify-center my-4"
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
                  className="absolute top-1/2 cursor-pointer transition-all duration-600 ease-out flex items-center justify-center select-none"
                  style={{
                    left: `calc(50% + ${diff} * clamp(155px, 22vw, 240px))`,
                    transform: `translate(-50%, ${isCenter ? "-68%" : "-50%"}) scale(${
                      isCenter ? 1.15 : isAdjacent ? 0.95 : 0.8
                    })`,
                    zIndex: isCenter ? 30 : isAdjacent ? 20 : 10,
                    opacity: isCenter ? 1 : isAdjacent ? 0.72 : 0.3,
                  }}
                >
                  <div
                    className={`w-[190px] sm:w-[220px] lg:w-[230px] h-24 sm:h-28 lg:h-30 rounded-2xl bg-white border p-5 flex items-center justify-center transition-all duration-300 ${
                      isCenter
                        ? "border-[#FF6500] shadow-lg ring-2 ring-[#FF6500]/20"
                        : "border-[#E4E4E7] hover:border-zinc-400"
                    }`}
                  >
                    {company.logo ? (
                      <Image
                        src={company.logo}
                        alt={company.name}
                        width={180}
                        height={64}
                        className={`max-h-12 sm:max-h-14 w-auto object-contain transition-all duration-300 pointer-events-none ${
                          isCenter ? "scale-105" : "grayscale-[40%]"
                        }`}
                        priority
                      />
                    ) : (
                      <span className="text-xs sm:text-sm font-bold text-[#27272A] tracking-tight text-center px-2">
                        {company.name}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Carousel Manual Controls & Indicators */}
          <div className="flex items-center justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={() =>
                setCompanyIdx((prev) => (prev - 1 + currentCompanies.length) % currentCompanies.length)
              }
              className="w-9 h-9 rounded-full bg-white border border-[#E4E4E7] text-[#52525B] hover:text-[#111111] hover:border-zinc-400 flex items-center justify-center transition cursor-pointer"
              aria-label="Previous company"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Indicator Dots */}
            <div className="flex items-center gap-2">
              {currentCompanies.map((c, idx) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCompanyIdx(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    companyIdx === idx ? "w-6 bg-[#FF6500]" : "w-2 bg-zinc-200 hover:bg-zinc-300"
                  }`}
                  title={c.name}
                  aria-label={c.name}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => setCompanyIdx((prev) => (prev + 1) % currentCompanies.length)}
              className="w-9 h-9 rounded-full bg-white border border-[#E4E4E7] text-[#52525B] hover:text-[#111111] hover:border-zinc-400 flex items-center justify-center transition cursor-pointer"
              aria-label="Next company"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

    </div>
  );
}
