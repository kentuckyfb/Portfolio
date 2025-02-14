import Link from 'next/link';
import { GitHub, LinkedIn, Twitter, Email, Phone } from '@mui/icons-material'; // Social media icons
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-black bg-opacity-80 backdrop-blur-md border-t border-gray-800 rounded-t-3xl mt-16 py-12 mx-auto max-w-8xl w-11/12">
      <div className="container mx-auto px-6 flex flex-col lg:flex-row justify-between items-start space-y-8 lg:space-y-0">
        {/* Left Section: About Me with Rounded Picture */}
        <div className="flex flex-col items-center lg:items-start space-y-4">
          <div className="relative w-24 h-24 rounded-full overflow-hidden">
            <Image
              src="/pp.jpg" // Replace with your image path
              alt="Your Name"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <p className="text-gray-300 text-center lg:text-left font-poppins">
            Hi, I’m [Your Name].<br></br> I’m a developer passionate about building cool stuff.
          </p>
        </div>

        {/* Middle Section: Navigation Links */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-white font-poppins font-semibold text-lg">Navigation</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="text-gray-300 hover:text-white transition-colors font-poppins">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-gray-300 hover:text-white transition-colors font-poppins">
                About
              </Link>
            </li>
            <li>
              <Link href="/projects" className="text-gray-300 hover:text-white transition-colors font-poppins">
                Projects
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-gray-300 hover:text-white transition-colors font-poppins">
                Contact
              </Link>
            </li>
          </ul>
        </div>


        {/* Right Section: Contact Information */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-white font-poppins font-semibold text-lg">Contact</h3>
          <ul className="space-y-2">
            <li>
              <a href="tel:+92784201964" className="flex items-center text-gray-300 hover:text-white transition-colors font-poppins">
                <Phone className="mr-2" /> +92 78 420 1964
              </a>
            </li>
            <li>
              <a href="mailto:codewithshabbir07@gmail.com" className="flex items-center text-gray-300 hover:text-white transition-colors font-poppins">
                <Email className="mr-2" /> nathanhimesh5@gmail.com
              </a>
            </li>
            <li>
              <p className="text-gray-300 font-poppins">Colombo, Sri Lanka</p>
            </li>
          </ul>
        </div>

        {/* Social Media Icons Section */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-white font-poppins font-semibold text-lg">Follow Me</h3>
          <div className="flex space-x-4">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors"
            >
              <GitHub className="text-white" />
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors"
            >
              <LinkedIn className="text-white" />
            </a>
            <a
              href="https://twitter.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors"
            >
              <Twitter className="text-white" />
            </a>
            <a
              href="mailto:codewithshabbir07@gmail.com"
              className="flex items-center justify-center w-10 h-10 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors"
            >
              <Email className="text-white" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="border-t border-gray-800 mt-8 pt-6 text-center">
        <p className="text-gray-400 font-poppins">
          &copy; {new Date().getFullYear()} [Your Name]. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;