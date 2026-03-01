const reasons = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    title: "Endlessly Curious",
    description:
      "I approach every challenge with genuine curiosity — always asking why, digging deeper, and seeking out better solutions rather than settling for the obvious.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    title: "Driven by Originality",
    description:
      "I thrive on building things that stand out. I enjoy pushing creative boundaries and crafting unique experiences that go beyond the conventional.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Collaborative by Nature",
    description:
      "I value working with like-minded people. Some of the best ideas emerge from collaboration, and I actively seek out opportunities to connect and co-create.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: "Adaptable & Open-Minded",
    description:
      "I embrace new technologies, methodologies, and perspectives with enthusiasm. Stepping outside my comfort zone is where I do my best learning and growing.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    title: "Committed to Excellence",
    description:
      "When I take on a project, I see it through with dedication and discipline. I hold myself to high standards and take full ownership of my work.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: "Impact-Oriented",
    description:
      "I don't just write code — I build solutions that make a real difference. Every project is an opportunity to create meaningful, lasting impact.",
  },
];

export default function WhyWorkWithMe() {
  return (
    <section className="snap-section px-6">
      <div className="max-w-5xl mx-auto w-full">
        <div className="mb-12">
          <span className="text-accent font-mono text-sm tracking-widest uppercase">
            03 / Why Me
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-2">
            Why Work With Me
          </h2>
          <div className="w-16 h-1 bg-accent rounded mt-4" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-surface border border-border-color hover:border-accent/40 transition-all duration-400 group"
            >
              <div className="text-accent mb-4 group-hover:scale-110 transition-transform duration-300">
                {reason.icon}
              </div>
              <h3 className="text-base font-semibold mb-2">
                {reason.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
