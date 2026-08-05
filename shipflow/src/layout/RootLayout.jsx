import { Outlet, useLocation } from "react-router-dom";
import ShipflowMarineNav from "../components/navbar/ShipflowMarineNav";
import { useArrivalState } from "../components/shipflow/arrival/arrivalStore";
import Footer from "../components/footer/Footer";
import FloatingAI from "../components/chatbot/FloatingAI";

export default function RootLayout() {
  const location = useLocation();
  const isHome = location.pathname === "/" || location.pathname === "/home";

  const { navVisible, loaderDone } = useArrivalState();

  
  const showNav = isHome ? navVisible : true;

  return (
    <>
      <ShipflowMarineNav visible={showNav} solid={!isHome || navVisible} />

      <Outlet />
      <FloatingAI/>
      <Footer/>
    </>
  );
}