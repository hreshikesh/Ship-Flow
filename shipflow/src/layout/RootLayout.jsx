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
   SCROLL TO TOP HELPER (Only resets on hard pathname changes)
============================================================ */
function ScrollToTop() {
  const { pathname } = useLocation();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    // 🔑 Only reset Y-scroll to 0 if we navigated to a completely different page.
    // This ignores internal hashes/scrolling so the Y=0 start state remains pristine.
    if (prevPathname.current !== pathname) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
    }
    prevPathname.current = pathname;
  }, [pathname]);

  return null;
}

/* ============================================================
   MAIN ROOT LAYOUT
============================================================ */
export default function RootLayout() {
  const location = useLocation();
  const isHome = location.pathname === "/" || location.pathname === "/home";
  const { navVisible } = useArrivalState();

  // Main loader ONLY runs once on initial website arrival if landing on Home
  const [showIntro, setShowIntro] = useState(() => {
    if (typeof window === "undefined") return false;
    const seen = sessionStorage.getItem(INTRO_KEY) === "1";
    
    if (!seen && !isHome) {
      sessionStorage.setItem(INTRO_KEY, "1");
      return false;
    }

    return !seen && isHome;
  });

  const [routeLoading, setRouteLoading] = useState(false);
  const prevPathname = useRef(location.pathname);

  // Synchronize starting state values on route change
  useEffect(() => {
    if (showIntro) return;

    if (isHome) {
      // 🔑 Home Start State:
      // - introVisible: true (Only the logo and "By Naval Architects" show initially)
      // - textVisible: false, routeVisible: false (Everything else hidden until scroll)
      setArrivalState({
        loaderDone: true,
        phase: "ready",
        introVisible: true,  // 👈 brand logo intro starts as visible
        textVisible: false,  // 👈 main text stays hidden
        ctaVisible: false,
        navVisible: false,
        routeVisible: false, // 👈 right side cards stay hidden
        heroComplete: false,
      });
    } else {
      // Sub-pages (SHIPFLOW, CAESES, etc.)
      sessionStorage.setItem(INTRO_KEY, "1");
      setArrivalState({
        loaderDone: true,
        phase: "ready",
        navVisible: true,
      });
    }
  }, [location.pathname, isHome, showIntro]);

  // Handle route transition loader cleanly
  useEffect(() => {
    if (showIntro) return;

    const from = prevPathname.current;
    const to = location.pathname;

    const isDeepTransition =
      (from === "/shipflow" || from === "/caeses" || to === "/shipflow" || to === "/caeses") &&
      (from !== to);

    if (isDeepTransition) {
      setRouteLoading(true);
      const timer = setTimeout(() => {
        setRouteLoading(false);
      }, 400);

      prevPathname.current = to;

      return () => {
        clearTimeout(timer);
        setRouteLoading(false);
      };
    } else {
      setRouteLoading(false);
    }

    prevPathname.current = to;
  }, [location.pathname, showIntro]);

  const handleIntroComplete = () => {
    sessionStorage.setItem(INTRO_KEY, "1");
    setShowIntro(false);
    setArrivalState({
      loaderDone: true,
      phase: "ready",
      introVisible: true,  // Show brand intro logo first
      textVisible: false,
      ctaVisible: false,
      navVisible: false,
      routeVisible: false,
      heroComplete: false,
    });
  };

  const showNav = isHome ? navVisible && !showIntro : !showIntro;
  const contentReady = !showIntro && !routeLoading;

  return (
    <>
      <ScrollToTop />

      {/* Main Loader — ONLY for initial website arrival */}
      {showIntro && <ShipflowLoader onComplete={handleIntroComplete} />}

      {/* Simple Loader — ONLY for transitions between deep sub-pages */}
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