import { useRef } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import BackToTop from "./components/BackToTop";
import AboutSection from "./components/AboutSection";
import WorkTechSection from "./components/Work";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export default function Home() {
  const aboutRef = useRef(null);
  const workRef = useRef(null);
  const contactRef = useRef(null);
  const homeRef = useRef(null);

  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div>
      <Navbar scrollToSection={scrollToSection} refs={{ homeRef, aboutRef, workRef, contactRef }} />
      <section ref={homeRef}><HeroSection/></section>
      <BackToTop />
      <section ref={aboutRef}><AboutSection /></section>
      <section ref={workRef}><WorkTechSection /></section>
      <section ref={contactRef}><ContactSection /></section>
      <Footer scrollToSection={scrollToSection} refs={{ homeRef, aboutRef, workRef, contactRef }}/>
    </div>
  );
}
