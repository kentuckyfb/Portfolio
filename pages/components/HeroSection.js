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
                <div className="flex flex-col items-center text-center">
                    {/* Image */}
                    <div className="w-36 h-36 sm:w-32 sm:h-32 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-72 xl:h-72 relative mb-4 sm:mb-6 md:mb-8 overflow-hidden">
                        <img
                            src="/pp-nobg.png"
                            alt="Kentuckyfb"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Text */}
                    <h1 className="text-lg sm:text-xl md:text-3xl lg:text-5xl xl:text-5xl font-poppins font-bold text-white mb-2 sm:mb-3 md:mb-4">
                        Hello, I’m [KentuckyFB]
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg lg:text-1xl text-gray-300 font-poppins mb-4 sm:mb-6 md:mb-8 max-w-xs sm:max-w-sm md:max-w-md mx-auto">
                        I’m a developer passionate about building cool stuff. Let’s create something amazing together!
                    </p>
                </div>

                <div className="relative z-[2] bottom-2">
                    <div className="slide-button-wrapper relative bg-white bg-opacity-25 rounded-full w-64 sm:w-auto p-3">
                        <input className="hidden" type="radio" name="slide" id="button-one" />
                        <input className="hidden" type="radio" name="slide" id="button-two" />

                        <div className="relative cursor-scale button-container flex flex-row gap-4 sm:gap-8"> {/* Changed to flex-row */}
                            {/* Button One */}
                            <label className="z-[2] text-sm sm:text-xl cursor-pointer text-white flex justify-center items-center w-28 sm:w-40 h-14 hover:scale-105 transition-transform" htmlFor="button-one">
                                <a href="#projects" className="flex items-center gap-2">
                                    Portfolio
                                    <Image src={upRightArrow} alt="Arrow" className="w-4 h-4 sm:w-5 sm:h-5" />
                                </a>
                            </label>

                            {/* Button Two */}
                            <label className="z-[2] text-sm sm:text-xl cursor-pointer text-white flex justify-center items-center w-28 sm:w-40 h-14 hover:scale-105 transition-transform" htmlFor="button-two">
                                <a href="#contact" className="flex items-center gap-2">
                                    Hire Me
                                    <Image src={upRightArrow} alt="Arrow" className="w-4 h-4 sm:w-5 sm:h-5" />
                                </a>
                            </label>
                        </div>

                        <div className="slide-buttons z-[1] absolute top-3 bg-dark-orange w-28 sm:w-40 h-14 transition-transform duration-300 rounded-full"></div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default HeroSection;