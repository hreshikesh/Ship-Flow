// routes/router.jsx
import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import RootLayout from "../layout/RootLayout";
import ErrorOverlay from "../ErrorOverlay.jsx";
import ShipflowLoader from "../components/shipflow/arrival/ShipflowLoader.jsx";

// ✅ Lazy-loaded pages — each becomes a separate JS chunk
const Home = lazy(() => import("../pages/Home.jsx"));
// // const Products = lazy(() => import("../pages/Products.jsx"));
// const Services = lazy(() => import("../pages/Services.jsx"));
// const Resources = lazy(() => import("../pages/Resources.jsx"));
// const Support = lazy(() => import("../pages/Support.jsx"));
// const Company = lazy(() => import("../pages/Company.jsx"));
// const NotFound = lazy(() => import("../pages/NotFound.jsx"));

// ✅ Wrapper for suspense fallback
const withSuspense = (Component) => (
  <Suspense fallback={<ShipflowLoader/>}>
    <Component />
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorOverlay/>,
    children: [
      {
        index: true,
        element: withSuspense(Home),
      },
      {
        path: "home",
        element: withSuspense(Home),
      },
      // {
      //   path: "products",
      //   element: withSuspense(Products),
      // },
      // {
      //   path: "services",
      //   element: withSuspense(Services),
      // },
      // {
      //   path: "resources",
      //   element: withSuspense(Resources),
      // },
      // {
      //   path: "support",
      //   element: withSuspense(Support),
      // },
      // {
      //   path: "company",
      //   element: withSuspense(Company),
      // },
      // {
      //   path: "*",
      //   element: withSuspense(NotFound),
      // },
    ],
  },
]);