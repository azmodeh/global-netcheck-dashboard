export function AnimatedFooter() {
  return (
    <footer className="relative z-10 mt-20 py-8 border-t border-white/10">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center items-center gap-6 mb-4">
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors"
          >
            About
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors"
          >
            Docs
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors"
          >
            Status
          </a>
        </div>
        <p className="text-gray-500 text-sm">
          © 2025 Global NetCheck. Powered by Checker Vista.
        </p>
      </div>
    </footer>
  );
}
