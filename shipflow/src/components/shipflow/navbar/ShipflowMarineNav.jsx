// ShipflowMarineNav.jsx
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useArrivalState } from "../arrival/arrivalStore";
import logo from "../../../assets/images/logo/image.png";

const ease = [0.22, 1, 0.36, 1];

const nav = [
  { label: "Home", href: "/" },
  {
    label: "Products",
    href: "https://shipflow.se/products-overview/",
    children: [
      { label: "Overview", href: "https://shipflow.se/products-overview/", desc: "Complete SHIPFLOW suite" },
      { label: "BASIC", href: "https://shipflow.se/?page_id=135", desc: "Potential flow solver" },
      { label: "RANS", href: "https://shipflow.se/shipflow-rans/", desc: "Viscous flow analysis" },
      { label: "MOTIONS", href: "https://shipflow.se/?page_id=136", desc: "Seakeeping simulations" },
      { label: "GUI", href: "https://shipflow.se/shipflow-caeses/", desc: "CAESES integration" },
      { label: "Case Studies", href: "https://shipflow.se/applications-case-studies/", desc: "Real-world applications" },
    ],
  },
  { label: "Services", href: "https://shipflow.se/services/" },
  {
    label: "Resources",
    href: "https://shipflow.se/resources/",
    children: [
      { label: "Downloads", href: "https://shipflow.se/downloads/", desc: "Software & assets" },
      { label: "Documentation", href: "https://shipflow.se/documentation/", desc: "Complete manuals" },
      { label: "Video", href: "https://shipflow.se/video/", desc: "Tutorial library" },
      { label: "Training", href: "https://shipflow.se/shipflow-training/", desc: "Courses & workshops" },
      { label: "Publications", href: "https://shipflow.se/publications/", desc: "Scientific papers" },
      { label: "FAQ", href: "https://shipflow.se/faq/", desc: "Common questions" },
    ],
  },
  { label: "Support", href: "https://shipflow.se/support-center/" },
  { label: "Company", href: "https://shipflow.se/company/" },
];

/* ============ LOGO ============ */
function LogoMark({ compact = false }) {
  return (
    <div className="flex items-center gap-2.5">
    

      {/* Logo in white chip */}
      <div className="relative overflow-hidden rounded-lg bg-white px-2.5 py-1.5 shadow-md shadow-cyan-500/20">
        <img
          src={logo}
          alt="SHIPFLOW"
          className={`w-auto object-contain ${compact ? "h-4" : "h-5"}`}
        />
      </div>

     </div>
  );
}

