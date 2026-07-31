import { motion } from "framer-motion";
import { useState } from "react";
import {
    Users,
    ChevronRight,
    Cpu,
    BookOpen,
    PlayCircle,
    Download,
    ArrowRight,
    Ship,
    Waves,
    Zap,
    FileText,
    Video,
    CloudDownload,
} from "lucide-react";

import OrbitImages from "../../../component/OrbitImages";

import hardware from "../../../assets/images/simulation/basic.png";
import docs from "../../../assets/images/simulation/basic.png";
import video from "../../../assets/images/simulation/basic.png";
import download from "../../../assets//images/simulation/basic.png";

const orbitImages = [
    hardware,
    docs,
    video,
    download,
];

const analysis = [
    {
        title: "SHIPFLOW BASIC",
        desc: "Potential flow solver for wave resistance, sinkage and trim calculations",
        icon: Ship,
        color: "#38BDF8",
    },
    {
        title: "SHIPFLOW RANS",
        desc: "RANS CFD solver for viscous flow analysis and total resistance prediction",
        icon: Zap,
        color: "#6FC3DF",
    },
    {
        title: "SHIPFLOW MOTIONS",
        desc: "Time-dependent solver for seakeeping and motion analysis in waves",
        icon: Waves,
        color: "#67E8F9",
    },
];

const resources = [
    {
        id: "hardware",
        icon: Cpu,
        title: "System Requirements",
        desc: "Hardware specifications for SHIPFLOW",
        details: "Minimum and recommended system requirements for optimal performance",
        color: "#38BDF8",
        image: hardware,
    },
    {
        id: "docs",
        icon: FileText,
        title: "User Manual",
        desc: "Complete SHIPFLOW documentation",
        details: "Installation guide, theory manual, and user reference documentation",
        color: "#6FC3DF",
        image: docs,
    },
    {
        id: "videos",
        icon: Video,
        title: "Tutorial Videos",
        desc: "Learn SHIPFLOW workflow",
        details: "Step-by-step tutorials covering basic to advanced SHIPFLOW usage",
        color: "#67E8F9",
        image: video,
    },
    {
        id: "downloads",
        icon: CloudDownload,
        title: "Software Download",
        desc: "Get SHIPFLOW installer",
        details: "Latest SHIPFLOW version with all modules and example cases",
        color: "#93C5FD",
        image: download,
    },
];

