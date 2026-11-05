// 4 Horizontal Key Metric KPI Stats
export const CAMPUS_JOB_STATS = [
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
] as const;

// 16 Verified On-Campus Job Profiles at LPU
export const CAMPUS_AVAILABLE_JOBS = [
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
] as const;

export interface ProcessStep {
  number: string;
  step: string;
  title: string;
  subtext?: string;
  description: string;
}

// 4-Step Process Flow of On-Campus Part-Time Employment at LPU
export const PART_TIME_PROCESS_STEPS: ProcessStep[] = [
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
export const STUDENT_WORK_ELIGIBILITY_POINTS = [
  "All the regular/distance students of Lovely Professional University who are registered in the current term and are not admitted in a programme /course with duration of less than six months are eligible to apply.",
  "The aggregate attendance of the student should be more than 75%.",
  "The student should not have any serious indiscipline case.",
  "A specific CGPA can be set as an eligibility criterion based on the job requirements.",
] as const;

// Official UMS Navigation Breadcrumb Paths
export const UMS_NAVIGATION_LINKS = [
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
] as const;
