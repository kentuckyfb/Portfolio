import Link from 'next/link';
import { Home, Info, ContactMail, Work, RadarRounded, Menu } from '@mui/icons-material';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ scrollToSection, refs }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuVariants = {
    open: { opacity: 1, y: 0, display: 'flex' },
    closed: { opacity: 0, y: -20, display: 'none' },
  };

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 backdrop-blur-md shadow-lg rounded-full z-50 border border-gray-800 w-11/12 max-w-4xl">
      <div className="container mx-auto flex justify-between items-center p-3">
        {/* Logo on the left */}
        <Link href="/" className="text-xl font-bold text-white font-poppins">
          KentuckyFB
        </Link>

        {/* Hamburger menu for small screens */}
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="text-gray-300 hover:text-white focus:outline-none">
            <Menu />
          </button>
        </div>

        {/* Navigation items on the right */}
        <AnimatePresence>
          {isMenuOpen ? (
            <motion.ul
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="flex flex-col absolute top-[calc(100%+8px)] left-0 w-full bg-black bg-opacity-80 backdrop-blur-md border border-gray-800 rounded-b-2xl p-4 space-y-4 lg:hidden" // Added lg:hidden here
            >
              {/* ... (Navigation items - same as before) ... */}
              <li>
                <div
                  onClick={() => {
                    scrollToSection(refs.homeRef);
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center text-gray-300 hover:text-white transition-colors font-poppins"
                >
                  <Home className="mr-2" /> Home
                </div>
              </li>
              <li>
                <div
                  onClick={() => {
                    scrollToSection(refs.aboutRef);
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center text-gray-300 hover:text-white transition-colors font-poppins"
                >
                  <Info className="mr-2" /> About
                </div>
              </li>
              <li>
                <div
                  onClick={() => {
                    scrollToSection(refs.workRef);
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center text-gray-300 hover:text-white transition-colors font-poppins"
                >
                  <Work className="mr-2" /> Work
                </div>
              </li>
              <li>
                <div
                  onClick={() => {
                    scrollToSection(refs.workRef);
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center text-gray-300 hover:text-white transition-colors font-poppins"
                >
                  <RadarRounded className="mr-2" /> Skills
                </div>
              </li>
              <li>
                <div
                  onClick={() => {
                    scrollToSection(refs.contactRef);
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center text-gray-300 hover:text-white transition-colors font-poppins"
                >
                  <ContactMail className="mr-2" /> Contact
                </div>
              </li>
            </motion.ul>
          ) : (
            <ul className="hidden lg:flex space-x-8">
              <li>
                <div
                  onClick={() => scrollToSection(refs.homeRef)}
                  className="flex items-center text-gray-300 hover:text-white transition-colors font-poppins"
                >
                  <Home className="mr-2" /> Home
                </div>
              </li>
              <li>
                <div
                  onClick={() => scrollToSection(refs.aboutRef)}
                  className="flex items-center text-gray-300 hover:text-white transition-colors font-poppins"
                >
                  <Info className="mr-2" /> About
                </div>
              </li>
              <li>
                <div
                  onClick={() => scrollToSection(refs.workRef)}
                  className="flex items-center text-gray-300 hover:text-white transition-colors font-poppins"
                >
                  <Work className="mr-2" /> Work
                </div>
              </li>
              <li>
                <div
                  onClick={() => scrollToSection(refs.workRef)}
                  className="flex items-center text-gray-300 hover:text-white transition-colors font-poppins"
                >
                  <RadarRounded className="mr-2" /> Skills
                </div>
              </li>
              <li>
                <div
                  onClick={() => scrollToSection(refs.contactRef)}
                  className="flex items-center text-gray-300 hover:text-white transition-colors font-poppins"
                >
                  <ContactMail className="mr-2" /> Contact
                </div>
              </li>
            </ul>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;