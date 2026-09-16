/**
 * ============================================================
 *  PORTFOLIO CONTENT — single source of truth
 * ============================================================
 *  Edit this file to update your portfolio. No UI changes needed.
 *
 *  Quick guide:
 *   • personal.email / github / linkedin → replace placeholders
 *   • experience[]      → add/remove roles (newest first)
 *   • projects[]        → give each project a `category`:
 *                         "Development" | "Data Analytics" | "AI"
 *   • project.image     → "/projects/your-file.jpg"
 *                         (drop the image in public/projects/)
 *                         leave "" to show an auto-generated placeholder
 *   • project.github/demo → leave "" to hide the button entirely
 *   • certifications[]  → uncomment the example below and fill in
 *   • resume is always  /resume.pdf  (public/resume.pdf)
 * ============================================================
 */

export const portfolio = {
  personal: {
    name: "Smit Shewale",
    role: "Computer Science Engineer",
    roles: ["Software Developer", "Data Analyst", "AI Enthusiast"],
    tagline:
      "I build reliable software and turn raw data into clear, actionable insight — currently exploring the intersection of development, analytics and AI.",
    location: "Solapur, India",
    email: "smit9552@gmail.com",
    github: "https://github.com/smitcodes",
    linkedin: "https://www.linkedin.com/in/smitshewale",
  },

  about: {
    shortIntro:
      "I'm a Computer Science Engineering student who enjoys the full journey of a project — from writing clean backend code to analysing data and presenting what it means.",
    currentFocus:
      "Currently focused on backend development with Java, Spring Boot and MySQL, alongside hands-on data analytics work using Python, Pandas and visualization tools.",
    interests: [
      "Software Development",
      "Data Analytics",
      "Machine Learning & AI",
      "Database Design",
      "Problem Solving",
    ],
    education:
      "Pursuing a B.Tech in Computer Science Engineering, building a strong foundation in programming, data structures, algorithms, databases and software engineering.",
    philosophy:
      "I believe great software comes from clarity — clean code, honest data and simple, well-reasoned solutions. I learn best by building, breaking and rebuilding.",
  },

  contact: {
    message:
      "I'm open to internships, entry-level roles and collaboration in software development and data analytics — if you'd like to talk about a project or opportunity, my inbox is always open.",
  },

  stats: [
    { value: 10, suffix: "+", label: "Public Repos" },
    { value: 60, suffix: "", label: "Days Internship" },
    { value: 4, suffix: "", label: "Featured Projects" },
    { value: 20, suffix: "+", label: "Technologies" },
  ],
  education: [
    {
      degree: "B.Tech — Computer Science Engineering",
      institution: "WIT Solapur", // ← replace
      period: "2023 – 2027", // ← replace
      description: "Pursuing — core focus on software engineering, databases and data-driven problem solving.",
    },
  ],

  skills: {
    programming: ["Python", "Java", "JavaScript", "SQL"],
    webDevelopment: ["HTML", "CSS", "JavaScript", "React", "Node.js", "Express.js", "Spring Boot", "EJS", "Bootstrap"],
    databases: ["MySQL", "MongoDB", "PostgreSQL"],
    dataAnalytics: ["Pandas", "NumPy", "Matplotlib", "Power BI"],
    tools: ["Git", "GitHub", "VS Code", "Jupyter Notebook"],
  },

  experience: [
    {
      role: "Data Analytics Intern",
      company: "ApexPlanet Software Pvt. Ltd.",
      period: "Mar 2026 – May 2026",
      description:
        "Worked on real-world datasets through the full analytics pipeline — cleaning messy data, building reliable preprocessing steps and communicating findings clearly.",
      highlights: [
        "Performed data cleaning and preprocessing to prepare raw datasets for analysis",
        "Handled missing values and improved overall data quality",
        "Applied feature engineering to support more meaningful analysis",
        "Conducted exploratory data analysis (EDA) and produced analytical reports",
      ],
    },
  ],

  projects: [
    {
      title: "College Event Management System",
      category: "Development",
      description:
        "A Java-based web application to streamline the organisation of college events — admins schedule, update and monitor events while students browse and register through a simple interface.",
      overview:
        "Built with Spring Boot and MySQL, the platform gives administrators an easy way to schedule, update and monitor events, while students get a clean interface to browse and register. It covers role-based access, event scheduling and participant management — a practical exercise in full-stack Java development and relational data modelling.",
      highlights: [
        "Role-based access — separate admin and student workflows",
        "Event scheduling, updating and monitoring from an admin dashboard",
        "Student registration through a clean, simple interface",
        "Relational data model built on MySQL",
      ],      technologies: ["Java", "Spring Boot", "MySQL"],
      github: "https://github.com/smitcodes/College_Event_Management",
      demo: "",
      image: "",
    },
    {
      title: "Smart Portal",
      category: "Development",
      description:
        "An Express.js web portal with a student registration and feedback system — server-rendered views, form handling and persistent storage.",
      overview:
        "Smart Portal is a full-stack FSD project built with Node.js and Express.js, using EJS templates for server-rendered pages. It implements student registration with validation and a structured feedback system, demonstrating routing, middleware, form handling and data persistence end to end.",
      highlights: [
        "Student registration flow with server-side validation",
        "Structured feedback collection and storage",
        "Express.js routing and middleware architecture",
        "Server-rendered EJS views with responsive styling",
      ],      technologies: ["Node.js", "Express.js", "EJS", "JavaScript"],
      github: "https://github.com/smitcodes/smart-portal",
      demo: "",
      image: "",
    },
    {
      title: "Student Dashboard",
      category: "Development",
      description:
        "An interactive dashboard for tracking student performance and academic data, built with a modern JavaScript frontend.",
      overview:
        "A front-end focused project that organises student records, performance data and academic summaries into an interactive dashboard. Built with plain JavaScript and modern CSS, it emphasises component structure, data rendering and responsive layout.",
      highlights: [
        "Interactive cards and summaries for student performance",
        "Responsive layout built with modern CSS",
        "Component-driven plain JavaScript structure",
        "Clean separation between data and rendering",
      ],      technologies: ["JavaScript", "HTML", "CSS"],
      github: "https://github.com/smitcodes/student-dashboard",
      demo: "",
      image: "",
    },
    {
      title: "Data Analytics Internship Portfolio",
      category: "Data Analytics",
      description:
        "A 60-day ApexPlanet internship portfolio covering the full analytics pipeline — data wrangling, EDA, interactive dashboards and data storytelling.",
      overview:
        "Professional portfolio of a 60-day Data Analytics internship at ApexPlanet, organised into four milestone tasks: data immersion and wrangling (Task 1), exploratory data analysis and dashboards (Task 2), deep-dive analysis with interactive dashboards (Task 3) and data storytelling (Task 4). Together they showcase the journey from messy raw data to clear, decision-ready insight using Python, Pandas and Jupyter Notebook.",
      highlights: [
        "Task 1 — data immersion and wrangling on raw datasets",
        "Task 2 — exploratory data analysis and dashboards",
        "Task 3 — deep-dive analysis with interactive dashboards",
        "Task 4 — data storytelling with clear visual narratives",
      ],
      technologies: ["Python", "Pandas", "NumPy", "Matplotlib", "Jupyter Notebook"],
      github: "https://github.com/smitcodes/DataAnalyst-Internship-Portfolio",
      demo: "",
      image: "",
    },
  ],
  // Certifications — the section AND the navbar link appear automatically
  // as soon as this array is non-empty.
  //
  //   title         required
  //   issuer        required
  //   type          optional chip label, e.g. "Course" | "Internship"
  //   date          optional
  //   credentialId  optional (shown in monospace)
  //   certificate   optional path inside public/ → renders a "View certificate"
  //   credentialUrl optional external verification link → renders "Verify"
  //
  // NOTE: dates for the NPTEL / Udemy / Deloitte entries were derived from the
  // PDFs' own metadata — double-check them against the certificates if needed.
  certifications: [
    {
      title: "Data Analytics Internship",
      issuer: "ApexPlanet Software Pvt. Ltd.",
      type: "Internship",
      date: "Mar – May 2026",
      credentialId: "APSPL2630181",
      certificate: "certificates/apexplanet-data-analytics-internship.pdf",
    },
    {
      title: "Engineer's Day Celebration 2K24 — Certificate of Participation",
      issuer: "Walchand Institute of Technology, Solapur",
      type: "Achievement",
      date: "2024",
      certificate: "certificates/wit-engineers-day-2k24.pdf",
    },
    {
      title: "Edge Computing",
      issuer: "NPTEL",
      type: "Course",
      date: "2026",
      certificate: "certificates/nptel-edge-computing.pdf",
    },
    {
      title: "Soft Skill Development",
      issuer: "NPTEL",
      type: "Course",
      date: "2025",
      certificate: "certificates/nptel-soft-skill-development.pdf",
    },
    {
      title: "Programming in C — The Complete Course",
      issuer: "Udemy",
      type: "Course",
      date: "Dec 2023",
      certificate: "certificates/udemy-programming-in-c.pdf",
    },
    {
      title: "Deloitte Job Simulation",
      issuer: "Deloitte (Forage)",
      type: "Job Simulation",
      date: "Feb 2026",
      certificate: "certificates/deloitte-job-simulation.pdf",
    },
  ],
};