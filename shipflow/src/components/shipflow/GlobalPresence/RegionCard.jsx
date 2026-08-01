import { motion } from "framer-motion";

export default function RegionCard({ region, index }) {
  const Icon = region.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.5 }}
      whileHover={{ y: -6 }}
      className="gp-card"
    >
      <div className="gp-card-header">
        <div className="gp-card-icon">
          <Icon size={16} />
        </div>
        <h4>{region.title}</h4>
      </div>

      <div className="gp-card-countries">
        {region.countries.map((country) => (
          <span key={country} className="country-tag">
            {country}
          </span>
        ))}
      </div>
    </motion.div>
  );
}