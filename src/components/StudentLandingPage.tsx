"use client";

import { useState, useEffect, useRef } from "react";
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
  Award,
  Handshake,
  Star,
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

// 4 Key Metrics of LPU On-Campus Work Program (Vibrant, Fresh & Lively Light Colors)
const CAMPUS_JOB_STATS = [
  {
    id: "jobs",
    target: 500,
    suffix: "+",
    label: "Jobs Offered Every Semester",
    bgClass: "bg-[#FFF4EB]",
    borderClass: "border-[#FED7AA] border-t-[3px] border-t-[#FF6500]",
    hoverClass: "hover:bg-[#FFEBD9] hover:border-[#FDBA74]",
    numberColor: "text-[#FF6500]",
  },
  {
    id: "profiles",
    target: 20,
    suffix: "+",
    label: "Specialized Job Profiles",
    bgClass: "bg-[#EBF5FF]",
    borderClass: "border-[#BAE6FD] border-t-[3px] border-t-[#0284C7]",
    hoverClass: "hover:bg-[#DBEAFE] hover:border-[#7DD3FC]",
    numberColor: "text-[#0284C7]",
  },
  {
    id: "hours",
    target: 20,
    suffix: "hrs",
    label: "Working hours / week",
    bgClass: "bg-[#F5EEFF]",
    borderClass: "border-[#DDD6FE] border-t-[3px] border-t-[#7C3AED]",
    hoverClass: "hover:bg-[#EDE9FE] hover:border-[#C4B5FD]",
    numberColor: "text-[#7C3AED]",
  },
  {
    id: "female",
    target: 45,
    suffix: "%",
    label: "Jobs are availed by Female Candidates",
    bgClass: "bg-[#E8FAF0]",
    borderClass: "border-[#A7F3D0] border-t-[3px] border-t-[#059669]",
    hoverClass: "hover:bg-[#D1FAE5] hover:border-[#6EE7B7]",
    numberColor: "text-[#059669]",
  },
];

// 16 Verified On-Campus Job Profiles at LPU
const CAMPUS_AVAILABLE_JOBS = [
  {
    id: "peer-tutor",
    title: "Peer Tutor",
    description:
      "Bright students can work as teachers or teaching assistants to teach and guide juniors or weaker students.",
  },
  {
    id: "assistant-physiotherapists",
    title: "Assistant Physiotherapists",
    description:
      "Physiotherapy students can assist in all kinds of physiotherapist activities on campus during competitions and events.",
  },
  {
    id: "assistant-pharmacists",
    title: "Assistant Pharmacists",
    description:
      "Pharmacy students work part time to track the distribution of medicines and maintaining records in the University Medical Store.",
  },
  {
    id: "gsa-trainee",
    title: "GSA Trainee",
    description:
      "Hotel Management Students assist with daily routine tasks and provide guest service.",
  },
  {
    id: "assistant-technicians",
    title: "Assistant Technicians",
    description:
      "Students get avail jobs like welding, motor winding, repairing, assembling products in academic labs and workshops.",
  },
  {
    id: "medical-lab-technicians",
    title: "Medical Lab Technicians",
    description:
      "Students pursuing Clinical Microbiology in LPU can work as part time assistants in Medical Labs.",
  },
  {
    id: "dieticians",
    title: "Dieticians",
    description:
      "To guide students about healthy diets, Hotel Management division hires students to assist as dieticians.",
  },
  {
    id: "content-assistants",
    title: "Content Assistants",
    description:
      "LPU offers talented students jobs as content developers. Students assist research scholars in finding content or write blogs for the university website.",
  },
  {
    id: "sports-trainers",
    title: "Sports Trainers",
    description:
      "To coach and monitor different sports activities and athletics.",
  },
  {
    id: "computer-lab-assistant",
    title: "Computer Lab Assistant",
    description:
      "Students work as lab assistants helping in the maintenance of computers and network addressing hardware and software related issues.",
  },
  {
    id: "library-assistants",
    title: "Library Assistants",
    description:
      "Students work part time as Library Assistants and undertake responsibilities like arranging books, assisting students and maintaining overall discipline.",
  },
  {
    id: "office-assistants",
    title: "Office Assistants",
    description:
      "Part time jobs are offered for interested students in non-academic departments like hostels and uni-hospital.",
  },
  {
    id: "student-counselors",
    title: "Student Counselors",
    description:
      "To counsel parents and their wards, students take part time job as student counselors during admission time.",
  },
  {
    id: "data-entry-operators",
    title: "Data entry Operators",
    description:
      "Students working as part time data entry operators assist in storing and maintenance of office data.",
  },
  {
    id: "receptionist-campus-guides",
    title: "Receptionist & Campus Guides",
    description:
      "Students play a pivotal role as receptionists/campus guides in assisting visitors and renowned personalities see the campus.",
  },
  {
    id: "call-centre-assistant",
    title: "Call Centre Assistant",
    description:
      "Students work as Call Centre Assistants and handle support or admissions queries over phone.",
  },
];

// 4-Step Process Flow of On-Campus Part-Time Employment at LPU
const PART_TIME_PROCESS_STEPS = [
  {
    number: "01",
    step: "Step 1",
    title: "UMS Announcement",
    description:
      "Vacancies are officially published on the UMS Part-Time Job module with term eligibility criteria.",
  },
  {
    number: "02",
    step: "Step 2",
    title: "Interview",
    description:
      "Departmental interview and interaction conducted by the concerned hiring division heads.",
  },
  {
    number: "03",
    step: "Step 3",
    title: "Approval from SWW",
    subtext: "(Student Welfare Wing)",
    description:
      "Mandatory compliance check for 75%+ attendance, CGPA requirements, and clean discipline record.",
  },
  {
    number: "04",
    step: "Step 4",
    title: "Joining by HR",
    description:
      "Formal appointment letter issued by University HR to officially onboard the student.",
  },
];

