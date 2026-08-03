
import { RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { router } from "./routes/router";
import { useShipflowScroll } from "./hooks/useShipflowScroll";

export default function App() {
  useShipflowScroll();

  return (
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  );
}