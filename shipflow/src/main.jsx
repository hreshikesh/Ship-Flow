import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import "./styles/globals.css";

const root = document.getElementById("root");

if (!root) {
  document.body.innerHTML =
    '<div style="padding:40px;font-family:sans-serif;background:#111;color:#f66">NO #root ELEMENT</div>';
} else {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}