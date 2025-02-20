import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaPython, FaDatabase, FaNodeJs, FaHtml5, FaCss3 } from 'react-icons/fa';
import { SiNextdotjs, SiJavascript, SiTypescript } from 'react-icons/si';
import {
  FaBriefcase,
  FaCode,
  FaGraduationCap,
  FaLaptopCode,
  FaTools,
  FaSchool,
} from 'react-icons/fa';

const WorkTechSection = () => {
  const [view, setView] = useState('work'); // 'work' or 'tech'

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };
  const variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <section className=" w-full flex items-center justify-center bg-dark-black py-16 px-8 lg:px-16">
      <div className="container mx-auto max-w-sm md:max-w-2xl lg:max-w-3xl xl:max-w-6xl">
        {/* Glassmorphism Box */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="bg-dark-gray bg-opacity-50 backdrop-blur-md rounded-2xl p-4 border border-gray-800 shadow-lg"
        >
          {/* Toggle Buttons */}
          <div className="flex justify-end space-x-2 mb-6 sm:mb-8">
            <button
              onClick={() => setView('work')}
              className={`p-2 sm:px-6 sm:py-2 rounded-lg transition-all ${view === 'work'
                ? 'bg-dark-orange text-white'
                : 'bg-dark-gray text-gray-300 hover:bg-dark-orange hover:text-white'
                }`}
            >
              <span className="sm:hidden"><FaBriefcase size={20} /></span>
              <span className="hidden sm:inline font-poppins font-semibold">Work History</span>
            </button>
            <button
              onClick={() => setView('tech')}
              className={`p-2 sm:px-6 sm:py-2 rounded-lg transition-all ${view === 'tech'
                ? 'bg-dark-orange text-white'
                : 'bg-dark-gray text-gray-300 hover:bg-dark-orange hover:text-white'
                }`}
            >
              <span className="sm:hidden"><FaTools size={20} /></span>
              <span className="hidden sm:inline font-poppins font-semibold">Tech Stack</span>
            </button>
            <button
              onClick={() => setView('Education')}
              className={`p-2 sm:px-6 sm:py-2 rounded-lg transition-all ${view === 'Education'
                ? 'bg-dark-orange text-white'
                : 'bg-dark-gray text-gray-300 hover:bg-dark-orange hover:text-white'
                }`}
            >
              <span className="sm:hidden"><FaSchool size={20} /></span>
              <span className="hidden sm:inline font-poppins font-semibold">Education</span>
            </button>
          </div>
          {/* Content */}
          {view === 'work' ? (
            <WorkHistory />
          ) : view === 'tech' ? (
            <TechStack />
          ) : view === 'Education' ? ( // Added this line
            <Education />
          ) : null}
        </motion.div>
      </div>
    </section>
  );
};

const WorkHistory = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const workData = [
    {
      title: 'Atlas Axillia - Digital & Martech Executive',
      description: 'Managed CRM, website revamp, app development, and AI solutions. Used Google Analytics, Zoho CRM, MySQL, Postman.',
      timeline: 'July 2024 - Present', // You'll need to fill in the actual dates here
    },
    {
      title: 'Ninehermits - Game Developer',
      description: 'Developed 2D/3D web games with Unity and JavaScript. Assisted with blockchain NFT game and multiplayer mechanics.',
      timeline: 'Jan 2023 – Jul 2023', // You'll need to fill in the actual dates here
    },
    {
      title: 'GIGA FOODS - IT Operations & Front Office',
      description: 'Managed customer support, order logs, system updates, and sales reporting.',
      timeline: 'Jan 2022 – Dec 2022', // You'll need to fill in the actual dates here
    },
  ];

  return (
    <div className="space-y-4">
      {workData.map((work, index) => (
        <motion.div
          key={index}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="flex"
        >
          {/* Timeline Marker */}
          <div className="relative w-12 flex-shrink-0">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-dark-orange rounded-full"></div>
            {index !== workData.length - 1 && (
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-1 h-full bg-dark-orange"></div>
            )}
          </div>

          {/* Work Details */}
          <div className="flex-1 ml-4">
            <h3 className="xl:text-2xl md:text-base font-poppins font-bold text-white">{work.title}</h3>
            <p className="text-gray-300 xl:text-xl md:text-sm font-poppins">{work.description}</p>
            <p className="text-gray-400 xl:text-xl md:text-sm font-poppins mt-2">{work.timeline}</p>
          </div>
        </motion.div>
      ))}

      {/* Download CV Button */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="flex justify-center mt-8"
      >
        <a
          href="/CV - Nathan Himesh.pdf" // Replace with the path to your CV
          download="CV - Nathan Himesh" // Replace with your desired file name
          className="px-8 py-3 bg-dark-orange text-white font-poppins font-semibold rounded-lg hover:bg-opacity-90 hover:shadow-lg hover:shadow-dark-orange/50 transition-all"
        >
          Download CV
        </a>
      </motion.div>
    </div>
  );
};

// Tech Stack Component
const TechStack = () => {
  // Animation variants


  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };
  const techData = [
    { icon: <FaReact size={40} />, name: 'React' },
    { icon: <SiNextdotjs size={40} />, name: 'Next.js' },
    { icon: <FaPython size={40} />, name: 'Python' },
    { icon: <FaDatabase size={40} />, name: 'SQL' },
    { icon: <FaNodeJs size={40} />, name: 'Node.js' },
    { icon: <SiJavascript size={40} />, name: 'JavaScript' },
    { icon: <SiTypescript size={40} />, name: 'TypeScript' },
    { icon: <FaHtml5 size={40} />, name: 'HTML' },
    { icon: <FaCss3 size={40} />, name: 'CSS' },
  ];

  return (
    <div className="overflow-hidden grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {techData.map((tech, index) => (
        <motion.div
          key={index}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="flex flex-col items-center p-4 bg-dark-gray bg-opacity-50 rounded-lg hover:bg-opacity-70 transition-all"
        >
          <div className="text-dark-orange">{tech.icon}</div>
          <p className="text-white font-poppins mt-2">{tech.name}</p>
        </motion.div>
      ))}
    </div>
  );
};


const Education = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const educationData = [
    {
      title: 'BSc (Hons) Software Engineering (Second Class Honours)',
      institution: 'Universal College Lanka (UCL) - UCLAN',
      timeline: 'July 2024',
    },
    {
      title: 'Foundations Diploma for Higher Education Studies (Software Engineering)',
      institution: 'UCL - NCC Education',
      timeline: 'Jan 2022',
    },
    {
      title: 'Diploma in Hotel Management',
      institution: 'Swiss Lanka Hotel School',
      timeline: 'Jan 2021',
    },
    {
      title: 'Ordinary Level Examinations',
      institution: 'Wesley College, Borella',
      timeline: 'Jan 2019',
    },
  ];

  return (
    <div className="overflow-hidden space-y-8">
      {educationData.map((edu, index) => (
        <motion.div
          key={index}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="flex"
        >
          {/* Timeline Marker (same as WorkHistory) */}
          <div className="relative w-12 flex-shrink-0">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-dark-orange rounded-full"></div>
            {index !== educationData.length - 1 && (
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-1 h-full bg-dark-orange"></div>
            )}
          </div>

          {/* Education Details */}
          <div className="flex-1 ml-4">
            <h3 className="xl:text-2xl md:text-base font-poppins font-bold text-white">{edu.title}</h3>
            <p className="text-gray-300 xl:text-xl md:text-sm font-poppins">{edu.institution}</p>
            <p className="text-gray-300 xl:text-xl md:text-sm font-poppins">{edu.timeline}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default WorkTechSection;