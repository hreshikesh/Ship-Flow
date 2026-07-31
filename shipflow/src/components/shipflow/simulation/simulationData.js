import basicImage from "../../../assets/images/simulation/basic.png"
import motionImage from "../../../assets/images/simulation/motion.png"
import ransImage from "../../../assets/images/simulation/rans.png"
import {
  Waves,
  ShipWheel,
  Orbit,
} from "lucide-react";

export const simulationModules = [
  {
    id: 1,
    title: "BASIC",
    subtitle: "Potential Flow Solver",
    icon: Waves,

    image: basicImage,

    result: "10–120 Seconds",

    points: [
      "Wave Pattern",
      "Wave Resistance",
      "Sinkage",
      "Trim",
    ],

    button: "Learn More",
  },

  {
    id: 2,
    title: "RANS",
    subtitle: "RANS CFD Solver",
    icon: ShipWheel,

    image: ransImage,

    result: "15–20 Minutes",

    points: [
      "Total Resistance",
      "Self Propulsion",
      "Free Surface Flow",
    ],

    button: "Learn More",
  },

  {
    id: 3,
    title: "MOTIONS",
    subtitle: "Time Dependent Solver",
    icon: Orbit,

    image: motionImage,

    result: "3–4 Hours",

    points: [
      "Seakeeping",
      "Added Resistance",
      "Wind Assisted Ships",
    ],

    button: "Learn More",
  },
];