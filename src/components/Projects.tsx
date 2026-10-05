import { useState } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import ProjectDetails from "./ProjectDetails";

interface WorkflowStep {
  title: string;
  description: string;
}

interface Project {
  title: string;
  description: string;
  overview: string;
  workflow: WorkflowStep[];
  features: string[];
  technologies: string[];
  challenges: string[];
  future: string[];
  tags: string[];
  gradient: string;
  featured: boolean;
  github: string;
  demo: string;
}

const projects: Project[] = [
  {
    title: "Event Management System",

    description:
      "A MEAN Stack event management platform to create, manage and register events with user authentication.",

    overview:
      "The Event Management System is a full-stack web application that simplifies event planning. Users can register, browse upcoming events, book tickets, and organizers can manage participants through a secure dashboard. The application demonstrates authentication, CRUD operations, database integration, and responsive UI.",

    workflow: [
      {
        title: "User Registration",
        description: "Users create an account and securely log in."
      },
      {
        title: "Browse Events",
        description: "Users explore all available events."
      },
      {
        title: "Book Event",
        description: "Users register for their preferred event."
      },
      {
        title: "Admin Dashboard",
        description: "Admin manages events and participants."
      },
      {
        title: "Confirmation",
        description: "Booking confirmation is generated."
      }
    ],

    features: [
      "User Authentication",
      "Admin Dashboard",
      "Event Booking",
      "Participant Management",
      "Responsive UI",
      "Email Notifications"
    ],

    technologies: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Tailwind CSS"
    ],

    challenges: [
      "Authentication Security",
      "Database Relationships",
      "Responsive Design"
    ],

    future: [
      "Online Payment",
      "QR Ticket",
      "Live Notifications"
    ],

    tags: [
      "React",
      "Node.js",
      "MongoDB",
      "Express",
      "Tailwind"
    ],

    gradient: "from-primary-500/20 to-cyan-400/10",

    featured: true,

    github: "https://github.com/naganjineyulu",

    demo: "#"
  },

  {
    title: "AI Resume Screening Platform",

    description:
      "AI powered resume screening using Natural Language Processing.",

    overview:
      "The Resume Screening Platform automatically evaluates resumes using AI. It extracts skills, compares them against job descriptions, ranks applicants, and provides recruiters with intelligent hiring recommendations.",

    workflow: [
      {
        title: "Upload Resume",
        description: "Candidate uploads resume."
      },
      {
        title: "Extract Text",
        description: "System extracts resume contents."
      },
      {
        title: "AI Analysis",
        description: "NLP model analyzes skills."
      },
      {
        title: "Score Candidate",
        description: "Matching score is calculated."
      },
      {
        title: "Recruiter Dashboard",
        description: "Recruiters compare candidates."
      }
    ],

    features: [
      "Resume Upload",
      "Skill Extraction",
      "AI Matching",
      "Candidate Ranking",
      "Dashboard"
    ],

    technologies: [
      "Python",
      "React",
      "MongoDB",
      "NLP",
      "Machine Learning"
    ],

    challenges: [
      "Resume Parsing",
      "Data Cleaning",
      "Model Accuracy"
    ],

    future: [
      "Interview Prediction",
      "Chatbot",
      "ATS Integration"
    ],

    tags: [
      "Python",
      "NLP",
      "React",
      "MongoDB"
    ],

    gradient: "from-cyan-400/20 to-primary-500/10",

    featured: true,

    github: "https://github.com/naganjineyulu",

    demo: "#"
  },

  {
    title: "AI Diet Recommendation",

    description:
      "Machine Learning based personalized diet recommendation platform.",

    overview:
      "The AI Diet Recommendation System calculates BMI, calorie requirements, and generates personalized meal plans using Machine Learning algorithms. It recommends healthy foods according to user goals such as weight loss, muscle gain, or maintenance.",

    workflow: [
      {
        title: "Enter User Details",
        description: "Height, weight, age and gender are entered."
      },
      {
        title: "BMI Calculation",
        description: "Body Mass Index is calculated."
      },
      {
        title: "Calorie Estimation",
        description: "Daily calories are estimated."
      },
      {
        title: "AI Recommendation",
        description: "Machine Learning predicts food recommendations."
      },
      {
        title: "Diet Plan",
        description: "Personalized meal plan is generated."
      }
    ],

    features: [
      "BMI Calculator",
      "Meal Recommendation",
      "Nutrition Analysis",
      "Machine Learning",
      "PDF Report"
    ],

    technologies: [
      "React",
      "Python",
      "FastAPI",
      "Machine Learning",
      "Pandas"
    ],

    challenges: [
      "Dataset Cleaning",
      "Recommendation Accuracy",
      "Frontend Backend Integration"
    ],

    future: [
      "Voice Assistant",
      "Food Recognition",
      "Health Tracking"
    ],

    tags: [
      "AI",
      "Python",
      "React",
      "Health"
    ],

    gradient: "from-primary-600/20 to-cyan-500/10",

    featured: false,

    github: "https://github.com/naganjineyulu",

    demo: "#"
  },

  {
    title: "ExamGuard-AI-Advanced",

    description:
      "An AI-focused exam security project for monitoring assessment workflows and supporting exam integrity.",

    overview:
      "ExamGuard-AI-Advanced is an AI-focused project built around exam security and assessment monitoring. It is presented as part of my AI portfolio work, showing how intelligent systems can support safer and more reliable digital exam workflows.",

    workflow: [
      {
        title: "Exam Session Setup",
        description: "An assessment session is prepared for monitoring."
      },
      {
        title: "Candidate Verification",
        description: "The system supports identity and session checks."
      },
      {
        title: "AI Monitoring",
        description: "Exam activity is monitored for unusual behavior."
      },
      {
        title: "Alert Review",
        description: "Flagged activity can be reviewed for exam integrity."
      },
      {
        title: "Report Summary",
        description: "A session summary helps review the assessment workflow."
      }
    ],

    features: [
      "Exam Monitoring",
      "Candidate Verification",
      "AI-Based Review",
      "Alert Workflow",
      "Session Summary"
    ],

    technologies: [
      "AI",
      "Machine Learning",
      "Python",
      "React"
    ],

    challenges: [
      "Reliable Detection",
      "User Privacy",
      "Real-Time Workflow"
    ],

    future: [
      "Improved Detection Accuracy",
      "Detailed Analytics",
      "Admin Review Dashboard"
    ],

    tags: [
      "AI",
      "Python",
      "React",
      "ML"
    ],

    gradient: "from-cyan-500/20 to-primary-600/10",

    featured: true,

    github: "https://github.com/naganjineyulu",

    demo: "#"
  }
];

