import { motion } from 'framer-motion';
import Image from 'next/image';

const AboutSection = () => {
    // Animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    return (
        <section className="h-screen w-full flex items-center justify-center bg-dark-black py-16 px-8 lg:px-16">
            <div className="container mx-auto max-w-5xl flex flex-col lg:flex-row items-center justify-center gap-12">
                {/* Left Column: Stats Card */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="w-full lg:w-auto max-w-sm bg-dark-gray bg-opacity-50 backdrop-blur-md rounded-2xl p-8 border border-gray-800 shadow-lg"
                >
                    <div className="flex flex-col items-center space-y-6">
                        {/* Image */}
                        <div className="relative w-32 h-32 rounded-lg overflow-hidden">
                            <Image
                                src="/pp.jpg" // Replace with your image path
                                alt="Your Name"
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>

                        {/* Personal Details */}
                        <div className="text-center">
                            <h3 className="text-2xl font-poppins font-bold text-white mb-4">Personal Details</h3>
                            <ul className="space-y-2 text-gray-300 font-poppins w-full">
                                <li className="flex justify-between">
                                    <span><strong>Age:</strong></span>
                                    <span>22</span>
                                </li>
                                <li className="flex justify-between">
                                    <span><strong>Birthday:</strong></span>
                                    <span>January 2, 2003</span>
                                </li>
                                <li className="flex justify-between">
                                    <span><strong>Country:</strong></span>
                                    <span>Sri Lanka</span>
                                </li>
                                <li className="flex justify-between">
                                    <span><strong>Email:</strong></span>
                                    <span>nathanhimesh5@gmail.com</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </motion.div>

                {/* Right Column: Projects */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="w-full lg:w-auto space-y-8"
                >
                    <h2 className="text-7xl font-poppins font-bold text-white text-center lg:text-left">Recent <br></br> Projects</h2>

                    {/* Project Cards */}
                    <div className="space-y-6">
                        {[1, 2, 3].map((project) => (
                            <motion.div
                                key={project}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeInUp}
                                className="bg-dark-gray bg-opacity-50 backdrop-blur-md rounded-2xl p-6 border border-gray-800 shadow-lg"
                            >
                                <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-6">
                                    {/* Project Image */}
                                    <div className="relative w-full lg:w-32 h-32 rounded-lg overflow-hidden">
                                        <Image
                                            src={`/project${project}.jpg`} // Replace with your project image path
                                            alt={`Project ${project}`}
                                            layout="fill"
                                            objectFit="cover"
                                        />
                                    </div>

                                    {/* Project Details */}
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-poppins font-bold text-white mb-2">Project {project}</h3>
                                        <p className="text-gray-300 font-poppins">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutSection;