import { Button, Container, Typography, Paper } from '@mui/material';
import HeroSection from './components/HeroSection';
import BackToTop from './components/BackToTop';
import GithubCommits
 from './components/GithubCommit';
import AboutSection from './components/AboutSection';
import WorkTechSection from './components/Work';
import ContactSection from './components/ContactSection';
export default function Home() {
  return (
    <div>
    <HeroSection />
    <BackToTop />
    <AboutSection />
    <WorkTechSection />
    <ContactSection />
    {/* Add other sections here later */}
  </div>
  );
}