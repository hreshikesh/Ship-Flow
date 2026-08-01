import { services } from "./services";
import ServiceCard from "./ServiceCard";

function ServiceGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 
    sm:grid-cols-2 sm:gap-6 
    lg:grid-cols-3 lg:gap-7 
    xl:gap-8">
      {services.map((service, index) => (
        <ServiceCard
          key={service.title}
          service={service}
          index={index}
        />
      ))}
    </div>
  );
}

export default ServiceGrid;