import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Demo } from "./pages/Demo/Demo";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Demo name="Lada" />
  </StrictMode>,
);
