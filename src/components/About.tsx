export default function About() {
  return (
    <section id="about" className="snap-section px-6">
      <div className="max-w-5xl mx-auto w-full">
        <div className="mb-12">
          <span className="text-accent font-mono text-sm tracking-widest uppercase">
            01 / About
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-2">
            About Me
          </h2>
          <div className="w-16 h-1 bg-accent rounded mt-4" />
        </div>

        <div className="grid md:grid-cols-5 gap-12 items-center">
          {/* Text content */}
          <div className="md:col-span-3 space-y-5 text-text-secondary leading-relaxed text-lg">
            <p>
              Hi, I&apos;m <span className="text-text-primary font-semibold">Hrudai Nirmal</span> — a developer who loves building things for the web. My interest in development started when I first tried customizing a website template — turns out tweaking HTML &amp; CSS taught me a lot about how things work under the hood.
            </p>
            <p>
              Fast-forward to today, and I&apos;ve had the privilege of working on a variety of projects spanning web applications, design systems, and more. My main focus these days is building accessible, inclusive products and digital experiences.
            </p>
            <p>
              When I&apos;m not coding, you&apos;ll find me exploring new technologies, contributing to open source, or learning something new.
            </p>
          </div>

          {/* Profile image placeholder */}
          <div className="md:col-span-2 flex justify-center">
            <div className="w-56 h-56 md:w-64 md:h-64 rounded-2xl bg-surface border-2 border-border-color flex items-center justify-center relative group overflow-hidden">
              <div className="absolute inset-0 bg-accent/10 group-hover:bg-accent/20 transition-colors duration-500" />
              <span className="text-text-secondary text-sm font-mono z-10">
                Your Photo
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
