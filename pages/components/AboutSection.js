import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const projects = [
    {
        id: 1,
        title: "SightGuard",
        description: "AI model detects diabetic retinopathy from eye images with 76% accuracy. Still in development.",
        date: "July 2024",
        repoLink: "https://github.com/kentuckyfb/SightGuard",
        videoUrl: "https://www.youtube.com/watch?v=K8veqjOV52w", // Replace with actual YouTube video ID
    },
    {
        id: 2,
        title: "Tweak-Ing",
        description: "Chrome extension injects custom JS/CSS for client-side web scraping. Define scraping logic via scripts to extract website data efficiently.",
        date: "January 2025",
        repoLink: "https://github.com/kentuckyfb/TweakIng",
        videoUrl: "https://www.youtube.com/watch?v=-_U9vF55YJo",
    },
    {
        id: 3,
        title: "Web Sight",
        description: "Web scraping bot automates data extraction from websites.  It gathers targeted information for analysis, research, or other uses, saving time and effort.",
        date: "June 2024",
        repoLink: "https://github.com/kentuckyfb/WebSight",
        videoUrl: "https://www.youtube.com/watch?v=ao9IzQWBemg",
    },
];

const AboutSection = () => {
    const [selectedProject, setSelectedProject] = useState(null);

    const fadeInUp = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeInOut" } },
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };

    return (
        <section className=" w-full flex items-center justify-center bg-dark-black py-16 px-8 lg:px-16 ">
            <div className="container mx-auto max-w-5xl flex flex-col lg:flex-row items-center justify-center gap-12 ">
                {/* Profile Card */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="w-full lg:w-auto max-w-sm lg:max-w-md max-h-[30rem] lg:max-h-[40rem] bg-dark-gray bg-opacity-50 backdrop-blur-md rounded-2xl p-6 lg:p-4 border border-gray-800 shadow-lg"
                >
                    <div className="flex flex-col items-center space-y-6 lg:space-y-3">
                        <div className="relative w-32 h-32 lg:w-40 lg:h-40 rounded-lg overflow-hidden">
                            <Image src="/pp.jpg" alt="Your Name" layout="fill" objectFit="cover" />
                        </div>
                        <div className="text-center">
                            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-2xl font-poppins font-bold text-white mb-4">Personal Details</h3>
                            <ul className="space-y-2 text-gray-300 font-poppins w-full text-sm sm:text-base md:text-1xl ">
                                <li className="flex justify-between"><span><strong>Age:</strong></span><span>22</span></li>
                                <li className="flex justify-between"><span><strong>Birthday:</strong></span><span>January 2, 2003</span></li>
                                <li className="flex justify-between"><span><strong>Country:</strong></span><span>Sri Lanka</span></li>
                                <li className="flex justify-between"><span><strong>Email:</strong></span><span>nathanhimesh5@gmail.com</span></li>
                            </ul>
                        </div>
                    </div>
                </motion.div>

                {/* Projects Section */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="w-full lg:w-auto space-y-8">
                    <h2 className="text-4xl sm:text-4xl md:text-5xl lg:text-5xl 2xl:text-7xl font-poppins font-bold text-white text-center lg:text-left">Recent <br /> Projects</h2>
                    <div className="space-y-2 ">
                        {projects.map((project) => (
                            <motion.div
                                key={project.id}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeInUp}
                                className="bg-dark-gray bg-opacity-50 backdrop-blur-md rounded-2xl p-6 border border-gray-800 shadow-lg cursor-pointer transition-transform duration-300 hover:scale-105 max-w-md lg:max-w-lg lg:max-h-[30rem] xl:max-w-xl xl:max-h-[36rem]"
                                onClick={() => setSelectedProject(project)}
                            >
                                <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-6 transition-transform duration-300 hover:scale-105">
                                    <div className="relative w-24 h-24 lg:w-32 lg:h-32 rounded-lg overflow-hidden ">
                                        <Image src={`/project${project.id}.png`} alt={`Project ${project.id}`} layout="fill" objectFit="cover" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl md:text-2xl lg:text-lg font-poppins font-bold text-white mb-2"> {project.title}</h3>
                                        <p className="text-sm md:text-base lg:text-sm text-gray-300 font-poppins">
                                            {project.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Modal Popup */}
            {selectedProject && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-lg z-50">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="bg-dark-gray bg-opacity-90 p-8 rounded-2xl shadow-xl max-w-3xl w-full flex flex-col lg:flex-row items-center"
                    >
                        {/* Video */}
                        <div className="w-full lg:w-1/2 h-64 rounded-lg overflow-hidden">
                            <iframe
                                className="w-full h-full rounded-lg"
                                src={selectedProject.videoUrl}
                                title={selectedProject.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                        {/* Project Details */}
                        <div className="w-full lg:w-1/2 p-6">
                            <h3 className="text-3xl font-bold text-white mb-4">{selectedProject.title}</h3>
                            <p className="text-gray-300 mb-4">{selectedProject.description}</p>
                            <p className="text-gray-400 mb-2"><strong>Date:</strong> {selectedProject.date}</p>
                            <a
                                href={selectedProject.repoLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:underline"
                            >
                                View Repository
                            </a>
                        </div>
                        {/* Close Button */}
                        <button
                            className="absolute top-4 right-4 text-white text-xl cursor-pointer hover:text-gray-400"
                            onClick={() => setSelectedProject(null)}
                        >
                            <X size={30} />
                        </button>
                    </motion.div>
                </div>
            )}
        </section>
    );
};

export default AboutSection;