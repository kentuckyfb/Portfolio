import { useRef } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import BackToTop from "./components/BackToTop";
import AboutSection from "./components/AboutSection";
import WorkTechSection from "./components/Work";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import GitHubActivity from "./components/GitHubActivity";

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
      <section ref={homeRef}>
        <HeroSection scrollToSection={scrollToSection} refs={{ aboutRef, contactRef }} />
      </section>
      <BackToTop />
      <section ref={aboutRef}><AboutSection /></section>
      <GitHubActivity username="kentuckyfb" />
      <section ref={workRef}><WorkTechSection /></section>
      <section ref={contactRef}><ContactSection /></section>
      <Footer scrollToSection={scrollToSection} refs={{ homeRef, aboutRef, workRef, contactRef }} />
    </div>
  );
};