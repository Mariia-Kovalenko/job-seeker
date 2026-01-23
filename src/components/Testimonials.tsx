import { motion, useMotionValue, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { TESTIMONIALS } from "../utils/constants";
import TestimonialCard from "./TestimonialCard";

export default function TestimonialsMarquee() {
    const x = useMotionValue(0);
    const controlsRef = useRef<any>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const items = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];
    const [duration, setDuration] = useState(40);

    useEffect(() => {
        const updateSpeed = () => {
            setDuration(window.innerWidth < 768 ? 40 : 50);
        };

        updateSpeed();
        window.addEventListener("resize", updateSpeed);
        return () => window.removeEventListener("resize", updateSpeed);
    }, []);

    const startAnimation = () => {
        if (!trackRef.current) return;
        const trackWidth = trackRef.current.scrollWidth / 2;
        const currentX = x.get(); 
    
        controlsRef.current = animate(x, [currentX, -trackWidth], {
            ease: "linear",
            duration,
            repeat: Infinity,
        });
    };
    // const startAnimation = () => {
    //     if (!trackRef.current) return;
    
    //     const trackWidth = trackRef.current.scrollWidth / 2;
    
    //     // Reset x if it's beyond the width, to keep loop seamless
    //     if (x.get() <= -trackWidth) {
    //         x.set(x.get() + trackWidth);
    //     }
    
    //     controlsRef.current = animate(x, x.get() - trackWidth, {
    //         ease: "linear",
    //         duration,
    //         repeat: Infinity,
    //         repeatType: "loop",
    //     });
    // };
    
    

    useEffect(() => {
        startAnimation();
        return () => controlsRef.current?.stop();
    }, [duration]);

    return (
        <div
            ref={containerRef}
            className="overflow-hidden py-6"
            onMouseEnter={() => controlsRef.current?.stop()}
            onMouseLeave={startAnimation}
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex-1"
                >
                <h2 className="max-w-7xl mx-auto font-semibold text-center text-3xl md:text-4xl mb-8">What our <span className="text-primary">clients</span> say</h2>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                ref={trackRef}
                style={{ x }}
                drag="x"
                dragElastic={0.05}
                dragMomentum={true}
                onDragStart={() => controlsRef.current?.stop()}
                onDragEnd={startAnimation}
                className="flex gap-6 w-max touch-pan-x"
            >
                {items.map((t, idx) => (
                    <TestimonialCard
                        key={`${t.id}-${idx}`}
                        text={t.text}
                        name={t.name}
                        position={t.position}
                    />
                ))}
            </motion.div>
        </div>
    );
}
