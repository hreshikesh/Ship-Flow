import SectionHeader from "./SectionHeader";
import ServiceGrid from "./ServiceGrid";
import ViewAllButton from "./ViewAllButton";

export default function ServiceSection() {
  return (
    <section className="relative overflow-hidden bg-[#02070D] 
    py-16 
    sm:py-20 
    md:py-24 
    lg:py-32">

      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,.08),transparent_40%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(56,189,248,.06),transparent_35%)]" />

      {/* Blueprint Grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(111,195,223,.16) 1px, transparent 1px),
            linear-gradient(90deg, rgba(111,195,223,.16) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl 
      px-4 
      sm:px-6 
      lg:px-8">
        <SectionHeader />
        <ServiceGrid />
        <ViewAllButton />
      </div>
    </section>
  );
}