
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home.jsx";
import Loader from "../sections/loader/Loader.jsx";
// import Products from "../pages/Products";
// import Services from "../pages/Services";
// import Resources from "../pages/Resources";
// import Support from "../pages/Support";
// import Company from "../pages/Company";

export const router = createBrowserRouter([

  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "home",
        element: <Home />,
      },
    //   {
    //     path: "products",
    //     element: <Products />,
    //   },
    //   {
    //     path: "services",
    //     element: <Services />,
    //   },
    //   {
    //     path: "resources",
    //     element: <Resources />,
    //   },
    //   {
    //     path: "support",
    //     element: <Support />,
    //   },
    //   {
    //     path: "company",
    //     element: <Company />,
    //   },
    ],
  },
]);