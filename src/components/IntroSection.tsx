import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { INTRO_SECTION_IMAGES, CATEGORIES } from "../utils/constants";
import { Link } from 'react-router-dom';

export default function IntroSection() {
    const { theme } = useTheme();
    return (
        <section className="p-8 pt-12 pb-20">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex-1"
                >
                    <h1
                        className={`text-4xl md:text-5xl lg:text-6xl font-bold ${
                            theme === "dark"
                                ? "text-white"
                                : "text-darkBackground"
                        }`}
                    >
                        Find your Perfect Dream Jobs with <br />
                        <span className="text-primary">Job Seeker</span>
                    </h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className={`mt-4 text-lg ${
                            theme === "dark"
                                ? "text-white"
                                : "text-darkBackground"
                        }`}
                    >
                        Discover thousands of curated opportunities tailored to
                        your skills, passions, and career goals. Whether you're
                        a fresh graduate or an experienced professional.
                    </motion.p>
                    <Link to="/jobs">
                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="mt-6 bg-primary text-white px-8 py-3 rounded-full"
                        >
                            Find Jobs
                        </motion.button>
                    </Link>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="mt-10 text-lg"
                    >
                        <span className="text-primary font-bold">5K+</span>{" "}
                        hired applicants
                    </motion.div>
                    <div className="flex items-center mt-4 space-x-4">
                        <ProfileStack />
                    </div>
                </motion.div>
                <div className="flex-1 hidden md:block">
                    {/* Placeholder for illustration image */}
                    <motion.div
                        className={`w-full h-full ${
                            theme === "dark" ? "bg-darkBackground" : "bg-white"
                        } rounded-xl`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <img src={'/intro.png'} alt="intro" className="w-full h-full object-cover rounded-xl" />
                    </motion.div>
                </div>
                {/* <div
        className="absolute right-0 w-[500px] h-[500px] lg:w-[600px] lg:h-[600px] bg-primary blur-xl opacity-5 rounded-full"
        style={{ top: '0%', right: '-100px', zIndex: 0 }}
      ></div> */}
            </div>

            {/* categories */}
            <motion.div
                className="flex flex-wrap gap-4 mt-12 md:mt-2 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
            >
                {CATEGORIES.map((category, idx) => (
                    <motion.div
                        key={idx}
                        className={`${theme === 'dark' ? 'bg-primary/10 text-white' : 'bg-primary/30 text-black'}  px-4 py-2 text-sm flex items-center gap-2 rounded-full`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.4 + idx * 0.1 }}
                    >
                        <span>{category.icon}</span>
                        <span>{category.name}</span>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}

function ProfileStack() {
    const { theme } = useTheme();
    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.8,
            },
        },
    };

    const item = {
        hidden: { x: -50, opacity: 0 },
        visible: { x: 10, opacity: 1 },
    };

    return (
        <motion.div
            className="flex"
            variants={container}
            initial="hidden"
            animate="visible"
        >
            {INTRO_SECTION_IMAGES.map((image, index) => (
                <motion.div
                    key={index}
                    className={`w-12 h-12 md:w-16 md:h-16 bg-gray-300 rounded-full -ml-4 ${
                        theme === "dark"
                            ? "border-darkBackground"
                            : "border-white"
                    } border-2`}
                    variants={item}
                >
                    <img
                        src={image.image}
                        alt="profile"
                        className="w-full h-full object-cover rounded-full object-center"
                    />
                </motion.div>
            ))}

            <motion.div
                key={INTRO_SECTION_IMAGES.length + 1}
                className={`w-12 h-12 md:w-16 md:h-16 bg-gray-100 flex text-black items-center justify-center rounded-full -ml-4 ${
                    theme === "dark" ? "border-darkBackground" : "border-white"
                } border-2`}
                variants={item}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M12 5v14M5 12h14" />
                </svg>
            </motion.div>
        </motion.div>
    );
}
