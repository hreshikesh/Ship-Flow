// PublicationSection.jsx
import SectionHeader from "./SectionHeader";
import Bookshelf from "./Bookshelf";
import BrowseButton from "./BrowseButton";

export default function PublicationSection() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-28 sm:py-36">
      {/* Ambient background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-cyan-500/[0.03] blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-violet-500/[0.03] blur-3xl" />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <SectionHeader />
        <Bookshelf />
        <BrowseButton />
      </div>
    </section>
  );
}