import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import DashboardPage from "./pages/DashboardPage";
import Features from "./pages/Features";
import About from "./pages/About";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/dashboard" element={<DashboardPage />} />

        <Route path="/features" element={<Features />} />

        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;