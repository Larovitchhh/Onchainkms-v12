import { BrowserRouter, Routes, Route } from "react-router-dom";
import Miniapp from "./pages/Miniapp.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/miniapp" element={<Miniapp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
