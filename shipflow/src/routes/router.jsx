import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import RootLayout from "../layout/RootLayout";
import ErrorOverlay from "../ErrorOverlay.jsx";

const Home = lazy(() => import("../pages/Home.jsx"));
const Shipflow = lazy(() => import("../pages/Shipflow.jsx"));
// const Caeses = lazy(() => import("../pages/Caeses.jsx"));
// const NotFound = lazy(() => import("../pages/Marine404.jsx"));

const PageFallback = () => (
  <div className="fixed inset-0 z-[100] bg-[#02070d]" />
);

const withSuspense = (Component) => (
  <Suspense fallback={<PageFallback />}>
    <Component />
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorOverlay />,
    children: [
      { index: true, element: withSuspense(Home) },
      { path: "home", element: withSuspense(Home) },
      { path: "shipflow", element: withSuspense(Shipflow) },
      // { path: "caeses", element: withSuspense(Caeses) },
      // { path: "*", element: withSuspense(NotFound) },
    ],
  },
]);