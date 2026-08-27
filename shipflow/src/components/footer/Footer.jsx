import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
  Waves,
} from "lucide-react";
import logo from "../../assets/images/logo/logo1.webp";

const NAVIGATION = [
  { label: "Home", to: "/" },
  { label: "SHIPFLOW", to: "/solutions/cae-software" }, 
  { label: "CAESES", to: "/solutions/cae-software" },
  { label: "Tutorials", to: "/tutorials" },
  { label: "Contact Us", to: "https://sandebtech.com/contact" },
  { label: "Book a Meeting", href: "https://sandebtech.com/meeting" },
];

const MARQUEE_ITEMS = [
  "Potential Flow · XPAN",
  "RANS Solver · XCHAP",
  "Boundary Layer · XBOUND",
  "Seakeeping · XMOTION",
  "Parametric CAD · CAESES",
  "Adjoint Optimization",
  "Hull Form Design",
  "Free Surface Capturing",
  "Overset Grids",
  "Automated Design Loops",
  "Resistance & Propulsion",
  "ISO 19030 Compliant",
];

export default function Footer() {
  const year = new Date().getFullYear();

  const handleInternalNavigation = () => {
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return (
    <footer
      // relative + z-50 + isolate pulls the footer safely above your 3D ship canvas
      // bg-[#020b16] acts as a solid mask to hide the 3D scene directly behind it
      className="relative z-50 isolate overflow-hidden border-t border-cyan-500/10 bg-[#020b16] text-white"
      style={{ 
        contentVisibility: "auto", 
        containIntrinsicSize: "700px",
        pointerEvents: "auto" // Guarantees all interactive elements inside respond to mouse inputs
      }}
    >
      {/* Background glows */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 0%, rgba(6,182,212,0.08) 0%, transparent 70%),
            radial-gradient(ellipse 40% 30% at 100% 100%, rgba(59,130,246,0.05) 0%, transparent 60%)
          `,
        }}
      />

      {/* CFD grid */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(6,182,212,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Fluid Wave SVG Accent */}
      <div className="absolute inset-x-0 top-0 pointer-events-none -z-10">
        <svg
          className="h-8 w-full"
          viewBox="0 0 1440 40"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M 0 20 Q 180 5 360 20 T 720 20 T 1080 20 T 1440 20"
            stroke="rgba(6,182,212,0.3)"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M 0 25 Q 180 10 360 25 T 720 25 T 1080 25 T 1440 25"
            stroke="rgba(6,182,212,0.15)"
            strokeWidth="1"
            fill="none"
          />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        {/* Main Grid */}
        <div className="grid gap-10 py-12 sm:py-16 md:grid-cols-2 lg:grid-cols-[1.2fr_0.6fr_1.1fr_1.1fr] lg:gap-8 lg:py-20">
          
          {/* Brand */}
          <div className="flex flex-col items-start">
            <Link to="/" onClick={handleInternalNavigation} className="inline-flex items-center">
              <img
                src={logo}
                alt="SandebTech"
                className="h-12 w-auto object-contain"
              />
            </Link>

            <p className="mt-4 max-w-xs text-xs leading-relaxed text-slate-400 sm:text-sm">
              SandebTech delivers reliable engineering, industrial automation,
              and CFD solutions backed by quality, innovation, and technical
              precision.
            </p>

            <Link
              to="/contact"
              onClick={handleInternalNavigation}
              className="mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-cyan-300 transition-colors hover:text-cyan-200"
            >
              Get in Touch
              <ArrowUpRight size={12} />
            </Link>
          </div>

          {/* Navigation Links */}
          <div>
            <FooterHeading>Navigation</FooterHeading>

            <nav className="flex flex-col items-start gap-3">
              {NAVIGATION.map((item) => {
                const isExternal = Boolean(item.href);
                const className =
                  "group flex items-center gap-1.5 text-xs text-slate-400 transition-colors duration-200 hover:text-cyan-300 sm:text-sm";

                if (isExternal) {
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={className}
                    >
                      <span>{item.label}</span>
                      <ArrowUpRight
                        size={11}
                        className="text-slate-500 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-300"
                      />
                    </a>
                  );
                }

                return (
                  <Link
                    key={item.label}
                    to={item.to}
                    onClick={handleInternalNavigation}
                    className={className}
                  >
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Contact Details */}
          <div>
            <FooterHeading>Contact Us</FooterHeading>

            <div className="space-y-4">
              <ContactItem
                icon={<Phone size={14} />}
                label="Phone"
                value="+91 9108994209"
                href="tel:+919108994209"
              />

              <ContactItem
                icon={<Mail size={14} />}
                label="Email"
                value="contact@sandebtech.com"
                href="mailto:contact@sandebtech.com"
              />

              <ContactItem
                icon={<MapPin size={14} />}
                label="Office Address"
                value={
                  <>
                    <strong className="font-semibold text-slate-200">
                      SANDEB TECH PVT LTD
                    </strong>
                    <br />
                    166, 5th Cross, KEB Layout, Sanjaynagar
                    <br />
                    Bangalore (Bengaluru) - 560094, India
                  </>
                }
              />
            </div>
          </div>

          {/* Map Section */}
          <div>
            <FooterHeading>Find Us</FooterHeading>

            <div className="group relative h-48 w-full overflow-hidden rounded-2xl border border-white/[0.08] bg-[#06111a]">
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(103,232,249,.12) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(103,232,249,.12) 1px, transparent 1px)
                  `,
                  backgroundSize: "24px 24px",
                }}
              />

              <div className="absolute left-[-10%] top-[45%] h-px w-[120%] rotate-[18deg] bg-cyan-300/15" />
              <div className="absolute left-[20%] top-[-20%] h-[140%] w-px rotate-[32deg] bg-cyan-300/10" />
              <div className="absolute left-[55%] top-[-10%] h-[130%] w-px -rotate-[18deg] bg-cyan-300/10" />
              <div className="absolute left-[-10%] top-[65%] h-px w-[120%] -rotate-[8deg] bg-cyan-300/10" />

              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <span className="absolute -inset-3 animate-ping rounded-full bg-cyan-400/20" />
                <div className="relative flex h-9 w-9 items-center justify-center rounded-full border border-cyan-300/40 bg-[#031019]/90 text-cyan-300 shadow-[0_0_25px_rgba(6,182,212,0.3)]">
                  <MapPin size={16} />
                </div>
              </div>

              <div className="absolute bottom-2.5 left-2.5 rounded-lg border border-white/10 bg-[#02070d]/85 px-2.5 py-1.5 backdrop-blur-md">
                <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-cyan-300">
                  SANDEB TECH PVT LTD
                </p>
                <p className="mt-0.5 text-[9px] text-slate-400">
                  Sanjaynagar, Bengaluru
                </p>
              </div>

              <a
                href="https://www.google.com/maps/place/Sandebtech+Private+Limited/@13.0229476,77.5753198,29309m/data=!3m1!1e3!4m10!1m2!2m1!1sSANDEB+TECH+PVT+LTD+Sanjaynagar+Bangalore!3m6!1s0x3bae119428b4e86d:0x56df6a3dc085b1d8!8m2!3d12.9921571!4d77.7169415!15sCilTQU5ERUIgVEVDSCBQVlQgTFREIFNhbmpheW5hZ2FyIEJhbmdhbG9yZZIBEHNvZnR3YXJlX2NvbXBhbnngAQA!16s%2Fg%2F11fqzdrq59?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-black/50 text-slate-300 backdrop-blur-md transition-colors hover:border-cyan-300/40 hover:text-cyan-300"
                aria-label="Open location in Google Maps"
              >
                <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
        </div>

        {/* Marquee Ticker */}
        <div className="relative overflow-hidden border-y border-white/5 py-4">
          <style>{`
            @keyframes footerMarquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .footer-marquee {
              animation: footerMarquee 45s linear infinite;
              width: max-content;
            }
            .footer-marquee:hover {
              animation-play-state: paused;
            }
          `}</style>

          <div className="footer-marquee flex items-center gap-8 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.3em] text-slate-600">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex shrink-0 items-center gap-8">
                {MARQUEE_ITEMS.map((item) => (
                  <span key={`${copy}-${item}`}>◆ {item}</span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-3 py-5 text-[9px] font-medium uppercase tracking-[0.18em] text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Waves size={12} className="text-cyan-400/60" />
            <span>© {year} SANDEB TECH PVT LTD</span>
          </div>

          <div className="flex items-center gap-2">
            <span>SHIPFLOW</span>
            <span className="text-slate-700">·</span>
            <span>CAESES</span>
            <span className="text-slate-700">·</span>
            <span className="text-cyan-400/70">SandebTech Marine</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterHeading({ children }) {
  return (
    <div className="mb-4">
      <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/90">
        {children}
      </p>
      <div className="mt-2 h-px w-5 bg-cyan-300/50" />
    </div>
  );
}

function ContactItem({ icon, label, value, href }) {
  const content = (
    <div className="flex items-start gap-2.5">
      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-cyan-300/15 bg-cyan-300/[0.05] text-cyan-300">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-slate-500">
          {label}
        </p>
        <div className="mt-0.5 text-xs leading-relaxed text-slate-300 transition-colors group-hover:text-cyan-300">
          {value}
        </div>
      </div>
    </div>
  );

  return href ? (
    <a href={href} className="group block transition-opacity hover:opacity-90">
      {content}
    </a>
  ) : (
    <div className="group">{content}</div>
  );
}