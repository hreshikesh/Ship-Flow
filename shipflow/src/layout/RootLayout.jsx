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

const INTRO_KEY = "sandeb-marine-intro-seen";

/* ============================================================
   SCROLL TO TOP HELPER COMPONENT
============================================================ */
function ScrollToTop({ behavior = "smooth" }) {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If URL has an anchor hash (#section), let the browser scroll to that element
    if (hash) {
      const id = hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior });
        return;
      }
    }

    // Scroll to top of page on route change
    window.scrollTo({
      top: 0,
      left: 0,
      behavior,
    });
  }, [pathname, hash, behavior]);

  return null;
}

/* ============================================================
   MAIN ROOT LAYOUT
============================================================ */
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
      // 🔑 Left-side text is visible, right-side cards stay HIDDEN until user scrolls
      setArrivalState({
        loaderDone: true,
        phase: "ready",
        introVisible: false,
        textVisible: true,
        ctaVisible: true,
        navVisible: false,
        routeVisible: false, // Right-side cards only reveal on scroll
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

  // Page transition loader between route changes
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