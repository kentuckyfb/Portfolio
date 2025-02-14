'use client'
import React, { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        scrollToTop();
      }}
      className={`fixed bottom-8 right-8 p-4 bg-dark-orange rounded-full text-white border-2 hover:border-orange-500 hover:bg-transparent transition-all duration-500 hover:text-orange-500 cursor-pointer z-10 
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <FaArrowUp />
    </button>
  );
};

export default BackToTop;
