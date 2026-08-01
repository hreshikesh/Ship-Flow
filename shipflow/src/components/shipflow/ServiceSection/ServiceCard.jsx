import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

function ServiceCard({ service, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      whileHover={{ y: -8 }}
      className="group relative h-full overflow-hidden rounded-3xl 
      border border-cyan-400/15 bg-gradient-to-br from-[#071A2F]/80 to-[#04101F]/60 
      backdrop-blur-xl transition-all duration-500
      hover:border-cyan-400/40 hover:shadow-[0_20px_60px_rgba(34,211,238,0.15)]"
    >
      {/* Image Section */}
      <div className="relative h-52 overflow-hidden sm:h-56 lg:h-60">
        <img
          src={service.image}
          alt={service.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#04101F] via-[#04101F]/40 to-transparent" />

        {/* Tag Badge */}
        <div className="absolute left-4 top-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-[#02070D]/90 px-3 py-1.5 backdrop-blur-xl">
            <div className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">
              {service.tag}
            </span>
          </div>
        </div>

        {/* Number Badge */}
        <div className="absolute right-4 top-4">
          <div className="grid h-8 w-8 place-items-center rounded-full border border-cyan-400/30 bg-[#02070D]/80 backdrop-blur-xl">
            <span className="text-xs font-bold text-cyan-300">
              0{index + 1}
            </span>
          </div>
        </div>

        {/* Corner accent */}
        <span className="absolute left-4 bottom-4 h-6 w-6 border-l-2 border-b-2 border-cyan-400/40" />
      </div>

      {/* Content Section */}
      <div className="flex flex-col p-6 sm:p-7">
        <h3 className="text-xl font-bold text-white sm:text-2xl">
          {service.title}
        </h3>

        <p className="mt-3 text-sm leading-6 text-slate-400 sm:text-base sm:leading-7">
          {service.description}
        </p>

        {/* CTA */}
        <div className="mt-6 flex items-center justify-between border-t border-cyan-400/10 pt-4">
          <button className="group/btn inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition-colors hover:text-cyan-200">
            View Details
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover/btn:translate-x-1.5"
            />
          </button>

          {/* Status */}
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-green-400" />
            <span className="text-[10px] text-slate-500">Available</span>
          </div>
        </div>
      </div>

      {/* Bottom Accent Line */}
      <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
    </motion.article>
  );
}

export default ServiceCard;