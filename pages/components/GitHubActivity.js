import GitHubCalendar from "react-github-calendar";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function GitHubContributions({ username }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const calendarRef = useRef(null); // Ref for the calendar container

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 500);
        return () => clearTimeout(timer);
    }, []);

    // Scroll to the far right on mobile
    useEffect(() => {
        if (calendarRef.current) {
            // Add a slight delay to ensure the DOM is fully updated
            setTimeout(() => {
                calendarRef.current.scrollLeft = calendarRef.current.scrollWidth;
            }, 100);
        }
    }, [loading]);

    if (loading) {
        return <div className="text-gray-300">Loading GitHub contributions...</div>;
    }

    if (error) {
        return <div className="text-red-500">Error: {error}</div>;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-dark-gray backdrop-blur-md bg-opacity-50 p-6 md:p-12 rounded-lg shadow-glow border border-gray-800 w-[90%] md:w-[62%] mx-auto flex flex-col items-center justify-center" // Centered using flexbox
        >
            <h2 className="text-2xl flex justify-center font-bold mb-6 font-poppins">GitHub Contributions</h2>
            <div className="flex justify-center  w-[90%] ">
                <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        viewport={{ once: true }}
                        className="w-full"
                    >
                        {/* Show full year on desktop, 1 month on mobile */}
                        <div className="hidden md:block">
                            <GitHubCalendar
                                username={username}
                                theme={{
                                    dark: [
                                        "#161B22", // Darkest (no contributions)
                                        "#7C2D12", // Light orange
                                        "#9A3412", // Medium orange
                                        "#C2410C", // Bright orange
                                        "#EA580C", // Brightest orange
                                    ],
                                }}
                                fontSize={14}
                                blockSize={12}
                                blockMargin={4}
                                weekStart={1} // Start the week on Monday
                                hideColorLegend={false}
                                hideMonthLabels={false}
                                showWeekdayLabels
                                style={{
                                    color: "#ffffff", // Text color
                                }}
                            />
                        </div>
                        <div className="block md:hidden">
                            <div
                                ref={calendarRef}
                                className="overflow-x-auto scrollbar-hide" // Enable horizontal scroll
                            >
                                <GitHubCalendar
                                    username={username}
                                    theme={{
                                        dark: [
                                            "#161B22", // Darkest (no contributions)
                                            "#7C2D12", // Light orange
                                            "#9A3412", // Medium orange
                                            "#C2410C", // Bright orange
                                            "#EA580C", // Brightest orange
                                        ],
                                    }}
                                    fontSize={12} // Smaller font for mobile
                                    blockSize={10} // Slightly larger blocks for mobile
                                    blockMargin={2} // Smaller margin for mobile
                                    weekStart={1} // Start the week on Monday
                                    hideColorLegend={false} // Show legend on mobile
                                    hideMonthLabels={false} // Show month labels on mobile
                                    showWeekdayLabels // Show weekday labels on mobile
                                    years={1} // Show only 1 year
                                    style={{
                                        color: "#ffffff", // Text color
                                    }}
                                />
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </motion.div>
    );
}