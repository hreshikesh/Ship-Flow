import { motion } from "framer-motion";
import CountUp from "../../../component/CountUp";

const stats = [
  { value: 30, suffix: "+", label: "Years" },
  { value: 20, suffix: "+", label: "Countries" },
  { value: 3, suffix: "", label: "Continents" },
];

export default function StatsCard() {
  return (
    <div className="gp-stat">
      <div className="gp-stat-grid">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.12 }}
            className="gp-stat-item"
          >
            <h3>
              <CountUp from={0} to={stat.value} duration={2} />
              {stat.suffix}
            </h3>
            <p>{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}