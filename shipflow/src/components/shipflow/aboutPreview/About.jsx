// AboutSection.jsx
import AboutHeader from "./AboutHeader";
import AboutGrid from "./AboutGrid";
import BackgroundGrid from "./BackgroundGrid";
import FloatingParticles from "./FloatingParticles";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#02070D] py-20 sm:py-28 md:py-36 lg:py-40"
    >
      <BackgroundGrid />
      <FloatingParticles />

      <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <AboutHeader />
        <AboutGrid />
      </div>
    </section>
  );
}