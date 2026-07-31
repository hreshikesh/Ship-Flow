import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { useArrivalState } from "../arrival/arrivalStore";

const ease = [0.22, 1, 0.36, 1];

const nav = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Products",
    href: "https://shipflow.se/products-overview/",
    children: [
      ["Overview", "https://shipflow.se/products-overview/"],
      ["BASIC", "https://shipflow.se/?page_id=135"],
      ["RANS", "https://shipflow.se/shipflow-rans/"],
      ["MOTIONS", "https://shipflow.se/?page_id=136"],
      ["GUI", "https://shipflow.se/shipflow-caeses/"],
      ["Case Studies", "https://shipflow.se/applications-case-studies/"],
    ],
  },
  {
    label: "Services",
    href: "https://shipflow.se/services/",
  },
  {
    label: "Resources",
    href: "https://shipflow.se/resources/",
    children: [
      ["Downloads", "https://shipflow.se/downloads/"],
      ["Documentation", "https://shipflow.se/documentation/"],
      ["Video", "https://shipflow.se/video/"],
      ["Training", "https://shipflow.se/shipflow-training/"],
      ["Publications", "https://shipflow.se/publications/"],
      ["FAQ", "https://shipflow.se/faq/"],
    ],
  },
  {
    label: "Support",
    href: "https://shipflow.se/support-center/",
  },
  {
    label: "Buy",
    href: "https://shipflow.se/how-to-buy/",
  },
  {
    label: "Company",
    href: "https://shipflow.se/company/",
  },
];

function LogoMark() {
  return (
    <div className="flex items-center gap-3">
      {/* Sonar Radar Pulse Logo Ring */}
      <span className="relative grid h-8 w-8 place-items-center rounded-full border border-[#7fd8e5]/30 bg-[#7fd8e5]/10">
        <span className="h-2.5 w-2.5 rounded-full bg-[#7fd8e5] shadow-[0_0_16px_rgba(127,216,229,0.95)] animate-pulse" />
        <span className="absolute inset-[-4px] rounded-full border border-[#7fd8e5]/20 animate-ping opacity-30" />
      </span>

      <div className="leading-none">
        <div className="text-xs font-bold tracking-[0.35em] text-white">
          SHIPFLOW
        </div>

        <div className="mt-1 hidden text-[9px] font-mono uppercase tracking-[0.24em] text-[#7fd8e5]/70 lg:block">
          HYDRO / RADAR HUD
        </div>
      </div>
    </div>
  );
}

function DesktopNavItem({ item }) {
  return (
    <div className="group relative">
      <a
        href={item.href}
        className="rounded-full px-3 py-2 text-[11px] font-mono font-medium uppercase tracking-[0.18em] text-[#C9D6DF]/75 transition hover:text-[#7fd8e5]"
      >
        {item.label}
      </a>

      {item.children && (
        <div className="pointer-events-none absolute left-1/2 top-full mt-4 w-72 -translate-x-1/2 translate-y-2 rounded-3xl border border-[#7fd8e5]/25 bg-[#04070d]/95 p-3 opacity-0 shadow-[0_30px_90px_rgba(2,7,13,0.8)] backdrop-blur-2xl transition duration-300 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
          <div className="mb-2 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.24em] text-[#7fd8e5]">
            // {item.label}
          </div>

          {item.children.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="block rounded-2xl px-4 py-3 font-mono text-xs text-[#C9D6DF]/70 transition hover:bg-[#7fd8e5]/10 hover:text-[#7fd8e5]"
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function MobileDrawer({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="fixed inset-0 z-[90] bg-[#02070d]/80 backdrop-blur-md md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.aside
            className="fixed bottom-0 left-0 right-0 z-[100] max-h-[86dvh] overflow-y-auto rounded-t-[2rem] border-t border-[#7fd8e5]/30 bg-[#04070d]/98 p-6 text-white shadow-[0_-30px_90px_rgba(2,7,13,0.9)] backdrop-blur-2xl md:hidden font-mono"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.65, ease }}
          >
            <div className="mb-7 flex items-center justify-between">
              <a href="/">
                <LogoMark />
              </a>

              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-[#7fd8e5]/30 bg-[#7fd8e5]/10 px-4 py-2 text-[10px] tracking-[0.2em] text-[#7fd8e5] transition hover:bg-[#7fd8e5]/20"
              >
                CLOSE
              </button>
            </div>

            <nav className="space-y-1">
              {nav.map((item) => (
                <div
                  key={item.label}
                  className="border-b border-white/[0.08] py-4"
                >
                  <a
                    href={item.href}
                    className="block text-2xl font-medium tracking-tight text-white/90 hover:text-[#7fd8e5]"
                  >
                    {item.label}
                  </a>

                  {item.children && (
                    <div className="mt-4 grid grid-cols-2 gap-2 border-l border-[#7fd8e5]/30 pl-4">
                      {item.children.map(([label, href]) => (
                        <a
                          key={label}
                          href={href}
                          className="text-xs text-[#C9D6DF]/65 transition hover:text-[#7fd8e5]"
                        >
                          {label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export default function ShipflowMarineNav({
  visible,
  solid = false,
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const arrival = useArrivalState();

  const isVisible =
    typeof visible === "boolean" ? visible : arrival.navVisible;

  return (
    <>
      {/* Desktop navbar */}
      <motion.header
        initial={{ opacity: 0, y: -18 }}
        animate={
          isVisible
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: -18 }
        }
        transition={{ duration: 0.75, ease }}
        className={[
          "pointer-events-auto fixed left-4 right-4 top-4 z-[70] hidden items-center justify-between rounded-full border px-4 py-3 text-white shadow-[0_18px_70px_rgba(2,7,13,0.5)] backdrop-blur-2xl md:flex lg:left-8 lg:right-8",
          solid
            ? "border-[#7fd8e5]/30 bg-[#04070d]/88"
            : "border-[#7fd8e5]/20 bg-[#04070d]/65",
        ].join(" ")}
      >
        <a href="https://shipflow.se/home/">
          <LogoMark />
        </a>

        <nav className="flex items-center gap-1">
          {nav.map((item) => (
            <DesktopNavItem key={item.label} item={item} />
          ))}
        </nav>

        <a
          href="https://shipflow.se/how-to-buy/"
          className="rounded-full border border-[#7fd8e5]/30 bg-[#7fd8e5]/10 px-4 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7fd8e5] shadow-[0_0_15px_rgba(127,216,229,0.15)] transition hover:bg-[#7fd8e5]/20"
        >
          Contact
        </a>
      </motion.header>

      {/* Mobile bar */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={
          isVisible
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 18 }
        }
        transition={{ duration: 0.75, ease }}
        className={[
          "pointer-events-auto fixed bottom-4 left-4 right-4 z-[70] flex items-center justify-between rounded-full border px-4 py-3 text-white shadow-[0_18px_70px_rgba(2,7,13,0.6)] backdrop-blur-2xl md:hidden font-mono",
          solid
            ? "border-[#7fd8e5]/30 bg-[#04070d]/90"
            : "border-[#7fd8e5]/20 bg-[#04070d]/75",
        ].join(" ")}
      >
        <a href="https://shipflow.se/home/">
          <LogoMark />
        </a>

        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="rounded-full border border-[#7fd8e5]/30 bg-[#7fd8e5]/10 px-4 py-2 text-[10px] tracking-[0.22em] text-[#7fd8e5] transition hover:bg-[#7fd8e5]/20"
        >
          MENU
        </button>
      </motion.div>

      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}