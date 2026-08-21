import { ArrowLeft, Github, ExternalLink, CheckCircle } from "lucide-react";

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
  github: string;
  demo: string;
}

interface Props {
  project: Project;
  onBack: () => void;
}

export default function ProjectDetails({ project, onBack }: Props) {
  return (
    <section className="min-h-screen bg-[#020617] text-white py-20">
      <div className="max-w-6xl mx-auto px-6">

        <button
          onClick={onBack}
          className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-10"
        >
          <ArrowLeft size={20} />
          Back to Projects
        </button>

        {/* Hero */}

        <div className="glass-card rounded-3xl p-10 mb-10">

          <h1 className="text-5xl font-bold mb-5">
            {project.title}
          </h1>

          <p className="text-slate-300 leading-8 text-lg">
            {project.overview}
          </p>

          <div className="flex gap-4 mt-8">

            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 transition flex items-center gap-2"
            >
              <Github size={18}/>
              GitHub
            </a>

            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 rounded-xl border border-cyan-500 hover:bg-cyan-500/20 transition flex items-center gap-2"
            >
              <ExternalLink size={18}/>
              Live Demo
            </a>

          </div>

        </div>

        {/* Workflow */}

        <h2 className="text-3xl font-bold mb-8">
          Project Workflow
        </h2>

        <div className="space-y-8">

          {project.workflow.map((step,index)=>(

            <div
              key={index}
              className="relative border-l-4 border-cyan-500 pl-8 pb-8"
            >

              <div className="absolute -left-4 top-0 h-8 w-8 rounded-full bg-cyan-500 flex items-center justify-center font-bold">
                {index+1}
              </div>

              <h3 className="text-xl font-semibold mb-2">
                {step.title}
              </h3>

              <p className="text-slate-400">
                {step.description}
              </p>

            </div>

          ))}

        </div>

        {/* Features */}

        <h2 className="text-3xl font-bold mt-16 mb-8">
          Features
        </h2>

        <div className="grid md:grid-cols-2 gap-5">

          {project.features.map((feature,index)=>(

            <div
              key={index}
              className="glass-card p-5 rounded-xl flex items-center gap-3"
            >
              <CheckCircle className="text-cyan-400"/>
              {feature}
            </div>

          ))}

        </div>

        {/* Tech Stack */}

        <h2 className="text-3xl font-bold mt-16 mb-8">
          Technology Stack
        </h2>

        <div className="flex flex-wrap gap-4">

          {project.technologies.map((tech,index)=>(

            <div
              key={index}
              className="px-5 py-3 rounded-xl bg-slate-900 border border-cyan-500/30"
            >
              {tech}
            </div>

          ))}

        </div>

        {/* Challenges */}

        <h2 className="text-3xl font-bold mt-16 mb-8">
          Challenges
        </h2>

        <ul className="space-y-4">

          {project.challenges.map((item,index)=>(

            <li key={index} className="text-slate-300">
              • {item}
            </li>

          ))}

        </ul>

        {/* Future */}

        <h2 className="text-3xl font-bold mt-16 mb-8">
          Future Improvements
        </h2>

        <ul className="space-y-4 mb-20">

          {project.future.map((item,index)=>(

            <li key={index} className="text-slate-300">
              • {item}
            </li>

          ))}

        </ul>

      </div>
    </section>
  );
}