const projects = [
  {
    title: "Project One",
    description:
      "A full-stack web application built with modern technologies. Features include authentication, real-time updates, and a responsive design.",
    tags: ["React", "Node.js", "TypeScript", "PostgreSQL"],
    link: "#",
  },
  {
    title: "Project Two",
    description:
      "A mobile-first e-commerce platform with a clean UI, fast checkout experience, and integrated payment processing.",
    tags: ["Next.js", "Tailwind CSS", "Stripe", "Prisma"],
    link: "#",
  },
  {
    title: "Project Three",
    description:
      "An open-source developer tool that simplifies workflow automation and improves team productivity.",
    tags: ["TypeScript", "CLI", "GitHub Actions"],
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
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-2">
            My Work
          </h2>
          <div className="w-16 h-1 bg-accent rounded mt-4" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <a
              key={index}
              href={project.link}
              className="group block p-6 rounded-2xl bg-surface border border-border-color hover:border-accent/50 transition-all duration-400 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/5"
            >
              {/* Folder icon */}
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
              <h3 className="text-lg font-semibold mb-3 group-hover:text-accent transition-colors duration-300">
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
