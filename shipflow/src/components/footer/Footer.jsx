// Footer.jsx
import { motion } from "framer-motion";
import {
    ArrowUpRight,
    Mail,
    MapPin,
    Phone,
    Anchor,
    ChevronRight,
} from "lucide-react";
import logo from "../../assets/images/logo/image.png";

/* ============ INLINE SVG SOCIAL ICONS ============ */
const LinkedInIcon = ({ size = 15 }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
    >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
);

const YouTubeIcon = ({ size = 15 }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
    >
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
);

const TwitterIcon = ({ size = 15 }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
    >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644z" />
    </svg>
);

const GitHubIcon = ({ size = 15 }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
    >
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
);

/* ============ REAL SHIPFLOW.SE NAVIGATION DATA ============ */
const linkGroups = [
    {
        title: "Products",
        links: [
            { label: "SHIPFLOW BASIC", href: "#" },
            { label: "SHIPFLOW RANS", href: "#" },
            { label: "SHIPFLOW MOTIONS", href: "#" },
            { label: "Compare Packages", href: "#" },
        ],
    },
    {
        title: "Applications",
        links: [
            { label: "Resistance & Propulsion", href: "#" },
            { label: "Seakeeping", href: "#" },
            { label: "Manoeuvring", href: "#" },
            { label: "Hull Optimization", href: "#" },
            { label: "Energy Saving Devices", href: "#" },
        ],
    },
    {
        title: "Resources",
        links: [
            { label: "Documentation", href: "#" },
            { label: "Video Tutorials", href: "#" },
            { label: "Hardware Requirements", href: "#" },
            { label: "Scientific Publications", href: "#" },
            { label: "Downloads", href: "#" },
        ],
    },
    {
        title: "Company",
        links: [
            { label: "About FLOWTECH", href: "#" },
            { label: "News & Events", href: "#" },
            { label: "Careers", href: "#" },
            { label: "Contact", href: "#" },
            { label: "Support", href: "#" },
        ],
    },
];

const qualities = ["Fast", "Accurate", "Robust", "Easy to Use"];

