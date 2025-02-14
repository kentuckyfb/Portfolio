import Link from 'next/link';
import { Home, Info, ContactMail, Work, RadarRounded } from '@mui/icons-material'; // Import icons

const Navbar = () => {
  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 backdrop-blur-md shadow-lg rounded-full z-50 border border-gray-800 w-11/12 max-w-4xl">
      <div className="container mx-auto flex justify-between items-center p-3">
        {/* Logo on the left */}
        <Link href="/" className="text-xl font-bold text-white font-poppins">
          KentuckyFB
        </Link>

        {/* Navigation items on the right, pushed towards the middle */}
        <ul className="flex space-x-8">
          <li>
            <Link href="/" className="flex items-center text-gray-300 hover:text-white transition-colors font-poppins">
              <Home className="mr-2" /> Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="flex items-center text-gray-300 hover:text-white transition-colors font-poppins">
              <Info className="mr-2" /> About
            </Link>
          </li>
          <li>
            <Link href="/projects" className="flex items-center text-gray-300 hover:text-white transition-colors font-poppins">
              <Work className="mr-2" /> Projects
            </Link>
          </li>
          <li>
            <Link href="/contact" className="flex items-center text-gray-300 hover:text-white transition-colors font-poppins">
              <RadarRounded className="mr-2" /> Skills
            </Link>
          </li>
          <li>
            <Link href="/contact" className="flex items-center text-gray-300 hover:text-white transition-colors font-poppins">
              <ContactMail className="mr-2" /> Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;