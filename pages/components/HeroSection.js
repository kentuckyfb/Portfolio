import Link from 'next/link';
import upRightArrow from "../../public/up-right.svg";
import Image from "next/image";

const HeroSection = () => {
    return (
        <section className="relative h-screen w-full bg-dark-black overflow-hidden">
            {/* Glowing Grid Background */}
            <div className="absolute inset-0 bg-grid-dark-gray">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-dark-black"></div>
                <div className="absolute inset-0 animate-glow opacity-20"></div>
            </div>

            {/* Center Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                {/* Central Image */}
                <div className="relative w-64 h-64 mb-8 overflow-hidden">
                    <img
                        src="/pp-nobg.png" // Replace with your image path
                        alt="Kentuckyfb"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Text */}
                <h1 className="text-5xl font-poppins font-bold text-white mb-4">
                    Hello, I’m [KentuckyFB]
                </h1>
                <p className="text-xl text-gray-300 font-poppins mb-8">
                    I’m a developer passionate about building cool stuff. Let’s create something amazing together!
                </p>

                <div className="absolute z-[2] bottom-20">
                        <div className="slide-button-wrapper relative bg-white bg-opacity-25 rounded-full w-auto p-3">
                            <input className="hidden" type="radio" name="slide" id="button-one" />
                            <input className="hidden" type="radio" name="slide" id="button-two" />

                            <div className="cursor-scale button-container flex">
                                <label className="z-[2] text-md sm:text-xl cursor-pointer text-white flex justify-center items-center w-32 sm:w-40 h-14" htmlFor="button-one">
                                    <a href="#projects" className="flex items-center">
                                        Portfolio
                                        <Image src={upRightArrow} alt="Arrow" />
                                    </a>
                                </label>

                                <label className="z-[2] text-md sm:text-xl cursor-pointer text-white flex justify-center items-center w-32 sm:w-40 h-14" htmlFor="button-two">
                                    <a href="#contact" className="flex items-center">
                                        Hire Me
                                        <Image src={upRightArrow} alt="Arrow" />
                                    </a>
                                </label>
                            </div>

                            <div className="slide-buttons z-[1] absolute top-3 bg-dark-orange w-32 sm:w-40 h-14 transition-transform duration-300 rounded-full"></div>
                        </div>

                    </div>
                
            </div>
        </section>
    );
};

export default HeroSection;