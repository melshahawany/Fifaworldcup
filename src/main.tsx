import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { registerSW } from "virtual:pwa-register";
import WorldCupTracker from "./App";
import "./styles.css";

const updateServiceWorker = registerSW({
  immediate: true,
  onNeedRefresh() {
    void updateServiceWorker(true);
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WorldCupTracker />
  </StrictMode>,
);
