import { motion } from 'framer-motion';

const ContactSection = () => {
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
          <h2 className="text-4xl font-poppins font-bold text-white mb-8 text-center">Contact Me</h2>

          {/* Form and Map Container */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <form className="space-y-6">
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

            {/* Embedded Map */}
            <div className="h-full w-full rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d317715.7119263355!2d-0.38178406930701625!3d51.52873519756608!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a00baf21de75%3A0x52963a5addd52a99!2sLondon%2C%20UK!5e0!3m2!1sen!2s!4v1698765432105!5m2!1sen!2s"
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