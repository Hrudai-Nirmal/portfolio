export default function Footer() {
  return (
    <footer className="snap-section !min-h-0 py-8 px-6 border-t border-border-color">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-xs text-text-secondary font-mono">
          Designed &amp; Built by{" "}
          <span className="text-accent">Hrudai Nirmal</span>{" "}
          &copy; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
