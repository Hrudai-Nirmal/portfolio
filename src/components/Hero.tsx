export default function Hero() {
  return (
    <section id="home" className="snap-section relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-accent rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-bg-secondary rounded-full blur-[100px]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <p className="text-accent font-mono text-sm tracking-widest uppercase mb-8 animate-fade-in-up">
          Hrudai Nirmal
        </p>
        <blockquote className="text-3xl md:text-5xl lg:text-6xl font-light leading-tight tracking-tight mb-8 animate-fade-in-up animation-delay-200">
          The only way to do great work is to love what you do.
        </blockquote>
        <p className="text-text-secondary text-lg md:text-xl animate-fade-in-up animation-delay-400">
        </p>
        <div className="mt-16 animate-fade-in-up animation-delay-600">
          <a
            href="#about"
            className="inline-flex items-center gap-2 text-sm text-accent hover:text-text-primary transition-colors duration-300"
          >
            See what I love doing
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-bounce"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
