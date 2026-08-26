import { useEffect, useState, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import ShipflowMarineNav from "../components/navbar/ShipflowMarineNav";
import Footer from "../components/footer/Footer";
import ShipflowLoader from "../components/shipflow/arrival/ShipflowLoader.jsx";
import SimpleLoader from "../components/shipflow/arrival/SimpleLoader.jsx";
import {
  useArrivalState,
  setArrivalState,
} from "../components/shipflow/arrival/arrivalStore";
import WhatsAppButton from "../components/whatsappbutton/WhatsAppButton.jsx";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop.jsx";

const INTRO_KEY = "sandeb-marine-intro-seen";

export default function RootLayout() {
  const location = useLocation();
  const isHome = location.pathname === "/" || location.pathname === "/home";
  const { navVisible } = useArrivalState();

  const [showIntro, setShowIntro] = useState(() => {
    if (typeof window === "undefined") return false;
    const seen = sessionStorage.getItem(INTRO_KEY) === "1";
    return !seen && isHome;
  });

  const [routeLoading, setRouteLoading] = useState(false);
  const isFirstMount = useRef(true);

  // Synchronize state cleanly whenever the user changes routes
  useEffect(() => {
    if (showIntro) return;

    if (isHome) {
      // 🔑 When arriving at Home from any route:
      // - textVisible: true (Left side text shows immediately)
      // - routeVisible: false (Right side cards stay HIDDEN until you scroll!)
      // - heroComplete: false (Hero stage is active)
      setArrivalState({
        loaderDone: true,
        phase: "ready",
        introVisible: false,
        textVisible: true,
        ctaVisible: true,
        navVisible: false,
        routeVisible: false, // 👈 Ensures right-side items only appear on scroll
        heroComplete: false,
      });
    } else {
      // Non-home pages (SHIPFLOW, CAESES, etc.)
      setArrivalState({
        loaderDone: true,
        phase: "ready",
        navVisible: true,
      });
    }
  }, [location.pathname, isHome, showIntro]);

  // Crisp page transitions between routes without loader flashing on initial load
  useEffect(() => {
    if (showIntro) return;

    // Skip loader on first mount
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    setRouteLoading(true);
    const timer = setTimeout(() => {
      setRouteLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [location.pathname, showIntro]);

  const handleIntroComplete = () => {
    sessionStorage.setItem(INTRO_KEY, "1");
    setShowIntro(false);
    setArrivalState({
      loaderDone: true,
      phase: "ready",
      introVisible: false,
      textVisible: true,
      ctaVisible: true,
      navVisible: false,
      routeVisible: false,
      heroComplete: false,
    });
  };

  const showNav = isHome ? navVisible && !showIntro : !showIntro;
  const contentReady = !showIntro && !routeLoading;

  return (
    <>
      <ScrollToTop behavior="smooth" />

      {/* Intro loader only on first-ever site visit */}
      {showIntro && <ShipflowLoader onComplete={handleIntroComplete} />}

      {/* Transition loader between page navigations */}
      {!showIntro && routeLoading && <SimpleLoader />}

      <div
        className={
          contentReady
            ? "opacity-100 transition-opacity duration-300 ease-out"
            : "pointer-events-none opacity-0"
        }
      >
        <ShipflowMarineNav visible={showNav} solid={!isHome || navVisible} />
        <Outlet />
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
}