export default function Projects() {

  const { ref, isVisible } = useIntersectionObserver();

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  if (selectedProject) {
    return (
      <ProjectDetails
        project={selectedProject}
        onBack={() => setSelectedProject(null)}
      />
    );
  }
  return (
  <section
    id="projects"
    ref={ref as React.RefObject<HTMLElement>}
    className="relative py-24 md:py-32"
  >
    <div className="orb bg-primary-500/15 w-[500px] h-[500px] top-1/3 right-0" />

    <div className="max-w-7xl mx-auto px-6">

      {/* Heading */}

      <div className={`reveal ${isVisible ? "visible" : ""} mb-14`}>

        <p className="font-mono text-primary-400 text-sm mb-3">
          // 03. my work
        </p>

        <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-4">
          Featured Projects
        </h2>

        <p className="text-slate-400 max-w-2xl">
          Click on <span className="text-primary-400 font-semibold">Details</span> to explore
          the complete workflow, technologies, architecture and implementation of each project.
        </p>

      </div>

      {/* Cards */}

      <div className="grid md:grid-cols-2 gap-8">

        {projects.map((project, index) => (

          <article
            key={project.title}
            className={`group relative glass-card rounded-2xl overflow-hidden reveal ${
              isVisible ? "visible" : ""
            }`}
            style={{
              transitionDelay: `${index * 100}ms`,
            }}
          >

            <div
              className={`absolute inset-0 bg-gradient-to-br ${project.gradient}
              opacity-0 group-hover:opacity-100 transition duration-500`}
            />

            <div className="relative p-8">

              {/* Top */}

              <div className="flex justify-between items-center mb-6">

                <span className="flex h-14 w-14 rounded-xl
                bg-primary-500/20
                border border-primary-500/30
                items-center justify-center">

                  <span className="font-bold text-primary-300">
                    0{index + 1}
                  </span>

                </span>

                {project.featured && (

                  <span className="px-4 py-1 rounded-full
                  border border-primary-500/40
                  bg-primary-500/10
                  text-xs">

                    Featured

                  </span>

                )}

              </div>

              {/* Title */}

              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary-300 transition">

                {project.title}

              </h3>

              {/* Description */}

              <p className="text-slate-400 mb-5 leading-7">

                {project.description}

              </p>

              {/* Technologies */}

              <div className="flex flex-wrap gap-2 mb-6">

                {project.tags.map((tag) => (

                  <span
                    key={tag}
                    className="px-3 py-1 rounded-md
                    border border-primary-500/20
                    bg-slate-800
                    text-xs"
                  >

                    {tag}

                  </span>

                ))}

              </div>

              {/* Buttons */}

              <div className="flex items-center">

                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2
                  text-slate-300
                  hover:text-primary-400"
                >

                  <Github size={18} />

                  GitHub

                </a>

                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2
                  ml-6
                  text-slate-300
                  hover:text-primary-400"
                >

                  <ExternalLink size={18} />

                  Demo

                </a>

                <button
                  onClick={() => setSelectedProject(project)}
                  className="ml-auto flex items-center gap-2
                  text-primary-400
                  hover:text-primary-300
                  font-semibold"
                >

                  Details

                  <ArrowUpRight size={18} />

                </button>

              </div>

            </div>

          </article>

        ))}

      </div>

    </div>

  </section>
);
}