const socials = [
    { name: "LinkedIn", Icon: LinkedInIcon, href: "#" },
    { name: "YouTube", Icon: YouTubeIcon, href: "#" },
    { name: "Twitter", Icon: TwitterIcon, href: "#" },
    { name: "GitHub", Icon: GitHubIcon, href: "#" },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer
            className="relative overflow-hidden border-t border-cyan-500/10 bg-[#020b16] text-white"
            style={{ contentVisibility: "auto", containIntrinsicSize: "800px" }}
        >
            {/* ============ BACKGROUND ============ */}
            <div
                className="pointer-events-none absolute inset-0"
                aria-hidden="true"
                style={{
                    background: `
            radial-gradient(ellipse 80% 60% at 50% 0%, rgba(6,182,212,0.08) 0%, transparent 70%),
            radial-gradient(ellipse 40% 30% at 100% 100%, rgba(59,130,246,0.05) 0%, transparent 60%)
          `,
                }}
            />

            {/* CFD-style grid */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.03]"
                aria-hidden="true"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(6,182,212,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,.5) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
            />

            {/* Decorative wave line at top */}
            <div className="absolute inset-x-0 top-0">
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

            <div className="container relative z-10 mx-auto px-4 sm:px-6">


                {/* ============ MAIN GRID ============ */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="grid gap-12 py-16 lg:grid-cols-[1.5fr_2.5fr] lg:gap-16 lg:py-20"
                >
                    {/* ---------- Brand Column ---------- */}
                    <div>
                        <div className="flex items-center gap-3">
                            {/* Logo container with proper sizing */}
                            <div className="relative flex h-24 w-50 items-center justify-center rounded-xl bg-gradient-to-br from-white-500 to-white shadow-lg shadow-cyan-500/30 overflow-hidden">
                                <img
                                    src={logo}
                                    alt="ShipFlow Logo"
                                    className="h-20 w-40 object-contain"
                                  
                                />
                                {/* Inner highlight */}
                                <div className="absolute inset-0 rounded-xl border border-white/20" />
                                {/* Top gloss */}
                                <div className="absolute inset-x-0 top-0 h-1/2 rounded-t-xl bg-gradient-to-b from-white/10 to-transparent" />
                            </div>

                            {/* Wordmark */}
                            {/* <div className="leading-none">
                                <h2 className="text-2xl font-black tracking-wider text-white">
                                    SHIPFLOW
                                </h2>
                                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan-400">
                                    by FLOWTECH
                                </p>
                            </div> */}
                        </div>

                        <p className="mt-6 max-w-sm text-sm leading-relaxed text-slate-400">
                            Professional CFD software for resistance, propulsion, seakeeping
                            and manoeuvring simulations. Trusted by naval architects and
                            shipyards worldwide for over 35 years.
                        </p>

                        {/* Quality badges */}
                        <div className="mt-6 flex flex-wrap gap-2">
                            {qualities.map((item) => (
                                <span
                                    key={item}
                                    className="rounded-full border border-cyan-500/20 bg-cyan-500/[0.06] px-3 py-1 text-[11px] font-medium text-cyan-300"
                                >
                                    {item}
                                </span>
                            ))}
                        </div>

                        {/* Contact info */}
                        <div className="mt-8 space-y-3 border-t border-white/5 pt-6">
                            <a
                                href="mailto:info@flowtech.se"
                                className="group flex items-center gap-3 text-sm text-slate-400 transition hover:text-cyan-300"
                            >
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-500/20 bg-cyan-500/10 transition group-hover:bg-cyan-500/20">
                                    <Mail size={13} className="text-cyan-400" />
                                </div>
                                info@flowtech.se
                            </a>

                            <a
                                href="tel:+46317201550"
                                className="group flex items-center gap-3 text-sm text-slate-400 transition hover:text-cyan-300"
                            >
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-500/20 bg-cyan-500/10 transition group-hover:bg-cyan-500/20">
                                    <Phone size={13} className="text-cyan-400" />
                                </div>
                                +46 31 720 1550
                            </a>

                            <div className="flex items-start gap-3 text-sm text-slate-400">
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-cyan-500/20 bg-cyan-500/10">
                                    <MapPin size={13} className="text-cyan-400" />
                                </div>
                                <div>
                                    FLOWTECH International AB
                                    <br />
                                    <span className="text-xs text-slate-500">
                                        Chalmers Teknikpark, Gothenburg, Sweden
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Social — using inline SVGs */}
                        <div className="mt-6 flex items-center gap-3">
                            <span className="text-[10px] uppercase tracking-wider text-slate-500">
                                Follow
                            </span>
                            <div className="h-px flex-1 bg-white/5" />
                            <div className="flex gap-2">
                                {socials.map(({ name, Icon, href }) => (
                                    <a
                                        key={name}
                                        href={href}
                                        aria-label={name}
                                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.02] text-slate-400 transition hover:border-cyan-400/40 hover:bg-cyan-500 hover:text-white"
                                    >
                                        <Icon size={15} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ---------- Link Groups ---------- */}
                    <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-6">
                        {linkGroups.map((group) => (
                            <div key={group.title}>
                                <h4 className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-white">
                                    <span className="h-px w-4 bg-cyan-400" />
                                    {group.title}
                                </h4>

                                <ul className="space-y-3">
                                    {group.links.map((link) => (
                                        <li key={link.label}>
                                            <a
                                                href={link.href}
                                                className="group flex items-center text-sm text-slate-400 transition hover:text-cyan-300"
                                            >
                                                <ChevronRight
                                                    size={12}
                                                    className="mr-1 -ml-3 opacity-0 transition-all group-hover:ml-0 group-hover:opacity-100 group-hover:text-cyan-400"
                                                />
                                                <span>{link.label}</span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* ============ CFD MARQUEE STRIP ============ */}
                <div className="relative overflow-hidden border-y border-white/5 py-4">
                    <div className="flex animate-marquee items-center gap-8 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.3em] text-slate-600">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="flex items-center gap-8">
                                <span>◆ Potential Flow · XPAN</span>
                                <span>◆ RANS Solver · XCHAP</span>
                                <span>◆ Boundary Layer · XBOUND</span>
                                <span>◆ Motions · XMOTION</span>
                                <span>◆ Free Surface Capturing</span>
                                <span>◆ Adaptive Grid Refinement</span>
                                <span>◆ Overset Grids</span>
                                <span>◆ ISO 19030 Compliant</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ============ BOTTOM BAR ============ */}
                <div className="flex flex-col items-center justify-between gap-4 py-8 text-xs text-slate-500 md:flex-row">
                    <div className="flex flex-col items-center gap-2 md:flex-row md:gap-6">
                        <p>© {currentYear} FLOWTECH International AB. All rights reserved.</p>
                        <div className="hidden md:block h-4 w-px bg-white/10" />
                        <div className="flex gap-4">
                            <a href="#" className="transition hover:text-cyan-300">
                                Privacy Policy
                            </a>
                            <a href="#" className="transition hover:text-cyan-300">
                                Terms of Use
                            </a>
                            <a href="#" className="transition hover:text-cyan-300">
                                Cookies
                            </a>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <span>Powered by</span>
                        <span className="font-semibold text-cyan-400">FLOWTECH</span>
                        <span>·</span>
                        <span>Made in Sweden</span>
                        <span>🇸🇪</span>
                    </div>
                </div>
            </div>


        </footer>
    );
}