import { motion } from "framer-motion";
import Globe from "../../originkit/ui/globe";

const shipflowMarkers = [
  { location: [20.5937, 78.9629], size: 0.1 },   // India
  { location: [35.6762, 139.6503], size: 0.1 },  // Japan
  { location: [31.2304, 121.4737], size: 0.1 },  // China
  { location: [37.5665, 126.9780], size: 0.1 },  // Korea
  { location: [25.0330, 121.5654], size: 0.1 },  // Taiwan
  { location: [3.1390, 101.6869], size: 0.1 },   // Malaysia
  { location: [51.5072, -0.1276], size: 0.1 },   // UK
  { location: [52.5200, 13.4050], size: 0.1 },   // Germany
  { location: [59.3293, 18.0686], size: 0.1 },   // Sweden (HQ)
  { location: [55.6761, 12.5683], size: 0.1 },   // Denmark
  { location: [59.9139, 10.7522], size: 0.1 },   // Norway
  { location: [52.3676, 4.9041], size: 0.1 },    // Netherlands
  { location: [44.4268, 26.1025], size: 0.1 },   // Romania
  { location: [41.9028, 12.4964], size: 0.1 },   // Italy
  { location: [48.8566, 2.3522], size: 0.1 },    // France
  { location: [37.9838, 23.7275], size: 0.1 },   // Greece
  { location: [40.7128, -74.0060], size: 0.1 },  // USA
  { location: [43.6532, -79.3832], size: 0.1 },  // Canada
  { location: [-23.5505, -46.6333], size: 0.1 }, // Brazil
];

export default function GlobeSection() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="gp-globe-container relative"
    >
      <div className="gp-globe relative">
        {/* 🔑 Layer 1: Orbital rings (behind globe) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          {/* Outer ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute w-[110%] h-[110%] rounded-full border border-[#6FC3DF]/10"
            style={{
              borderTopColor: "rgba(56, 189, 248, 0.4)",
              borderRightColor: "rgba(111, 195, 223, 0.15)",
            }}
          />

          {/* Middle ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
            className="absolute w-[100%] h-[100%] rounded-full border border-dashed border-[#6FC3DF]/15"
          />

          {/* Sonar pulse rings */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={`pulse-${i}`}
              animate={{
                scale: [1, 1.5, 1.8],
                opacity: [0.4, 0.1, 0],
              }}
              transition={{
                duration: 4,
                delay: i * 1.3,
                repeat: Infinity,
                ease: "easeOut",
              }}
              className="absolute w-[85%] h-[85%] rounded-full border-2 border-[#38BDF8]/30"
            />
          ))}
        </div>

        {/* 🔑 Layer 2: Globe */}
        <div className="relative z-10">
          <Globe
            speed={16}
            smoothing={8}
            dots={{ color: "#6FC3DF", size: 5, density: 8, allDots: false }}
            fill="dots"
            scale={8}
            stopOnHover={true}
            markerConfig={{
              markers: shipflowMarkers,
              color: "#38BDF8",
              size: 40,
            }}
            direction="left"
            initialLatitude={23}
            initialLongitude={-23}
            oceanColor="#02070D"
            outlineColor="#6FC3DF"
            showOutline={true}
            graticuleColor="rgba(111,195,223,0.12)"
            showGrid={true}
            outlineWidth={1}
            dragSpeed={5}
            detail={5}
          />
        </div>

        {/* 🔑 Layer 3: Connection arcs overlay */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-20"
          viewBox="0 0 400 400"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
          style={{ mixBlendMode: "screen" }}
        >
          

          {/* Connection arcs - orbital paths around globe */}
          {[
            { d: "M 80 200 Q 200 100 320 200", delay: 0, grad: 1 },
            { d: "M 100 240 Q 200 120 300 220", delay: 0.6, grad: 2 },
            { d: "M 90 180 Q 200 60 310 180", delay: 1.2, grad: 1 },
            { d: "M 110 220 Q 200 320 290 200", delay: 1.8, grad: 2 },
            { d: "M 130 260 Q 200 340 270 220", delay: 2.4, grad: 1 },
          ].map((arc, i) => (
            <motion.path
              key={`arc-${i}`}
              d={arc.d}
              stroke={arc.grad === 1 ? "url(#arcGradient1)" : "url(#arcGradient2)"}
              strokeWidth="1.2"
              strokeDasharray="6 8"
              strokeLinecap="round"
              filter="url(#arcGlow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: [0, 1, 1, 0],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 4,
                delay: arc.delay,
                repeat: Infinity,
                repeatDelay: 0.5,
                ease: "easeInOut",
                times: [0, 0.4, 0.6, 1],
              }}
            />
          ))}

         
          

             
        </svg>

        {/* 🔑 Layer 4: Corner accents */}
        <div className="absolute inset-0 pointer-events-none z-30">
          <div className="absolute left-4 top-4 h-6 w-6 border-l-2 border-t-2 border-[#6FC3DF]/40" />
          <div className="absolute right-4 top-4 h-6 w-6 border-r-2 border-t-2 border-[#6FC3DF]/40" />
          <div className="absolute left-4 bottom-4 h-6 w-6 border-l-2 border-b-2 border-[#6FC3DF]/40" />
          <div className="absolute right-4 bottom-4 h-6 w-6 border-r-2 border-b-2 border-[#6FC3DF]/40" />
        </div>
      </div>

      {/* Since 1992 label */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="gp-globe-label"
      >
        <p>Since</p>
        <h4>1992</h4>
      </motion.div>
    </motion.div>
  );
}