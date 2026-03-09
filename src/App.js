import React, { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Masters from "./pages/Masters";
import Subscriptions from "./pages/Subscriptions";
import Certificates from "./pages/Certificates";
import About from "./pages/About";

// Component to scroll to top on route change
function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    // Only scroll to top if there's no hash (anchor link)
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return null;
}

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/masters" element={<Masters />} />
            <Route path="/subscriptions" element={<Subscriptions />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/about" element={<About />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
