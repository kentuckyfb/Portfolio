import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaPython, FaDatabase, FaNodeJs, FaHtml5, FaCss3 } from 'react-icons/fa';
import { SiNextdotjs, SiJavascript, SiTypescript } from 'react-icons/si';

const WorkTechSection = () => {
  const [view, setView] = useState('work'); // 'work' or 'tech'

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="h-screen w-full flex items-center justify-center bg-dark-black py-16 px-8 lg:px-16">
      <div className="container mx-auto max-w-6xl">
        {/* Glassmorphism Box */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="bg-dark-gray bg-opacity-50 backdrop-blur-md rounded-2xl p-8 border border-gray-800 shadow-lg"
        >
          {/* Toggle Buttons */}
          <div className="flex justify-end space-x-4 mb-8">
            <button
              onClick={() => setView('work')}
              className={`px-6 py-2 rounded-lg font-poppins font-semibold transition-all ${
                view === 'work'
                  ? 'bg-dark-orange text-white'
                  : 'bg-dark-gray text-gray-300 hover:bg-dark-orange hover:text-white'
              }`}
            >
              Work History
            </button>
            <button
              onClick={() => setView('tech')}
              className={`px-6 py-2 rounded-lg font-poppins font-semibold transition-all ${
                view === 'tech'
                  ? 'bg-dark-orange text-white'
                  : 'bg-dark-gray text-gray-300 hover:bg-dark-orange hover:text-white'
              }`}
            >
              Tech Stack
            </button>
          </div>

          {/* Content */}
          {view === 'work' ? (
            <WorkHistory />
          ) : (
            <TechStack />
          )}
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
        title: 'Frontend Developer',
        description: 'Worked on building responsive and user-friendly web applications using React and Next.js.',
        timeline: '2021 - Present',
      },
      {
        title: 'Backend Developer',
        description: 'Developed REST APIs and managed databases using Python and SQL.',
        timeline: '2019 - 2021',
      },
      {
        title: 'Freelance Developer',
        description: 'Collaborated with clients to deliver custom web solutions.',
        timeline: '2017 - 2019',
      },
    ];
  
    return (
      <div className="space-y-8">
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
              <h3 className="text-2xl font-poppins font-bold text-white">{work.title}</h3>
              <p className="text-gray-300 font-poppins">{work.description}</p>
              <p className="text-gray-400 font-poppins mt-2">{work.timeline}</p>
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
            href="/path-to-your-cv.pdf" // Replace with the path to your CV
            download="YourName_CV.pdf" // Replace with your desired file name
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
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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

export default WorkTechSection;