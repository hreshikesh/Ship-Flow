import { Outlet, useLocation } from "react-router-dom";
import ShipflowMarineNav from "../components/shipflow/navbar/ShipflowMarineNav";
import { useArrivalState } from "../components/shipflow/arrival/arrivalStore";

export default function RootLayout() {
  const location = useLocation();
  const isHome = location.pathname === "/" || location.pathname === "/home";

  const { navVisible, loaderDone } = useArrivalState();

  /*
    Home:
    navbar appears after scroll, controlled by ArrivalRuntime.

    Other pages:
    navbar is always visible.
  */
  const showNav = isHome ? navVisible : true;

  return (
    <>
      <ShipflowMarineNav visible={showNav} solid={!isHome || navVisible} />

      <Outlet />
    </>
  );
}