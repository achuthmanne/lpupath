export interface SalaryBreakdown {
  totalCtc: string;
  fixedBase: string;
  bonusStocks: string;
  internshipStipend: string;
}

export interface EligibilityCriteria {
  minCgpa: string;
  allowedBranches: string;
  backlogPolicy: string;
}

export interface InterviewRound {
  roundNumber: number;
  roundName: string;
  duration: string;
  platformMode: string;
  description: string;
  keyFocus: string;
}

export interface SeniorTips {
  whatToPrepare: string;
  keyResources: string[];
  linkedInUrl: string;
}

export interface SeniorPlacementPost {
  id: string;
  studentName: string;
  avatar: string;
  batch: string;
  companyName: string;
  companyLogo: string;
  role: string;
  location: string;
  tier: "Super Dream" | "Dream" | "Regular";
  totalCtc: string;
  isVerified: boolean;
  salaryBreakdown: SalaryBreakdown;
  eligibility: EligibilityCriteria;
  roundsCount: number;
  difficulty: "Easy" | "Medium" | "Medium - Hard" | "Hard";
  rounds: InterviewRound[];
  seniorTips: SeniorTips;
}

export const SENIOR_PLACEMENT_POSTS: SeniorPlacementPost[] = [
  {
    id: "senior-1",
    studentName: "Ananya Sharma",
    avatar: "/seniors/senior-1.jpg",
    batch: "B.Tech CSE, 2025 Batch",
    companyName: "Microsoft",
    companyLogo: "/companies/microsoft.png",
    role: "Software Development Engineer (SDE-1)",
    location: "Bangalore, Karnataka",
    tier: "Super Dream",
    totalCtc: "₹42.0 LPA",
    isVerified: true,
    salaryBreakdown: {
      totalCtc: "₹42.0 LPA",
      fixedBase: "₹24.0 LPA (~₹1,65,000 / mo)",
      bonusStocks: "₹5.0 Lakh Joining + $15k RSUs (vested over 4 yrs)",
      internshipStipend: "₹1,00,000 / month (6-Month Internship)",
    },
    eligibility: {
      minCgpa: "7.5+ CGPA required at drive",
      allowedBranches: "B.Tech CSE, IT, ECE, AI/ML",
      backlogPolicy: "0 Active Backlogs (Cleared historical allowed)",
    },
    roundsCount: 4,
    difficulty: "Medium - Hard",
    rounds: [
      {
        roundNumber: 1,
        roundName: "Round 1: Online Assessment (OA)",
        duration: "90 Mins",
        platformMode: "HackerEarth Platform",
        description: "2 DSA coding questions (Binary Tree Zigzag Traversal & Dynamic Programming on Grid) + 20 MCQs covering Operating Systems, DBMS & Computer Networks.",
        keyFocus: "Clean code structure, all corner test cases passing, time complexity constraints.",
      },
      {
        roundNumber: 2,
        roundName: "Round 2: Technical Interview 1 (DSA & Coding)",
        duration: "60 Mins",
        platformMode: "Virtual (MS Teams Live Coding)",
        description: "Started with quick intro, then 2 live DSA problems: LRU Cache implementation and Graph BFS traversal. Asked to write runnable code and dry run with custom test cases.",
        keyFocus: "Explain your thought process before typing code. Start with brute force, then optimize.",
      },
      {
        roundNumber: 3,
        roundName: "Round 3: Techno-Managerial & System Design",
        duration: "45 Mins",
        platformMode: "Virtual (Senior Engineering Manager)",
        description: "High-level design discussion on building a URL Shortener service (TinyURL) handling millions of requests. Deep dive into Database Indexing, Caching with Redis, and OS Paging.",
        keyFocus: "Scalability trade-offs, SQL vs NoSQL selection, OS concurrency & thread safety.",
      },
      {
        roundNumber: 4,
        roundName: "Round 4: HR & Behavioral Fitment",
        duration: "30 Mins",
        platformMode: "Virtual (HR Director)",
        description: "Scenario-based behavioral questions: conflict resolution in university capstone projects, willingness to relocate to Bangalore, career aspirations, and bond/joining policies.",
        keyFocus: "Use the STAR technique (Situation, Task, Action, Result) for all behavioral answers.",
      },
    ],
    seniorTips: {
      whatToPrepare: "Don't jump directly into hard DP problems. Master Striver's SDE Sheet (top 150 questions) and know your Major Project architecture inside out. Interviewers will drill into why you chose specific libraries or databases.",
      keyResources: ["Striver SDE Sheet", "NeetCode 150 (Graphs & Trees)", "TakeUForward OS/DBMS Playlist"],
      linkedInUrl: "https://www.linkedin.com/in/",
    },
  },
  {
    id: "senior-2",
    studentName: "Rahul Verma",
    avatar: "/seniors/senior-1.jpg",
    batch: "B.Tech CSE, 2025 Batch",
    companyName: "Google",
    companyLogo: "/companies/google.png",
    role: "Cloud Solutions Engineer",
    location: "Hyderabad, Telangana",
    tier: "Super Dream",
    totalCtc: "₹36.0 LPA",
    isVerified: true,
    salaryBreakdown: {
      totalCtc: "₹36.0 LPA",
      fixedBase: "₹21.5 LPA (~₹1,48,000 / mo)",
      bonusStocks: "₹4.0 Lakh Sign-on + $12.5k GSU Stocks",
      internshipStipend: "₹85,000 / month (6-Month Internship)",
    },
    eligibility: {
      minCgpa: "8.0+ CGPA required at drive",
      allowedBranches: "B.Tech CSE, IT, Data Science",
      backlogPolicy: "Strictly No active or past backlogs",
    },
    roundsCount: 4,
    difficulty: "Hard",
    rounds: [
      {
        roundNumber: 1,
        roundName: "Round 1: Online Coding Challenge",
        duration: "60 Mins",
        platformMode: "Google CodeScreen",
        description: "2 LeetCode Medium/Hard algorithmic questions centered around Sliding Window and Trie Prefix matching with strict O(N) execution time limits.",
        keyFocus: "Optimal mathematical solutions, edge case handling with zero memory leak.",
      },
      {
        roundNumber: 2,
        roundName: "Round 2: Technical Problem Solving 1",
        duration: "45 Mins",
        platformMode: "Google Meet + Google Docs",
        description: "Writing syntactically correct code directly in Google Docs without syntax highlighting or autocomplete. Focused on Tree serialization and Graph cycle detection.",
        keyFocus: "Writing clean, readable code with descriptive variable names without IDE assistance.",
      },
      {
        roundNumber: 3,
        roundName: "Round 3: Cloud Architecture & OS Fundamentals",
        duration: "45 Mins",
        platformMode: "Google Meet",
        description: "Networking fundamentals: TCP 3-way handshake, DNS lookup cycle, HTTP/2 vs HTTP/3, and Linux process memory virtualization.",
        keyFocus: "Core CS networking depth and containerization (Docker, Kubernetes) basics.",
      },
      {
        roundNumber: 4,
        roundName: "Round 4: Googleyness & Leadership Round",
        duration: "30 Mins",
        platformMode: "Google Meet",
        description: "Situational questions assessing curiosity, working in ambiguous environments, receiving feedback from team members, and ethical tech decisions.",
        keyFocus: "Authenticity, empathy, and intellectual humility.",
      },
    ],
    seniorTips: {
      whatToPrepare: "Practice writing code on plain paper or Google Docs without an IDE. Google focuses heavily on how cleanly you write boundary conditions and communicate your algorithmic complexity before writing a single line.",
      keyResources: ["LeetCode Blind 75", "Computer Networking: A Top-Down Approach", "Googleyness Interview Prep Guides"],
      linkedInUrl: "https://www.linkedin.com/in/",
    },
  },
  {
    id: "senior-3",
    studentName: "Priya Patel",
    avatar: "/seniors/senior-1.jpg",
    batch: "B.Tech CSE, 2025 Batch",
    companyName: "Juspay",
    companyLogo: "/companies/juspay.png",
    role: "Backend Systems Engineer",
    location: "Bangalore, Karnataka",
    tier: "Super Dream",
    totalCtc: "₹27.0 LPA",
    isVerified: true,
    salaryBreakdown: {
      totalCtc: "₹27.0 LPA",
      fixedBase: "₹20.0 LPA (~₹1,38,000 / mo)",
      bonusStocks: "₹2.0 Lakh Retention + ESOP Pool",
      internshipStipend: "₹50,000 / month (6-Month Internship)",
    },
    eligibility: {
      minCgpa: "7.0+ CGPA required at drive",
      allowedBranches: "All B.Tech Engineering Branches",
      backlogPolicy: "Maximum 1 cleared backlog permitted",
    },
    roundsCount: 4,
    difficulty: "Hard",
    rounds: [
      {
        roundNumber: 1,
        roundName: "Round 1: 3-Hour Hiring Challenge (Tree of Space)",
        duration: "180 Mins",
        platformMode: "Online Hackathon Platform",
        description: "Juspay's famous 'Tree of Space' lock/unlock problem requiring thread-safe data structures, multi-threading synchronization, and N-ary tree locking algorithms.",
        keyFocus: "Functional programming concepts, thread safety, and concurrency primitives.",
      },
      {
        roundNumber: 2,
        roundName: "Round 2: Code Review & Optimization Interview",
        duration: "90 Mins",
        platformMode: "Virtual 1-on-1",
        description: "The interviewer opened the candidate's Hackathon code and grilled every single function, memory allocation, and concurrency lock. Asked to optimize time complexity from O(N) to O(log N).",
        keyFocus: "Defending your architectural choices and live refactoring.",
      },
      {
        roundNumber: 3,
        roundName: "Round 3: Low-Level System Design (LLD)",
        duration: "60 Mins",
        platformMode: "Virtual Live Whiteboard",
        description: "Object-oriented design for a distributed payment gateway retry mechanism with idempotency keys, database transaction locks, and state machine patterns.",
        keyFocus: "SOLID principles, design patterns (State, Strategy, Factory), ACID transactions.",
      },
      {
        roundNumber: 4,
        roundName: "Round 4: Founder / Cultural Fitment",
        duration: "30 Mins",
        platformMode: "Virtual",
        description: "Discussion on startup velocity, willingness to write clean functional code (Haskell/Rust/PureScript), and passion for high-throughput fintech infrastructure.",
        keyFocus: "High curiosity and willingness to learn uncommon technologies.",
      },
    ],
    seniorTips: {
      whatToPrepare: "Juspay is one of the hardest coding drives at LPU. Standard LeetCode alone isn't enough; practice low-level design, thread safety, multi-threading in Java/C++, and N-ary tree locking problems.",
      keyResources: ["Tree of Space Juspay GitHub Repositories", "Java Concurrency in Practice", "Head First Design Patterns"],
      linkedInUrl: "https://www.linkedin.com/in/",
    },
  },
  {
    id: "senior-4",
    studentName: "Aryan Mehta",
    avatar: "/seniors/senior-1.jpg",
    batch: "B.Tech CSE, 2025 Batch",
    companyName: "Nutanix",
    companyLogo: "/companies/nutanix.png",
    role: "Member of Technical Staff (MTS-1)",
    location: "Bangalore, Karnataka",
    tier: "Super Dream",
    totalCtc: "₹31.5 LPA",
    isVerified: true,
    salaryBreakdown: {
      totalCtc: "₹31.5 LPA",
      fixedBase: "₹22.0 LPA (~₹1,52,000 / mo)",
      bonusStocks: "₹3.5 Lakh Joining + $10k RSUs",
      internshipStipend: "₹65,000 / month (6-Month Internship)",
    },
    eligibility: {
      minCgpa: "7.5+ CGPA required at drive",
      allowedBranches: "B.Tech CSE, IT, ECE",
      backlogPolicy: "0 Active Backlogs",
    },
    roundsCount: 4,
    difficulty: "Medium - Hard",
    rounds: [
      {
        roundNumber: 1,
        roundName: "Round 1: Online Coding & Core CS OA",
        duration: "90 Mins",
        platformMode: "HackerRank",
        description: "3 DSA coding problems (Binary Search on Answer, Graph Dijkstra, Bit Manipulation) + 15 MCQs on Linux Kernel & Virtual Memory.",
        keyFocus: "Optimal Big-O complexity, Bit manipulation tricks, OS memory paging.",
      },
      {
        roundNumber: 2,
        roundName: "Round 2: Technical Interview 1 (Data Structures)",
        duration: "60 Mins",
        platformMode: "Virtual Live Coding",
        description: "Hard Heap problem (Find Median in Data Stream) and Segment Tree range query problem. Followed by deep questions on C++ pointers, memory layout, and vtable mechanics.",
        keyFocus: "Deep memory management understanding, OOP internals.",
      },
      {
        roundNumber: 3,
        roundName: "Round 3: Systems & Distributed Storage",
        duration: "60 Mins",
        platformMode: "Virtual Interview",
        description: "File systems design: Inodes, journaling, disk seek optimizations, and distributed consensus (Raft/Paxos basics). Major project architecture walkthrough.",
        keyFocus: "Operating systems architecture and storage systems.",
      },
      {
        roundNumber: 4,
        roundName: "Round 4: Techno-HR Round",
        duration: "30 Mins",
        platformMode: "Virtual Interview",
        description: "Team fitment, why hyper-converged infrastructure interests you, career trajectory for the next 3 years, and Bangalore relocation.",
        keyFocus: "Professional communication, clarity of goals.",
      },
    ],
    seniorTips: {
      whatToPrepare: "Nutanix loves candidates with strong Operating Systems and C++/Linux fundamentals. Make sure you can write clean C/C++ or Java with zero memory leaks.",
      keyResources: ["Operating Systems: Three Easy Pieces (OSTEP)", "Striver Trees & Graphs", "LeetCode Hard Priority Queue problems"],
      linkedInUrl: "https://www.linkedin.com/in/",
    },
  },
  {
    id: "senior-5",
    studentName: "Sneha Reddy",
    avatar: "/seniors/senior-1.jpg",
    batch: "B.Tech ECE, 2025 Batch",
    companyName: "Cadence",
    companyLogo: "/companies/cadence.png",
    role: "Design Verification Engineer",
    location: "Noida / Bangalore",
    tier: "Dream",
    totalCtc: "₹19.5 LPA",
    isVerified: true,
    salaryBreakdown: {
      totalCtc: "₹19.5 LPA",
      fixedBase: "₹15.0 LPA (~₹1,05,000 / mo)",
      bonusStocks: "₹1.5 Lakh Relocation + Annual Performance Bonus",
      internshipStipend: "₹45,000 / month (6-Month Internship)",
    },
    eligibility: {
      minCgpa: "7.0+ CGPA required at drive",
      allowedBranches: "B.Tech ECE, EEE, VLSI",
      backlogPolicy: "0 Active Backlogs",
    },
    roundsCount: 3,
    difficulty: "Medium",
    rounds: [
      {
        roundNumber: 1,
        roundName: "Round 1: Digital Electronics & Verilog OA",
        duration: "75 Mins",
        platformMode: "Mettl Assessment",
        description: "30 MCQs on Digital Logic, Setup/Hold time violations, FSM design, and 2 Verilog coding tasks on FIFO buffer and Sequence Detector.",
        keyFocus: "Timing diagrams, clock domain crossing, finite state machines.",
      },
      {
        roundNumber: 2,
        roundName: "Round 2: Technical Interview 1 (Digital Design)",
        duration: "60 Mins",
        platformMode: "Virtual Interview",
        description: "Live circuit analysis: CMOS inverter sizing, transistor level XOR gate, setup/hold slack calculations with clock skew and jitter, Verilog testbench coding.",
        keyFocus: "VLSI fundamentals and SystemVerilog verification methodology.",
      },
      {
        roundNumber: 3,
        roundName: "Round 3: Techno-HR & Managerial",
        duration: "45 Mins",
        platformMode: "Virtual Interview",
        description: "Discussion on capstone VLSI/FPGA projects, EDA tool familiarity (Cadence Virtuoso, Xilinx Vivado), and long-term interest in semiconductor chip verification.",
        keyFocus: "Clarity on silicon design cycle and genuine interest in EDA tools.",
      },
    ],
    seniorTips: {
      whatToPrepare: "For ECE students targeting core companies like Cadence or Infineon, focus deeply on Digital Electronics, Static Timing Analysis (STA), and Verilog/SystemVerilog instead of standard web development.",
      keyResources: ["Neso Academy Digital Electronics", "ASIC-World Verilog Tutorials", "Static Timing Analysis for Nanometer Designs"],
      linkedInUrl: "https://www.linkedin.com/in/",
    },
  },
  {
    id: "senior-6",
    studentName: "Rohan Gupta",
    avatar: "/seniors/senior-1.jpg",
    batch: "B.Tech CSE, 2025 Batch",
    companyName: "JPMorgan Chase",
    companyLogo: "/companies/jpmorgan-chase.png",
    role: "Software Analyst (Code for Good)",
    location: "Mumbai / Bangalore",
    tier: "Dream",
    totalCtc: "₹21.0 LPA",
    isVerified: true,
    salaryBreakdown: {
      totalCtc: "₹21.0 LPA",
      fixedBase: "₹16.0 LPA (~₹1,12,000 / mo)",
      bonusStocks: "₹2.0 Lakh Sign-on + Discretionary Annual Bonus",
      internshipStipend: "₹75,000 / month (Summer Internship)",
    },
    eligibility: {
      minCgpa: "7.0+ CGPA required at drive",
      allowedBranches: "B.Tech CSE, IT, ECE",
      backlogPolicy: "0 Active Backlogs",
    },
    roundsCount: 3,
    difficulty: "Medium",
    rounds: [
      {
        roundNumber: 1,
        roundName: "Round 1: HackerRank OA + HireVue Video Interview",
        duration: "90 Mins",
        platformMode: "HackerRank + HireVue AI",
        description: "2 Medium DSA problems (Array manipulation, Greedy) followed by 2 recorded HireVue behavioral video questions answering on prompt.",
        keyFocus: "Confident speaking in HireVue and fast, optimal coding in OA.",
      },
      {
        roundNumber: 2,
        roundName: "Round 2: 24-Hour Code for Good (CFG) Hackathon",
        duration: "24 Hours",
        platformMode: "Hybrid Hackathon Event",
        description: "Built a real-world web/mobile solution for a registered NGO alongside a team of 6 students, mentored by JPMorgan senior engineers evaluating collaboration, git workflows, and agile velocity.",
        keyFocus: "Teamwork, clean git commits, active code contribution, and final client pitch.",
      },
      {
        roundNumber: 3,
        roundName: "Round 3: Final Leadership Evaluation & Offer Pitch",
        duration: "30 Mins",
        platformMode: "In-Person / Virtual Panel",
        description: "SME panel asking individual contribution during the hackathon, handling technical hurdles, banking security standards, and why financial tech.",
        keyFocus: "Leadership, communication skills, and architectural clarity.",
      },
    ],
    seniorTips: {
      whatToPrepare: "JPMorgan Chase recruits majorly through the 'Code for Good' hackathon. Make sure your full-stack skills (React/Node or Spring Boot) and Git collaboration are strong. Mentors watch how well you communicate with teammates, not just lone-wolf coding.",
      keyResources: ["Full Stack Open (University of Helsinki)", "LeetCode Medium Collection", "JPMC CFG Past Problem Statements"],
      linkedInUrl: "https://www.linkedin.com/in/",
    },
  },
  {
    id: "senior-7",
    studentName: "Divya Nair",
    avatar: "/seniors/senior-1.jpg",
    batch: "B.Tech CSE, 2025 Batch",
    companyName: "Bosch",
    companyLogo: "/companies/bosch.png",
    role: "Embedded Systems Engineer",
    location: "Bangalore / Coimbatore",
    tier: "Dream",
    totalCtc: "₹14.0 LPA",
    isVerified: true,
    salaryBreakdown: {
      totalCtc: "₹14.0 LPA",
      fixedBase: "₹11.0 LPA (~₹78,000 / mo)",
      bonusStocks: "₹1.0 Lakh Joining + Medical Insurance Package",
      internshipStipend: "₹35,000 / month (6-Month Internship)",
    },
    eligibility: {
      minCgpa: "7.0+ CGPA required at drive",
      allowedBranches: "B.Tech CSE, ECE, Mechanical (Robotics)",
      backlogPolicy: "0 Active Backlogs",
    },
    roundsCount: 3,
    difficulty: "Medium",
    rounds: [
      {
        roundNumber: 1,
        roundName: "Round 1: Aptitude & Embedded C Assessment",
        duration: "90 Mins",
        platformMode: "CoCubes Platform",
        description: "20 Aptitude & Logical Reasoning + 30 Embedded C MCQs (Pointers, Bitwise operators, Struct memory alignment) + 2 coding questions in C.",
        keyFocus: "Bitwise manipulation, microcontrollers architecture, struct padding.",
      },
      {
        roundNumber: 2,
        roundName: "Round 2: Technical Interview (Embedded Architecture)",
        duration: "45 Mins",
        platformMode: "Virtual Interview",
        description: "CAN protocol vs I2C vs SPI, RTOS basics (mutex vs semaphore, priority inversion), Interrupt Service Routines (ISR), and hands-on microcontroller project discussion.",
        keyFocus: "Deep knowledge of serial protocols and real-time operating systems.",
      },
      {
        roundNumber: 3,
        roundName: "Round 3: HR & Management Discussion",
        duration: "25 Mins",
        platformMode: "Virtual Interview",
        description: "Automotive domain interest (connected vehicles, ADAS), team adaptability, relocation to Bangalore/Coimbatore, and university achievements.",
        keyFocus: "Genuine automotive passion and stable long-term career outlook.",
      },
    ],
    seniorTips: {
      whatToPrepare: "Bosch places high value on real embedded hardware projects. Build something practical on STM32, Arduino, or ESP32 with sensors and communication protocols. Be ready to explain your hardware schematic diagram.",
      keyResources: ["FastBit Embedded Brain Academy (Udemy)", "GeeksforGeeks Embedded C", "Embedded Systems by Raj Kamal"],
      linkedInUrl: "https://www.linkedin.com/in/",
    },
  },
  {
    id: "senior-8",
    studentName: "Karthik Raja",
    avatar: "/seniors/senior-1.jpg",
    batch: "B.Tech CSE, 2025 Batch",
    companyName: "Jio-bp",
    companyLogo: "/companies/jio-bp.png",
    role: "Operations Technology Lead",
    location: "Navi Mumbai, Maharashtra",
    tier: "Dream",
    totalCtc: "₹12.5 LPA",
    isVerified: true,
    salaryBreakdown: {
      totalCtc: "₹12.5 LPA",
      fixedBase: "₹10.0 LPA (~₹72,000 / mo)",
      bonusStocks: "₹1.0 Lakh Performance Linked Incentive",
      internshipStipend: "₹30,000 / month (6-Month Internship)",
    },
    eligibility: {
      minCgpa: "6.5+ CGPA required at drive",
      allowedBranches: "All B.Tech Engineering Branches",
      backlogPolicy: "Up to 1 cleared backlog permitted",
    },
    roundsCount: 3,
    difficulty: "Medium",
    rounds: [
      {
        roundNumber: 1,
        roundName: "Round 1: Cognitive & Tech Online Test",
        duration: "75 Mins",
        platformMode: "Superset Assessment",
        description: "Quantitative aptitude, English verbal, Logical reasoning, followed by 10 SQL queries and 1 simple array manipulation code.",
        keyFocus: "Speed, accuracy in quantitative aptitude and error-free SQL queries.",
      },
      {
        roundNumber: 2,
        roundName: "Round 2: Technical & Domain Interview",
        duration: "40 Mins",
        platformMode: "Virtual Interview",
        description: "Relational database management systems (RDBMS), SQL indexing, IoT device communication protocols (MQTT, HTTP), and cloud data pipelines.",
        keyFocus: "Practical problem solving and clean communication.",
      },
      {
        roundNumber: 3,
        roundName: "Round 3: Leadership & HR Round",
        duration: "20 Mins",
        platformMode: "Virtual Interview",
        description: "Discussion on modern mobility, EV charging infrastructure network deployment, relocation to Navi Mumbai, and managing multi-disciplinary operations.",
        keyFocus: "Confidence, corporate readiness, and leadership potential.",
      },
    ],
    seniorTips: {
      whatToPrepare: "Don't ignore quantitative aptitude and SQL! Companies like Jio-bp look for well-rounded engineers who can manage real-world enterprise infrastructure and data pipelines.",
      keyResources: ["IndiaBIX Quantitative Aptitude", "LeetCode SQL 50 Study Plan", "SQLBolt Interactive Tutorial"],
      linkedInUrl: "https://www.linkedin.com/in/",
    },
  },
  {
    id: "senior-9",
    studentName: "Neha Choudhary",
    avatar: "/seniors/senior-1.jpg",
    batch: "B.Tech CSE, 2025 Batch",
    companyName: "Capgemini",
    companyLogo: "/companies/capgemini.png",
    role: "Senior Software Analyst (Exceller Differential)",
    location: "Pune / Noida",
    tier: "Regular",
    totalCtc: "₹10.0 LPA",
    isVerified: true,
    salaryBreakdown: {
      totalCtc: "₹10.0 LPA",
      fixedBase: "₹8.5 LPA (~₹62,000 / mo)",
      bonusStocks: "₹75,000 Performance Incentive",
      internshipStipend: "₹25,000 / month (4-Month Training)",
    },
    eligibility: {
      minCgpa: "6.5+ CGPA required at drive",
      allowedBranches: "B.Tech CSE, IT, ECE, Mechanical",
      backlogPolicy: "0 Active Backlogs (Historical cleared allowed)",
    },
    roundsCount: 4,
    difficulty: "Medium",
    rounds: [
      {
        roundNumber: 1,
        roundName: "Round 1: Technical Assessment & Pseudo-Code",
        duration: "80 Mins",
        platformMode: "Aon CoCubes",
        description: "Pseudo-code debugging, Data Structures MCQs, and English communication gaming assessments.",
        keyFocus: "Time management and pseudo-code tracing accuracy.",
      },
      {
        roundNumber: 2,
        roundName: "Round 2: Coding & Advanced Assessment",
        duration: "60 Mins",
        platformMode: "Aon Coding",
        description: "2 Coding problems (Strings & Dynamic Programming basics) for the higher 7.5 LPA - 10 LPA differential package slab.",
        keyFocus: "Optimal string algorithms and passing all hidden test cases.",
      },
      {
        roundNumber: 3,
        roundName: "Round 3: Spoken English Assessment",
        duration: "30 Mins",
        platformMode: "Automated Voice AI",
        description: "Repeat sentences, reading comprehension, and spontaneous speaking on a given corporate topic.",
        keyFocus: "Clear pronunciation, grammar, and steady speaking pace.",
      },
      {
        roundNumber: 4,
        roundName: "Round 4: Technical & HR Interview",
        duration: "35 Mins",
        platformMode: "Virtual Interview",
        description: "OOPs concepts (Polymorphism, Abstraction), Database Normalization, Capstone project overview, and client project willingness.",
        keyFocus: "Clean articulation of core CS concepts.",
      },
    ],
    seniorTips: {
      whatToPrepare: "Aim for the Capgemini Exceller differential package test by practicing string manipulation and OOPs. The English speaking round eliminates many candidates, so practice speaking clearly in front of a mirror or recorder.",
      keyResources: ["PrepInsta Capgemini Placement Papers", "Java OOPs Concepts with Real Examples", "English Spoken AI Practice"],
      linkedInUrl: "https://www.linkedin.com/in/",
    },
  },
  {
    id: "senior-10",
    studentName: "Vikram Malhotra",
    avatar: "/seniors/senior-1.jpg",
    batch: "B.Tech CSE, 2025 Batch",
    companyName: "Cognizant",
    companyLogo: "/companies/cognizant.png",
    role: "Full Stack Developer (GenC Next)",
    location: "Chennai / Hyderabad",
    tier: "Regular",
    totalCtc: "₹8.5 LPA",
    isVerified: true,
    salaryBreakdown: {
      totalCtc: "₹8.5 LPA",
      fixedBase: "₹7.5 LPA (~₹55,000 / mo)",
      bonusStocks: "₹50,000 Retention Bonus",
      internshipStipend: "₹22,000 / month (Internship Period)",
    },
    eligibility: {
      minCgpa: "6.0+ CGPA required at drive",
      allowedBranches: "All B.Tech Engineering Branches",
      backlogPolicy: "Maximum 1 active backlog permitted at registration",
    },
    roundsCount: 3,
    difficulty: "Medium",
    rounds: [
      {
        roundNumber: 1,
        roundName: "Round 1: GenC Next Advanced Skill Assessment",
        duration: "100 Mins",
        platformMode: "AMCAT / SHL",
        description: "Advanced coding: 2 algorithmic problems + MCQs on Cloud, Web Development (HTML/CSS/JS), and Database queries.",
        keyFocus: "Solving at least 1.5 coding problems completely.",
      },
      {
        roundNumber: 2,
        roundName: "Round 2: Technical Interview (Full Stack)",
        duration: "45 Mins",
        platformMode: "Virtual Interview",
        description: "Frontend vs Backend integration, RESTful API design, HTTP status codes, SQL subqueries, and git branching strategies.",
        keyFocus: "End-to-end full stack architecture understanding.",
      },
      {
        roundNumber: 3,
        roundName: "Round 3: HR & Document Verification",
        duration: "20 Mins",
        platformMode: "Virtual Interview",
        description: "Document validation, relocation agreement, communication verification, and offer rollout schedule.",
        keyFocus: "Promptness and clear documentation.",
      },
    ],
    seniorTips: {
      whatToPrepare: "Target the 'GenC Next' category for the highest package slab at Cognizant. Build a proper full-stack web project deployed on Vercel/Render with database connection to showcase live during the technical interview.",
      keyResources: ["AMCAT Advanced Coding Collection", "Traversy Media Full Stack Guides", "W3Schools SQL & JavaScript Tutorials"],
      linkedInUrl: "https://www.linkedin.com/in/",
    },
  },
];
