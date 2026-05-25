export default function About() {
  return (
    <section id="about" className="snap-section px-6 bg-transparent">
      <div className="max-w-5xl mx-auto w-full">
        <div className="mb-12">
          <span className="text-accent font-mono text-sm tracking-widest uppercase">
            01 / About
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-2 text-heading">
            About Me
          </h2>
          <div className="w-16 h-1 bg-accent rounded mt-4" />
        </div>

        <div className="grid md:grid-cols-5 gap-12 items-center">
          {/* Text content */}
          <div className="md:col-span-3 space-y-5 text-text-secondary leading-relaxed text-lg">
            <p>
              Hi, I&apos;m{" "}
              <span className="text-text-primary font-semibold">
                Hrudai Nirmal
              </span>{" "}
              — a developer who loves building intelligent, full-stack systems.
              My interest in engineering started when I first connected a
              frontend UI to a live database, realizing how satisfying it is to
              make data move seamlessly across the entire stack.
            </p>
            <p>
              Fast-forward to today, and I operate at the intersection of
              robust web applications and production-ready AI pipelines. My
              main focus these days is designing resilient backend
              architectures, deploying RAG systems, and engineering the
              real-time data plumbing that makes machine learning models
              practical and scalable for real users.
            </p>
            <p>
              When I&apos;m not coding, you&apos;ll find me benchmarking local
              LLM orchestration, or finding new ways to turn messy, real-world
              data into automated workflows.
            </p>
          </div>

          {/* Profile image placeholder */}
          <div className="md:col-span-2 flex justify-center">
            <div className="glass w-56 h-56 md:w-64 md:h-64 rounded-2xl bg-surface border-2 border-border-color flex items-center justify-center relative group overflow-hidden">
              <img
                src="/asdSDFs.jpeg"
                alt="Hrudai Nirmal"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-accent/10 group-hover:bg-accent/5 transition-colors duration-500" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