// Student Work Eligibility Criteria for On-Campus Jobs
const STUDENT_WORK_ELIGIBILITY_POINTS = [
  "All the regular/distance students of Lovely Professional University who are registered in the current term and are not admitted in a programme /course with duration of less than six months are eligible to apply.",
  "The aggregate attendance of the student should be more than 75%.",
  "The student should not have any serious indiscipline case.",
  "A specific CGPA can be set as an eligibility criterion based on the job requirements.",
];

// Official UMS Navigation Breadcrumb Paths
const UMS_NAVIGATION_LINKS = [
  {
    id: "employment-policy",
    title: "Student Employment Policy",
    description:
      "Review detailed employment norms, honorarium guidelines, and work duration rules.",
    path: [
      "UMS NAVIGATION",
      "DIVISION OF STUDENT WELFARE",
      "POLICIES",
      "POLICY WISE",
      "STUDENT EMPLOYMENT POLICY",
    ],
  },
  {
    id: "job-registration",
    title: "Part-Time Job Registration",
    description:
      "Submit online application for active departmental job openings and interview calls.",
    path: [
      "UMS NAVIGATION",
      "DIVISION OF STUDENT WELFARE",
      "PART TIME JOB MODULE",
      "STUDENT REGISTRATION",
    ],
  },
];

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

export default function StudentLandingPage({ email, onSignOut }: StudentLandingPageProps) {
  const [activePillar, setActivePillar] = useState(0);
  const [companyTab, setCompanyTab] = useState<"ranked" | "partners">("ranked");
  const [companyIdx, setCompanyIdx] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const active = PILLARS[activePillar];

  const currentCompanies = companyTab === "ranked" ? TOP_ORGANISATIONS : ESTEEMED_PARTNERS;

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

            {/* RIGHT: ACTIVE CATEGORY DEEP-DIVE DETAILS (COMPACT & SNUG TO WHEEL HEIGHT) */}
            <div className="lg:col-span-6 xl:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-white relative">

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

                {/* Card Title & Icon */}
                <div className="flex items-center gap-3.5 pb-4 border-b border-[#F4F4F5]">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center transition-colors duration-300 shrink-0"
                    style={{ backgroundColor: active.bgTint, color: active.color }}
                  >
                    <active.icon className="w-6 h-6" strokeWidth={1.75} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl sm:text-3xl font-black text-[#111111] tracking-tight">
                      {active.name}
                    </h3>
                  </div>
                  <div
                    className="hidden sm:flex px-3 py-1.5 rounded-full border text-xs font-black items-center gap-1.5 transition-colors duration-300 shrink-0"
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

          {/* ========================================================= */}
          {/* ON CAMPUS AVAILABLE JOBS (MINIMAL SOFT BLACK CARD)       */}
          {/* ========================================================= */}
          <div className="pt-8 sm:pt-12 space-y-6 text-left">
            
            {/* Header: ONLY "On Campus Available Jobs" */}
            <h3 className="text-2xl sm:text-3xl font-black text-[#111111] tracking-tight">
              On Campus Available Jobs
            </h3>

            {/* 4 Cards Per Row Grid (16 Verified On-Campus Job Profiles) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
              {CAMPUS_AVAILABLE_JOBS.map((job) => (
                <div
                  key={job.id}
                  className="bg-[#F1F1F4] border border-[#DCDCE0] rounded-xs p-7 sm:p-8 min-h-[220px] sm:min-h-[240px] flex flex-col justify-start select-none text-left"
                >
                  {/* Fixed 2-line height title container: 1-line titles vertically center in middle */}
                  <div className="h-[60px] sm:h-[68px] lg:h-[72px] flex items-center mb-3">
                    <h4 className="text-xl sm:text-2xl font-black text-[#111111] tracking-tight leading-[1.2]">
                      {job.title}
                    </h4>
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
          <div className="pt-10 sm:pt-16 space-y-6 text-left">
            
            {/* Header */}
            <h3 className="text-2xl sm:text-3xl font-black text-[#111111] tracking-tight">
              Process Flow of Part-time Job
            </h3>

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

                  {/* Title Area: Fixed height so descriptions start on the exact same line */}
                  <div className="h-[54px] sm:h-[60px] flex items-center mb-2.5">
                    <h4 className="text-lg sm:text-xl font-bold text-[#111111] tracking-tight leading-snug">
                      {step.title}{" "}
                      {step.subtext && (
                        <span className="text-xs font-normal text-[#71717A] block">
                          {step.subtext}
                        </span>
                      )}
                    </h4>
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
          <div className="pt-10 sm:pt-16 space-y-6 text-left">
            <h3 className="text-2xl sm:text-3xl font-black text-[#111111] tracking-tight">
              Student’s Work Eligibility Criteria:
            </h3>

            {/* Direct Points with Filled Black Stars (No BG Box, Pure Clean List) */}
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
          <div className="pt-10 sm:pt-16 space-y-6 text-left">
            <h3 className="text-2xl sm:text-3xl font-black text-[#111111] tracking-tight">
              Important Links
            </h3>

            {/* 2 Wide Monospace Breadcrumb Navigation Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
              {UMS_NAVIGATION_LINKS.map((nav) => (
                <div
                  key={nav.id}
                  className="bg-white border border-[#E4E4E7] rounded-xs p-7 sm:p-8 flex flex-col justify-between space-y-5 select-none text-left"
                >
                  <div>
                    <h4 className="text-xl sm:text-2xl font-black text-[#111111] tracking-tight mb-2">
                      {nav.title}
                    </h4>
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

        </div>
      </section>

    </div>
  );
}
