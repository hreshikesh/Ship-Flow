import { motion } from "framer-motion";
import Globe from "../../originkit/ui/globe";

const shipflowMarkers = [
  { location: [20.5937, 78.9629], size: 0.1 },
  { location: [35.6762, 139.6503], size: 0.1 },
  { location: [31.2304, 121.4737], size: 0.1 },
  { location: [37.5665, 126.9780], size: 0.1 },
  { location: [25.0330, 121.5654], size: 0.1 },
  { location: [3.1390, 101.6869], size: 0.1 },
  { location: [51.5072, -0.1276], size: 0.1 },
  { location: [52.5200, 13.4050], size: 0.1 },
  { location: [59.3293, 18.0686], size: 0.1 },
  { location: [55.6761, 12.5683], size: 0.1 },
  { location: [59.9139, 10.7522], size: 0.1 },
  { location: [52.3676, 4.9041], size: 0.1 },
  { location: [44.4268, 26.1025], size: 0.1 },
  { location: [41.9028, 12.4964], size: 0.1 },
  { location: [48.8566, 2.3522], size: 0.1 },
  { location: [37.9838, 23.7275], size: 0.1 },
  { location: [40.7128, -74.0060], size: 0.1 },
  { location: [43.6532, -79.3832], size: 0.1 },
  { location: [-23.5505, -46.6333], size: 0.1 },
];

export default function GlobeSection() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="gp-globe-container"
    >
      <div className="gp-globe">
        <Globe
          speed={16}
          smoothing={8}
          dots={{
            color: "#6FC3DF",
            size: 5,
            density: 8,
            allDots: false,
          }}
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