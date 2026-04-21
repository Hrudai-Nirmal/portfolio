// filepath: d:\Portfolio\src\components\Projects.tsx

const projects = [
  {
    title: "Portfolio Website + Ask Shadow AI",
    description:
      "A responsive Next.js portfolio with an embedded AI assistant in a right-side drawer. Uses a non-blocking 5:2 split layout so visitors can browse sections while asking context-aware questions.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "AI Chatbot"],
    link: "#",
  },
  {
    title: "Surface Defect Detection Ensemble",
    description:
      "A computer vision pipeline using Faster R-CNN with a generalist + specialist routing strategy for defect localization. Improved detection quality over a single-model baseline with reproducible artifact-driven evaluation.",
    tags: ["Python", "PyTorch", "TorchVision", "Faster R-CNN", "MLOps"],
    link: "#",
  },
  {
    title: "MUSES (GuitarBud)",
    description:
      "A role-based guitar learning and live performance platform for students and teachers. Includes lesson authoring, premium content workflows, guided practice tools, and synchronized live session control.",
    tags: ["React", "Vite", "Express.js", "MongoDB", "WebSockets"],
    link: "#",
  },
  {
    title: "Qrypt Secure Messaging",
    description:
      "A full-stack realtime messaging app with BB84-inspired quantum key simulation. Combines friend graph, persistent chats, live presence, and socket-driven updates with a security-focused architecture.",
    tags: ["React", "Flask", "Socket.IO", "MongoDB", "Qiskit"],
    link: "#",
  },
];

export default function Projects() {
  return (
    <section id="work" className="snap-section px-6">
      <div className="max-w-5xl mx-auto w-full">
        <div className="mb-12">
          <span className="text-accent font-mono text-sm tracking-widest uppercase">
            02 / Work
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-2 text-heading">
            My Work
          </h2>
          <div className="w-16 h-1 bg-accent rounded mt-4" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <a
              key={project.title}
              href={project.link}
              className="group block p-6 rounded-2xl bg-surface border border-border-color hover:border-accent/50 transition-all duration-400 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/5"
            >
              <div className="text-accent mb-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                </svg>
              </div>

              <h3 className="text-lg font-semibold mb-3 text-heading group-hover:text-heading transition-colors duration-300">
                {project.title}
              </h3>

              <p className="text-text-secondary text-sm leading-relaxed mb-5">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono text-accent bg-accent/10 px-2.5 py-1 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
