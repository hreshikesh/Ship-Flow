import { motion } from "framer-motion";

export default function FlipFront({ module }) {
  const Icon = module.icon;

  return (
    <div
      className="absolute inset-0 rounded-3xl overflow-hidden
      border border-[#6FC3DF]/30
      bg-gradient-to-br from-[#071A2F] via-[#04101F] to-[#020A14]
      shadow-[0_20px_60px_rgba(0,0,0,.6)]"
      style={{
        backfaceVisibility: "hidden",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Image */}
      <div className="relative h-[60%] overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6 }}
          src={module.image}
          alt={module.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#04101F] to-transparent" />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col justify-between h-[40%]">
        <div>
          <div className="flex items-center gap-3">
            <Icon size={18} className="text-[#6FC3DF]" />
            <span className="text-xs uppercase tracking-[0.3em] text-[#6FC3DF]">
              SHIPFLOW
            </span>
          </div>

          <h3 className="mt-4 text-2xl font-bold text-white">
            {module.title}
          </h3>

          <p className="mt-2 text-sm text-[#AFC4D8]">
            {module.subtitle}
          </p>
        </div>

        <div className="mt-4 border-t border-[#6FC3DF]/20 pt-3 text-sm text-[#6FC3DF]">
          Hover or Tap to Explore →
        </div>
      </div>
    </div>
  );
}