export default function NavalArchitects() {
    const [activeResource, setActiveResource] = useState(resources[0]);
    
    return (
        <section className="relative min-h-screen overflow-hidden bg-[#02070D] py-20 sm:py-28 lg:py-36">
            {/* Background Effects */}
            <div className="absolute inset-0">
                {/* Central Glow */}
                <div className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#38BDF8]/10 blur-[180px]" />
                
                {/* Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(56,189,248,.2) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(56,189,248,.2) 1px, transparent 1px)
                        `,
                        backgroundSize: "60px 60px",
                    }}
                />
                
                {/* Animated Lines */}
                <div className="absolute left-0 top-1/4 h-px w-full bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />
                <div className="absolute left-0 bottom-1/4 h-px w-full bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                
                {/* ========== HERO SECTION ========== */}
                <div className="flex flex-col items-center text-center mb-20">
                    {/* Top Badge */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-6 inline-flex items-center gap-3 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-6 py-2.5 backdrop-blur-sm"
                    >
                        <Users className="h-4 w-4 text-cyan-300" />
                        <span className="text-xs uppercase tracking-[0.35em] text-cyan-300 font-bold">
                            SHIPFLOW CFD Platform
                        </span>
                    </motion.div>

                    {/* Main Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6"
                    >
                        For Naval{" "}
                        <span className="bg-gradient-to-r from-cyan-300 via-cyan-400 to-cyan-300 bg-clip-text text-transparent">
                            Architects
                        </span>
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="max-w-2xl text-lg sm:text-xl text-slate-400 leading-relaxed"
                    >
                        Professional CFD software for ship hydrodynamics, 
                        resistance, propulsion and seakeeping analysis
                    </motion.p>
                </div>

                {/* ========== MAIN CONTENT ========== */}
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">
                    
                    {/* LEFT SIDE - SHIPFLOW Modules */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="order-2 lg:order-1"
                    >
                        {/* Analysis Section Title */}
                        <div className="mb-10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-px w-12 bg-cyan-400/30" />
                                <span className="text-xs uppercase tracking-[0.4em] text-cyan-300 font-bold">
                                    CFD Modules
                                </span>
                            </div>
                            <h2 className="text-4xl sm:text-5xl font-bold text-white">
                                SHIPFLOW
                                <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-cyan-400">
                                    Solutions
                                </span>
                            </h2>
                        </div>

                        {/* SHIPFLOW Module Cards */}
                        <div className="space-y-4">
                            {analysis.map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -30 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.15 }}
                                        whileHover={{ x: 8 }}
                                        className="group relative overflow-hidden rounded-2xl border border-cyan-400/10 bg-[#06111E]/50 p-5 backdrop-blur-xl transition-all duration-500 hover:border-cyan-400/30 hover:bg-cyan-400/5"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="flex flex-col items-center">
                                                <motion.div
                                                    animate={{ scale: [1, 1.2, 1] }}
                                                    transition={{ repeat: Infinity, duration: 2, delay: index * 0.3 }}
                                                    className="grid h-10 w-10 place-items-center rounded-full border border-cyan-400/20 bg-cyan-400/10"
                                                >
                                                    <Icon size={18} className="text-cyan-300" />
                                                </motion.div>
                                                {index !== analysis.length - 1 && (
                                                    <div className="mt-2 h-12 w-px bg-gradient-to-b from-cyan-400/30 to-transparent" />
                                                )}
                                            </div>
                                            
                                            <div>
                                                <h3 className="text-lg font-bold text-white mb-2">
                                                    {item.title}
                                                </h3>
                                                <p className="text-sm text-slate-400 leading-relaxed">
                                                    {item.desc}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* CTA Button */}
                        <motion.button
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="mt-8 inline-flex items-center gap-3 rounded-xl border border-cyan-400/30 bg-gradient-to-r from-cyan-400/10 to-transparent px-6 py-3 text-sm font-medium text-cyan-300 transition-all hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(56,189,248,.1)]"
                        >
                            Learn More About SHIPFLOW
                            <ArrowRight size={16} />
                        </motion.button>
                    </motion.div>

                    {/* RIGHT SIDE - Orbit & Download */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="order-1 lg:order-2"
                    >
                        {/* Orbit Section */}
                        <div className="relative flex items-center justify-center mb-16">
                            <OrbitImages
                                images={orbitImages}
                                responsive
                                shape="circle"
                                radius={280}
                                itemSize={80}
                                duration={26}
                                rotation={0}
                                baseWidth={700}
                                centerContent={
                                    <div className="relative">
                                        <motion.div
                                            animate={{ scale: [1, 1.05, 1] }}
                                            transition={{ repeat: Infinity, duration: 3 }}
                                            className="absolute inset-0 rounded-full bg-cyan-400/20 blur-3xl"
                                        />
                                        
                                        <div className="relative flex h-40 w-40 sm:h-48 sm:w-48 flex-col items-center justify-center rounded-full border border-cyan-400/30 bg-[#02070D]/90 backdrop-blur-2xl">
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                                                className="absolute inset-2 rounded-full border border-dashed border-cyan-400/20"
                                            />
                                            <Users className="h-12 w-12 sm:h-14 sm:w-14 text-cyan-300" />
                                            <p className="mt-2 text-[10px] uppercase tracking-[0.4em] text-cyan-300">
                                                SHIPFLOW
                                            </p>
                                            <h3 className="mt-1 text-lg sm:text-xl font-bold text-white">
                                                Platform
                                            </h3>
                                        </div>
                                    </div>
                                }
                            />
                        </div>

                        {/* Resource Card */}
                        <div className="relative">
                            <motion.div
                                key={activeResource.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-[#06111E]/90 to-[#02070D]/90 p-6 sm:p-8 backdrop-blur-2xl overflow-hidden"
                            >
                                {/* Animated background */}
                                <div className="absolute inset-0 opacity-10">
                                    <div 
                                        className="absolute inset-0"
                                        style={{
                                            backgroundImage: `
                                                linear-gradient(45deg, rgba(56,189,248,.1) 1px, transparent 1px),
                                                linear-gradient(-45deg, rgba(56,189,248,.1) 1px, transparent 1px)
                                            `,
                                            backgroundSize: "20px 20px",
                                        }}
                                    />
                                </div>

                                <div className="relative z-10">
                                    {/* Header */}
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-4">
                                            <div className="grid h-12 w-12 place-items-center rounded-xl border border-cyan-400/20 bg-cyan-400/10">
                                                <activeResource.icon size={24} className="text-cyan-300" />
                                            </div>
                                            <div>
                                                <p className="text-xs uppercase tracking-[0.35em] text-cyan-300 font-bold">
                                                    Resource
                                                </p>
                                                <h3 className="text-xl font-bold text-white mt-1">
                                                    {activeResource.title}
                                                </h3>
                                            </div>
                                        </div>
                                        
                                        {/* Status */}
                                        <motion.div
                                            animate={{ opacity: [0.5, 1, 0.5] }}
                                            transition={{ repeat: Infinity, duration: 2 }}
                                            className="flex items-center gap-2"
                                        >
                                            <div className="h-2 w-2 rounded-full bg-green-400" />
                                            <span className="text-xs text-green-400">Available</span>
                                        </motion.div>
                                    </div>

                                    <p className="text-slate-400 mb-4">
                                        {activeResource.desc}
                                    </p>

                                    {/* Details */}
                                    <div className="mb-6 rounded-xl border border-cyan-400/10 bg-black/20 p-4">
                                        <p className="text-sm text-slate-300">
                                            {activeResource.details}
                                        </p>
                                    </div>

                                    {/* Action Button */}
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-500 py-3 px-6 text-sm font-bold text-white transition-all hover:shadow-[0_0_30px_rgba(56,189,248,.2)]"
                                    >
                                        {activeResource.id === "downloads" ? "Contact for Download" : "View Resource"}
                                        <ArrowRight size={16} />
                                    </motion.button>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                {/* ========== RESOURCES GRID ========== */}
                <div className="mt-24 lg:mt-32">
                    {/* Section Title */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-3 mb-4">
                            <div className="h-px w-8 bg-cyan-400/30" />
                            <span className="text-xs uppercase tracking-[0.4em] text-cyan-300 font-bold">
                                Resources
                            </span>
                            <div className="h-px w-8 bg-cyan-400/30" />
                        </div>
                        <h3 className="text-3xl sm:text-4xl font-bold text-white">
                            Documentation & Support
                        </h3>
                    </div>

                    {/* Resource Cards - 2 per row mobile, 4 desktop */}
                    <div className="grid grid-cols-2 gap-4 sm:gap-6 xl:grid-cols-4 xl:gap-8">
                        {resources.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ y: -8 }}
                                    onHoverStart={() => setActiveResource(item)}
                                    onClick={() => setActiveResource(item)}
                                    className={`group relative overflow-hidden rounded-2xl border p-4 sm:p-6 backdrop-blur-xl transition-all duration-500 cursor-pointer
                                        ${activeResource.id === item.id 
                                            ? "border-cyan-400/40 bg-cyan-400/10 shadow-[0_0_40px_rgba(56,189,248,.1)]" 
                                            : "border-cyan-400/10 bg-white/[0.02] hover:border-cyan-400/30"
                                        }`}
                                >
                                    {/* Icon */}
                                    <motion.div
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        className="mb-4 inline-flex"
                                    >
                                        <div className="grid h-10 w-10 sm:h-12 sm:w-12 place-items-center rounded-xl border border-cyan-400/20 bg-cyan-400/5">
                                            <Icon size={20} className="text-cyan-300 sm:w-6 sm:h-6" />
                                        </div>
                                    </motion.div>

                                    {/* Title */}
                                    <h4 className="text-sm sm:text-base font-bold text-white mb-2">
                                        {item.title}
                                    </h4>

                                    {/* Description */}
                                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                                        {item.desc}
                                    </p>

                                    {/* Action */}
                                    <button className={`mt-4 flex items-center gap-1 text-xs font-medium transition-all 
                                        ${activeResource.id === item.id ? "text-cyan-300" : "text-slate-400 group-hover:text-cyan-300"}
                                        group-hover:gap-2`}
                                    >
                                        <span>{item.id === "downloads" ? "Contact" : "View"}</span>
                                        <ChevronRight size={14} />
                                    </button>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}