import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    maxWidth?: string;
    padding?: string;
};

export default function Modal({ 
    isOpen, 
    onClose, 
    children, 
    maxWidth = "max-w-2xl",
    padding = "p-2 md:p-4"
}: ModalProps) {
    const { theme } = useTheme();

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="z-[10000] fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center backdrop-blur-sm"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className={`${
                            theme === "dark"
                                ? "bg-lightGrey border-[1.3px] border-lighterGrey/50"
                                : "bg-white"
                        } rounded-2xl w-full ${maxWidth} max-h-[90vh] overflow-y-auto scrollable shadow-2xl relative`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className={`absolute top-4 right-4 z-50 flex items-center justify-center w-10 h-10 rounded-full border transition-all ${
                                theme === "dark" 
                                ? "text-white/40 border-white/10 hover:bg-white/5" 
                                : "text-gray-500 border-gray-200 hover:bg-gray-50"
                            }`}
                            onClick={onClose}
                        >
                            ✕
                        </button>
                        <div className={padding}>
                            {children}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