/* ============ DESKTOP NAV ITEM WITH RICH DROPDOWN ============ */
function DesktopNavItem({ item, isActive }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="group relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <a
        href={item.href}
        className={`
          relative flex items-center gap-1 rounded-full px-3.5 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.2em] transition-all duration-300
          ${isActive
            ? "text-[#7fd8e5]"
            : "text-[#C9D6DF]/70 hover:text-[#7fd8e5]"
          }
        `}
      >
        {item.label}

        {item.children && (
          <svg
            width="8"
            height="8"
            viewBox="0 0 12 12"
            className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          >
            <path
              d="M 2 4 L 6 8 L 10 4"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        )}

        {/* Active indicator */}
        {isActive && (
          <motion.div
            layoutId="activeNavPill"
            className="absolute inset-0 -z-10 rounded-full bg-[#7fd8e5]/10 border border-[#7fd8e5]/20"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
      </a>

      {/* Rich Dropdown */}
      {item.children && (
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Invisible bridge to prevent flicker */}
              <div className="absolute left-0 right-0 top-full h-4" />

              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                transition={{ duration: 0.25, ease }}
                className="absolute left-1/2 top-full mt-4 w-80 -translate-x-1/2 overflow-hidden rounded-2xl border border-[#7fd8e5]/25 bg-[#04070d]/98 shadow-[0_30px_90px_rgba(2,7,13,0.85)] backdrop-blur-2xl"
              >
                {/* Header with gradient accent */}
                <div className="relative border-b border-white/5 bg-gradient-to-r from-[#7fd8e5]/10 to-transparent px-5 py-3">
                  <div className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-[#7fd8e5]" />
                    <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#7fd8e5]">
                      {item.label}
                    </span>
                  </div>
                </div>

                {/* Menu items with descriptions */}
                <div className="p-2">
                  {item.children.map((child, i) => (
                    <motion.a
                      key={child.label}
                      href={child.href}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03, duration: 0.3 }}
                      className="group/item flex items-center gap-3 rounded-xl p-3 transition-all duration-200 hover:bg-[#7fd8e5]/10"
                    >
                      {/* Icon indicator */}
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#7fd8e5]/20 bg-[#7fd8e5]/5 transition group-hover/item:border-[#7fd8e5]/40 group-hover/item:bg-[#7fd8e5]/15">
                        <span className="h-1 w-1 rounded-full bg-[#7fd8e5]" />
                      </div>

                      {/* Text */}
                      <div className="min-w-0 flex-1">
                        <div className="font-mono text-xs font-medium text-white transition group-hover/item:text-[#7fd8e5]">
                          {child.label}
                        </div>
                        {child.desc && (
                          <div className="mt-0.5 truncate text-[10px] text-[#C9D6DF]/50">
                            {child.desc}
                          </div>
                        )}
                      </div>

                      {/* Arrow */}
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 12 12"
                        className="text-[#7fd8e5] opacity-0 transition-all duration-200 group-hover/item:translate-x-0.5 group-hover/item:opacity-100"
                      >
                        <path
                          d="M 3 6 L 8 6 M 8 6 L 5 3 M 8 6 L 5 9"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          fill="none"
                          strokeLinecap="round"
                        />
                      </svg>
                    </motion.a>
                  ))}
                </div>

                {/* Bottom accent */}
                <div className="border-t border-white/5 bg-[#7fd8e5]/[0.02] px-5 py-2.5">
                  <a
                    href={item.href}
                    className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.25em] text-[#7fd8e5]/70 transition hover:text-[#7fd8e5]"
                  >
                    <span>View all {item.label}</span>
                    <span>→</span>
                  </a>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}

/* ============ MOBILE DRAWER ============ */
function MobileDrawer({ open, onClose }) {
  const [expandedItems, setExpandedItems] = useState({});

  const toggleExpanded = (label) => {
    setExpandedItems((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="fixed inset-0 z-[90] bg-[#02070d]/80 backdrop-blur-md md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Drawer */}
          <motion.aside
            className="fixed bottom-0 left-0 right-0 z-[100] max-h-[92dvh] overflow-y-auto rounded-t-[2rem] border-t border-[#7fd8e5]/30 bg-[#04070d]/98 text-white shadow-[0_-30px_90px_rgba(2,7,13,0.9)] backdrop-blur-2xl md:hidden"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.55, ease }}
          >
            {/* Drag handle */}
            <div className="sticky top-0 z-10 flex justify-center bg-gradient-to-b from-[#04070d] to-[#04070d]/95 pt-3 pb-2">
              <div className="h-1 w-12 rounded-full bg-[#7fd8e5]/30" />
            </div>

            <div className="px-6 pb-8">
              {/* Header */}
              <div className="mb-6 flex items-center justify-between">
                <a href="/" onClick={onClose}>
                  <LogoMark compact />
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close menu"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#7fd8e5]/30 bg-[#7fd8e5]/10 text-[#7fd8e5] transition hover:bg-[#7fd8e5]/20"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M 2 2 L 12 12 M 12 2 L 2 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              {/* Search hint */}
              <div className="mb-6 flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] p-3 font-mono text-[10px] uppercase tracking-widest text-[#C9D6DF]/50">
                <span className="h-1.5 w-1.5 rounded-full bg-[#7fd8e5] animate-pulse" />
                Navigation
              </div>

              {/* Nav items */}
              <nav className="space-y-1">
                {nav.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.4, ease }}
                    className="overflow-hidden rounded-2xl border border-white/5"
                  >
                    <div className="flex items-center">
                      <a
                        href={item.href}
                        onClick={onClose}
                        className="flex-1 px-4 py-3.5 font-mono text-sm font-medium tracking-wide text-white transition hover:text-[#7fd8e5]"
                      >
                        {item.label}
                      </a>

                      {item.children && (
                        <button
                          type="button"
                          onClick={() => toggleExpanded(item.label)}
                          aria-label={`Toggle ${item.label} submenu`}
                          className="flex h-full w-12 items-center justify-center border-l border-white/5 text-[#7fd8e5] transition hover:bg-[#7fd8e5]/10"
                        >
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            className={`transition-transform duration-300 ${expandedItems[item.label] ? "rotate-180" : ""}`}
                          >
                            <path
                              d="M 2 4 L 6 8 L 10 4"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              fill="none"
                              strokeLinecap="round"
                            />
                          </svg>
                        </button>
                      )}
                    </div>

                    {/* Expanded submenu */}
                    <AnimatePresence>
                      {item.children && expandedItems[item.label] && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-white/5 bg-[#7fd8e5]/[0.02] p-2">
                            {item.children.map((child) => (
                              <a
                                key={child.label}
                                href={child.href}
                                onClick={onClose}
                                className="flex items-center gap-3 rounded-xl p-3 transition hover:bg-[#7fd8e5]/10"
                              >
                                <span className="h-1 w-1 shrink-0 rounded-full bg-[#7fd8e5]/60" />
                                <div className="min-w-0 flex-1">
                                  <div className="font-mono text-xs text-white/90">
                                    {child.label}
                                  </div>
                                  {child.desc && (
                                    <div className="mt-0.5 truncate text-[10px] text-[#C9D6DF]/50">
                                      {child.desc}
                                    </div>
                                  )}
                                </div>
                              </a>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </nav>

              {/* CTA */}
              <div className="mt-8 space-y-3">
                <a
                  href="https://shipflow.se/how-to-buy/"
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#7fd8e5] to-[#5bbfcc] px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#04070d] shadow-lg shadow-[#7fd8e5]/25 transition hover:shadow-xl hover:shadow-[#7fd8e5]/40"
                >
                  How to Buy
                  <span>→</span>
                </a>

                <a
                  href="https://shipflow.se/support-center/"
                  onClick={onClose}
                  className="flex items-center justify-center rounded-full border border-white/10 bg-white/[0.02] px-6 py-3 font-mono text-xs uppercase tracking-[0.25em] text-[#C9D6DF]/70 transition hover:border-[#7fd8e5]/30 hover:text-[#7fd8e5]"
                >
                  Contact Support
                </a>
              </div>

              {/* Footer */}
              <div className="mt-8 border-t border-white/5 pt-6">
                <div className="text-center font-mono text-[9px] uppercase tracking-[0.3em] text-[#C9D6DF]/40">
                  SHIPFLOW · CFD Since 1992
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

/* ============ MAIN NAV COMPONENT ============ */
export default function ShipflowMarineNav({ visible, solid = false }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState("Home");
  const arrival = useArrivalState();

  const isVisible = typeof visible === "boolean" ? visible : arrival.navVisible;

  // Scroll detection for glass intensity change
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isSolid = solid || scrolled;

  return (
    <>
      {/* ============ DESKTOP NAVBAR ============ */}
      <motion.header
        initial={{ opacity: 0, y: -18 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -18 }}
        transition={{ duration: 0.75, ease }}
        className={`
          pointer-events-auto fixed left-4 right-4 top-4 z-[70] hidden items-center justify-between
          rounded-full border px-4 py-2.5 text-white
          transition-all duration-500 md:flex lg:left-8 lg:right-8
          ${isSolid
            ? "border-[#7fd8e5]/30 bg-[#04070d]/95 shadow-[0_20px_80px_rgba(2,7,13,0.6)] backdrop-blur-2xl"
            : "border-[#7fd8e5]/15 bg-[#04070d]/50 shadow-[0_10px_50px_rgba(2,7,13,0.3)] backdrop-blur-xl"
          }
        `}
      >
        {/* Left: Logo */}
        <a
          href="https://shipflow.se/home/"
          className="transition-opacity hover:opacity-80"
          onClick={() => setActiveItem("Home")}
        >
          <LogoMark />
        </a>

        {/* Center: Nav */}
        <nav className="flex items-center gap-0.5">
          {nav.map((item) => (
            <DesktopNavItem
              key={item.label}
              item={item}
              isActive={activeItem === item.label}
            />
          ))}
        </nav>

        {/* Right: CTA cluster */}
        <div className="flex items-center gap-2">
         

          {/* CTA */}
          <a
            href="/contact"
            className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#7fd8e5] to-[#5bbfcc] px-5 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#04070d] shadow-[0_0_20px_rgba(127,216,229,0.2)] transition hover:shadow-[0_0_30px_rgba(127,216,229,0.4)]"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
            <span className="relative">Contact</span>
            <svg
              width="10"
              height="10"
              viewBox="0 0 12 12"
              className="relative transition-transform group-hover:translate-x-0.5"
            >
              <path
                d="M 3 6 L 9 6 M 9 6 L 6 3 M 9 6 L 6 9"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </a>
        </div>
      </motion.header>

      {/* ============ MOBILE BAR ============ */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
        transition={{ duration: 0.75, ease }}
        className={`
          pointer-events-auto fixed bottom-4 left-4 right-4 z-[70] flex items-center justify-between
          rounded-full border px-3 py-2.5 text-white transition-all duration-500 md:hidden
          ${isSolid
            ? "border-[#7fd8e5]/30 bg-[#04070d]/95 shadow-[0_20px_80px_rgba(2,7,13,0.7)] backdrop-blur-2xl"
            : "border-[#7fd8e5]/20 bg-[#04070d]/75 shadow-[0_15px_60px_rgba(2,7,13,0.5)] backdrop-blur-2xl"
          }
        `}
      >
        <a href="https://shipflow.se/home/">
          <LogoMark compact />
        </a>

        <div className="flex items-center gap-2">
          {/* Quick CTA */}
          <a
            href="https://shipflow.se/how-to-buy/"
            className="hidden rounded-full bg-gradient-to-r from-[#7fd8e5] to-[#5bbfcc] px-4 py-2 font-mono text-[9px] font-bold uppercase tracking-widest text-[#04070d] sm:block"
          >
            Buy
          </a>

          {/* Menu button */}
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="flex items-center gap-2 rounded-full border border-[#7fd8e5]/30 bg-[#7fd8e5]/10 px-4 py-2 text-[#7fd8e5] transition hover:bg-[#7fd8e5]/20"
          >
            <div className="flex flex-col gap-1">
              <span className="h-px w-3.5 bg-current" />
              <span className="h-px w-2.5 bg-current" />
              <span className="h-px w-3.5 bg-current" />
            </div>
            <span className="font-mono text-[9px] font-bold tracking-[0.22em]">
              MENU
            </span>
          </button>
        </div>
      </motion.div>

      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}