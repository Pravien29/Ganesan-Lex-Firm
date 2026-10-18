import React from "react";
import { Routes, Route } from "react-router-dom";

// import Header from "./Header";
import Footer from "./Component/Footer";
import ScrollToHash from "./Component/Scrolltohash";
import Header from "./Component/Header";
import Slide from "./Component/Slide";       // Home page
import About from "./Component/About";
import Service from "./Component/Service";
import Contact from "./Component/Contact";
import { ImOpt } from "react-icons/im";
import Career from "./Component/Career";

// NOTE: adjust the import paths/names above to match your project.
// BrowserRouter is already in main.jsx, so it is NOT repeated here.

function App() {
  return (
    <>
      <Header />
      <ScrollToHash />

      <Routes>
        <Route path="/" element={<Slide />} />
        <Route path="/about" element={<About />} />
        <Route path="/service" element={<Service />} />
        <Route path="/contact" element={<Contact />} />
                <Route path="/career" element={<Career />} />

      </Routes>

      <Footer />
    </>
  );
}

export default App;