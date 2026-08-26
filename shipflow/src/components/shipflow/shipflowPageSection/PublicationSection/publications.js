import oceanpdf from "../../../../assets/pdf/Ocean Engineering .pdf";
import computationpdf from "../../../../assets/pdf/Computation-of-Hydrodynamic.pdf";

export const publications = [
  {
    id: 1,
    title: "Validation of full-scale delivered power CFD simulations",
    description:
      "Verification and Validation of CFD simulations of delivered power at full-scale are carried out for a single screw cargo vessel. Numerical simulations are performed with a steady-state RANS method coupled with a body force propeller model based on a lifting line theory.",
    link: oceanpdf,
    type: "pdf",
  },
  {
    id: 2,
    title:
      "CFD simulations of steady drift and yaw motions in deep and shallow water",
    description:
      "In this paper, computational fluid dynamics (CFD) simulation of steady ship motions at different drift angles, yaw rates, rudder angles, and their combinations are carried out for KRISO Very Large Crude Carrier 2 (KVLCC2) tanker ship. The simulations are conducted with the commercial steady state Reynolds averaged Navier-Stokes (RANS) flow solver SHIPFLOW®. The hydrodynamic forces in horizontal plane and the moment around the vertical axis acting on the ship are determined in deep- and shallow water. Resulting forces and moment are compared to experimental data found in literature. Influence of the water depth is shown with the forces and moment, with the velocity and the turbulent kinetic energy behind the ship and with the pressure distribution on the hull.",
    link: "https://www.sciencedirect.com/getaccess/pii/S0029801817303621/purchase",
    type: "link",
  },
  {
    id: 3,
    title:
      "Computation of Hydrodynamic Characteristics of Ships Using CFD, M. M. Karim and N. Naz",
    description:
      "This paper investigates various hydrodynamic characteristics of two conventional ships namely Wigley hull and Series 60 ship by commercial CFD software named Shipflow.",
    link: computationpdf,
    type: "pdf",
  },
];