import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import MiniappHome from "./pages/MiniappHome.jsx";
import Profile from "./pages/Profile.jsx";
import Activities from "./pages/Activities.jsx";
import Ranking from "./pages/Ranking.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />

      {/* Miniapp */}
      <Route path="/miniapp" element={<MiniappHome />} />
      <Route path="/miniapp/profile" element={<Profile />} />
      <Route path="/miniapp/activities" element={<Activities />} />
      <Route path="/miniapp/ranking" element={<Ranking />} />
    </Routes>
  </BrowserRouter>
);
