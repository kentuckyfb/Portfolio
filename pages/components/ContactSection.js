import { motion } from 'framer-motion';
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser'; // Import emailjs

const ContactSection = () => {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_szh96bc', 'template_awkaqzt', form.current, 'yGCQmcvTD_P00xJgu') // Replace with your keys
            .then((result) => {
                console.log(result.text);
                alert("Message sent successfully!"); // Or a nicer notification
                form.current.reset(); // Clear the form after successful submission
            }, (error) => {
                console.log(error.text);
                alert("Message sending failed. Please try again."); // Handle errors
            });
    };


    // Animation variants (same as before)
    const fadeInUp = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    return (
        <section className="h-screen w-full flex items-center justify-center bg-dark-black py-16 px-8 lg:px-16">
            <div className="container mx-auto max-w-6xl">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="bg-dark-gray bg-opacity-50 backdrop-blur-md rounded-2xl p-8 border border-gray-800 shadow-lg"
                >
                    <h2 className="text-4xl font-poppins font-bold text-white mb-8 text-center">Contact Me</h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <form className="space-y-6" ref={form} onSubmit={sendEmail}> {/* Add ref and onSubmit */}
                            {/* ... (input fields - same as before) */}
                            <div>
                                <label htmlFor="name" className="block text-gray-300 font-poppins mb-2">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="w-full px-4 py-3 bg-dark-gray bg-opacity-50 backdrop-blur-md rounded-lg border border-gray-800 text-white font-poppins focus:outline-none focus:border-dark-orange"
                                    placeholder="Your Name"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-gray-300 font-poppins mb-2">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="w-full px-4 py-3 bg-dark-gray bg-opacity-50 backdrop-blur-md rounded-lg border border-gray-800 text-white font-poppins focus:outline-none focus:border-dark-orange"
                                    placeholder="Your Email"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="subject" className="block text-gray-300 font-poppins mb-2">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    className="w-full px-4 py-3 bg-dark-gray bg-opacity-50 backdrop-blur-md rounded-lg border border-gray-800 text-white font-poppins focus:outline-none focus:border-dark-orange"
                                    placeholder="Subject"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-gray-300 font-poppins mb-2">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="5"
                                    className="w-full px-4 py-3 bg-dark-gray bg-opacity-50 backdrop-blur-md rounded-lg border border-gray-800 text-white font-poppins focus:outline-none focus:border-dark-orange"
                                    placeholder="Your Message"
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full px-6 py-3 bg-dark-orange text-white font-poppins font-semibold rounded-lg hover:bg-opacity-90 hover:shadow-lg hover:shadow-dark-orange/50 transition-all"
                            >
                                Send Message
                            </button>
                        </form>

                        {/* Embedded Map (same as before) */}
                        <div className="h-full w-full rounded-lg overflow-hidden">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.126285230945!2d79.93578827577166!3d6.875469393123341!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2510003294549%3A0xd29dd761b03bd38c!2sKentucky%20Fried%20Crib!5e0!3m2!1sen!2ssg!4v1739990173772!5m2!1sen!2ssg"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ContactSection;