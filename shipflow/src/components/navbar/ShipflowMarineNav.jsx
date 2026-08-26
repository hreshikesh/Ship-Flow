import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, NavLink } from "react-router-dom";
import {
  ArrowUpRight,
  Home as HomeIcon,
  Ship,
  Cpu,
  Mail,
  Calendar,
} from "lucide-react";
import { useArrivalState } from "../shipflow/arrival/arrivalStore";
import logo from "../../assets/images/logo/logo1.webp";

const ease = [0.22, 1, 0.36, 1];

const leftLinks = [
  { label: "Home", to: "/", icon: HomeIcon },
  { label: "Shipflow", to: "/shipflow", icon: Ship },
  { label: "CAESES", to: "/caeses", icon: Cpu },
];

const rightLinks = [
  {
    label: "Contact",
    href: "https://sandebtech.com/contact",
    icon: Mail,
  },
  {
    label: "Meeting",
    href: "https://sandebtech.com/meeting",
    icon: Calendar,
  },
];

export default function ShipflowMarineNav({ visible }) {
  const arrival = useArrivalState();
  const isVisible = typeof visible === "boolean" ? visible : arrival.navVisible;

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* =====================================================
              DESKTOP NAVBAR
          ====================================================== */}
          <motion.header
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.75, ease }}
            className="fixed left-0 right-0 top-0 z-50 hidden px-6 pt-5 lg:block"
          >
            <nav
              className="
                relative mx-auto flex h-[68px] max-w-6xl items-center
                rounded-full border border-white/[0.08]
                bg-[#040b13]/75 px-2
                shadow-[0_20px_60px_rgba(0,0,0,0.35)]
                backdrop-blur-2xl
              "
            >
              {/* Top cyan glow line */}
              <div className="pointer-events-none absolute inset-x-16 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent" />

              {/* LEFT NAVIGATION LINKS */}
              <div className="flex flex-1 items-center justify-end gap-1 pr-20">
                {leftLinks.map((link) => (
                  <NavItem key={link.to} to={link.to} label={link.label} />
                ))}
              </div>

              {/* CENTER LOGO */}
              <Link
                to="/"
                aria-label="Shipflow Marine Home"
                className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
              >
                <div
                  className="
                    flex h-16 w-16 items-center justify-center rounded-full
                    border border-cyan-300/30 bg-[#06121d] p-2
                    shadow-[0_0_35px_rgba(6,182,212,0.2)]
                  "
                >
                  <img
                    src={logo}
                    alt="SandebTech Marine Technology"
                    className="h-14 w-auto object-contain"
                  />
                </div>
              </Link>

              {/* RIGHT NAVIGATION LINKS */}
              <div className="flex flex-1 items-center gap-1 pl-20">
                {rightLinks.map((link) => (
                  <ExternalNavItem
                    key={link.label}
                    href={link.href}
                    label={link.label}
                  />
                ))}
              </div>
            </nav>
          </motion.header>

          {/* =====================================================
              MOBILE TOP BAR
          ====================================================== */}
          <motion.header
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.75, ease }}
            className="fixed left-0 right-0 top-0 z-50 px-3 pt-[max(0.75rem,env(safe-area-inset-top))] lg:hidden"
          >
            <nav
              className="
                relative flex h-12 items-center justify-between gap-2
                rounded-full border border-white/[0.08]
                bg-[#040b13]/90 px-2.5
                shadow-[0_12px_40px_rgba(0,0,0,0.4)]
                backdrop-blur-2xl
              "
            >
              {/* Left Brand Area */}
              <Link
                to="/"
                aria-label="SandebTech Home"
                className="flex min-w-0 shrink-0 items-center gap-2 pl-0.5"
              >
                <div
                  className="
                    flex h-8 w-8 items-center justify-center rounded-full
                    border border-cyan-300/25 bg-[#06121d] p-1
                    shadow-[0_0_16px_rgba(6,182,212,0.12)]
                  "
                >
                  <img
                    src={logo}
                    alt=""
                    className="h-4 w-auto object-contain"
                  />
                </div>
                <span className="truncate text-[9px] font-bold tracking-[0.18em] text-white/90 xs:inline">
                  SANDEBTECH
                </span>
              </Link>

              {/* Quick Actions */}
              <div className="flex shrink-0 items-center gap-1.5">
                {rightLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        flex items-center gap-1 rounded-full
                        border border-cyan-300/15 bg-cyan-300/[0.06]
                        px-2.5 py-1.5
                        text-[9px] font-semibold tracking-wide text-cyan-300/90
                        transition active:scale-95 active:bg-cyan-300/15
                      "
                    >
                      <Icon size={11} className="opacity-80" strokeWidth={2.25} />
                      <span className="hidden min-[380px]:inline">{link.label}</span>
                      <ArrowUpRight size={9} className="opacity-60" />
                    </a>
                  );
                })}
              </div>
            </nav>
          </motion.header>

          {/* =====================================================
              MOBILE BOTTOM DOCK
          ====================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 18 }}
            transition={{ duration: 0.75, ease }}
            className="
              fixed bottom-0 left-0 right-0 z-50 px-3
              pb-[max(0.75rem,env(safe-area-inset-bottom))]
              pt-2 lg:hidden
            "
          >
            <nav
              className="
                mx-auto flex h-14 max-w-md items-center justify-around
                rounded-2xl border border-white/[0.08]
                bg-[#040b13]/92 px-1.5
                shadow-[0_8px_32px_rgba(0,0,0,0.55)]
                backdrop-blur-2xl
              "
            >
              {leftLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className="flex flex-1 flex-col items-center justify-center py-1 outline-none"
                  >
                    {({ isActive }) => (
                      <>
                        <div
                          className={`
                            flex h-7 w-7 items-center justify-center rounded-lg transition-all duration-200
                            ${
                              isActive
                                ? "bg-cyan-300/15 text-cyan-300 shadow-[0_0_14px_rgba(6,182,212,0.35)]"
                                : "bg-transparent text-slate-500"
                            }
                          `}
                        >
                          <IconComponent size={16} strokeWidth={isActive ? 2.25 : 2} />
                        </div>
                        <span
                          className={`
                            mt-0.5 text-[9px] font-medium tracking-tight transition-colors
                            ${isActive ? "text-cyan-300" : "text-slate-500"}
                          `}
                        >
                          {link.label}
                        </span>
                      </>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ============================================================
   DESKTOP INTERNAL NAV LINK
============================================================ */
function NavItem({ to, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `
        group relative rounded-full px-4 py-2.5
        text-[11px] font-medium tracking-[0.08em] transition-all font-mono
        ${isActive ? "text-cyan-300" : "text-slate-400 hover:text-white"}
        `
      }
    >
      {({ isActive }) => (
        <>
          {label}
          <span
            className={`
              absolute bottom-1.5 left-1/2 h-px -translate-x-1/2 bg-cyan-300 transition-all
              ${
                isActive
                  ? "w-3/5 opacity-100"
                  : "w-0 opacity-0 group-hover:w-3/5 group-hover:opacity-70"
              }
            `}
          />
        </>
      )}
    </NavLink>
  );
}

/* ============================================================
   DESKTOP EXTERNAL NAV LINK
============================================================ */
function ExternalNavItem({ href, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="
        group flex items-center gap-1.5 rounded-full px-4 py-2.5
        text-[11px] font-medium tracking-[0.08em] font-mono
        text-slate-400 transition hover:text-white
      "
    >
      {label}
      <ArrowUpRight
        size={11}
        className="
          text-slate-600 transition
          group-hover:-translate-y-0.5 group-hover:translate-x-0.5
          group-hover:text-cyan-300
        "
      />
    </a>
  );
}