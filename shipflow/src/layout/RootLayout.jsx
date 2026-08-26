import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import ShipflowMarineNav from "../components/navbar/ShipflowMarineNav";
import Footer from "../components/footer/Footer";
import ShipflowLoader from "../components/shipflow/arrival/ShipflowLoader.jsx";
import SimpleLoader from "../components/shipflow/arrival/SimpleLoader.jsx";
import { useArrivalState, setArrivalState } from "../components/shipflow/arrival/arrivalStore";
import WhatsAppButton from "../components/whatsappbutton/WhatsAppButton.jsx";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop.jsx";
const INTRO_KEY = "sandeb-marine-intro-seen";

export default function RootLayout() {
  const location = useLocation();
  const isHome = location.pathname === "/" || location.pathname === "/home";
  const { navVisible, loaderDone } = useArrivalState();

  const [showIntro, setShowIntro] = useState(() => {
    if (typeof window === "undefined") return false;
    const seen = sessionStorage.getItem(INTRO_KEY) === "1";
    return !seen && isHome;
  });

  const [routeLoading, setRouteLoading] = useState(false);

  // If intro was already seen, force arrival store past the loader gate
  useEffect(() => {
    if (showIntro) return;
    if (!loaderDone) {
      setArrivalState({
        loaderDone: true,
        phase: "ready",       // or whatever your final phase is
        introVisible: false,
        textVisible: true,
        ctaVisible: true,
        navVisible: true,
        routeVisible: true,
        heroComplete: false,
      });
    }
  }, [showIntro, loaderDone]);

  // Short loader on route changes (not during first intro)
  useEffect(() => {
    if (showIntro) return;

    setRouteLoading(true);
    const t = setTimeout(() => setRouteLoading(false), 700);
    return () => clearTimeout(t);
  }, [location.pathname, showIntro]);

  const handleIntroComplete = () => {
    sessionStorage.setItem(INTRO_KEY, "1");
    setShowIntro(false);
  };

  const showNav = isHome ? navVisible && !showIntro : !showIntro;
  const contentReady = !showIntro && !routeLoading;

  return (
    <>
        <ScrollToTop behavior="smooth" />
      {showIntro && <ShipflowLoader onComplete={handleIntroComplete} />}

      {!showIntro && routeLoading && <SimpleLoader />}

      <div
        className={
          contentReady
            ? "opacity-100 transition-opacity duration-500"
            : "pointer-events-none opacity-0"
        }
      >
        <ShipflowMarineNav visible={showNav} solid={!isHome || navVisible} />
        <Outlet />
        <Footer />
        <WhatsAppButton/>
      </div>
    </>
  );
}