import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "lenis/dist/lenis.css";
import "swiper/css/bundle";
import "./styles/reference.css";
import "./styles/interactions.css";
import "./styles/app.css";
import "./styles/studio.css";

document.documentElement.classList.add("w-mod-js");
if ("ontouchstart" in window)
  document.documentElement.classList.add("w-mod-touch");

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
