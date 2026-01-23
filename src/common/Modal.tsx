import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { useBodyScrollLock } from "../hooks/useBodyScrollLock";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
    maxWidth?: string;
    padding?: string;
};

export default function Modal({ 
    isOpen, 
    onClose, 
    children, 
    title,
    maxWidth = "max-w-2xl",
    padding = "p-2 md:p-4"
}: ModalProps) {
    const { theme } = useTheme();
    useBodyScrollLock(isOpen);

    if (!isOpen) return null;

    // useEffect(() => {
    //     if (isOpen) {
    //         document.body.style.overflow = "hidden";
    //     } else {
    //         document.body.style.overflow = "unset";
    //     }

    //     // Cleanup: ensures scroll is restored if component unmounts unexpectedly
    //     return () => {
    //         document.body.style.overflow = "unset";
    //     };
    // }, [isOpen]);

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
                        <div className={`sticky top-0 ${theme === "dark" ? "bg-lightGrey" : "bg-white"} z-10`}>
                            {title &&
                                <h1 className="text-2xl font-bold mb-4 pt-4 pb-2 pl-4 text-primary">
                                    {title}
                                </h1>
                            }
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
                        </div>
                       
                        <div className={padding}>
                            {children}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
