// src/layout/RootLayout.jsx
import { useEffect, useState, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import ShipflowMarineNav from "../components/navbar/ShipflowMarineNav";
import Footer from "../components/footer/Footer";
import ShipflowLoader from "../components/shipflow/arrival/ShipflowLoader.jsx";
import { useArrivalState, setArrivalState } from "../components/shipflow/arrival/arrivalStore";
import WhatsAppButton from "../components/whatsappbutton/WhatsAppButton.jsx";

const INTRO_KEY = "sandeb-marine-intro-seen";

function ScrollToTop() {
  const { pathname } = useLocation();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    if (prevPathname.current !== pathname) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
    prevPathname.current = pathname;
  }, [pathname]);

  return null;
}

export default function RootLayout() {
  const location = useLocation();
  const isHome = location.pathname === "/" || location.pathname === "/home";
  const { navVisible } = useArrivalState();

  const [showIntro, setShowIntro] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      const seen = sessionStorage.getItem(INTRO_KEY) === "1";
      if (!isHome) {
        if (!seen) sessionStorage.setItem(INTRO_KEY, "1");
        return false;
      }
      return !seen;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (showIntro) return;

    if (isHome) {
      setArrivalState({
        loaderDone: true,
        phase: "ready",
        introVisible: true,
        textVisible: false,
        ctaVisible: false,
        navVisible: false,
        routeVisible: false,
        heroComplete: false,
      });
    } else {
      try {
        sessionStorage.setItem(INTRO_KEY, "1");
      } catch {}
      setArrivalState({
        loaderDone: true,
        phase: "ready",
        navVisible: true,
        heroComplete: true,
        introVisible: false,
      });
    }
  }, [location.pathname, isHome, showIntro]);

  const handleIntroComplete = () => {
    try {
      sessionStorage.setItem(INTRO_KEY, "1");
    } catch {}
    setShowIntro(false);
    setArrivalState({
      loaderDone: true,
      phase: "ready",
      introVisible: true,
      textVisible: false,
      ctaVisible: false,
      navVisible: false,
      routeVisible: false,
      heroComplete: false,
    });
  };

  const showNav = isHome ? navVisible && !showIntro : !showIntro;

  return (
    <div className="min-h-screen bg-[#02070d] text-white">
      <ScrollToTop />

      {/* Intro Loader overlay (Only on first home visit) */}
      {showIntro && <ShipflowLoader onComplete={handleIntroComplete} />}

      {/* Main app content — always mounted safely underneath */}
      <ShipflowMarineNav visible={showNav} solid={!isHome || navVisible} />
      <Outlet />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}