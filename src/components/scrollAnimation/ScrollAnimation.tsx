import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const ScrollAnimation: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect(); // Detiene la observación
                }
            },
            { threshold: 0.1 } // Porcentaje visible del elemento para activar la animación
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <motion.div
            ref={elementRef}
            initial={{ opacity: 0, y: 50 }} // Estado inicial
            animate={isVisible ? { opacity: 1, y: 0 } : {}} // Estado animado
            transition={{ duration: 0.8, ease: "easeOut" }} // Duración y suavidad
        >
            {children}
        </motion.div>
    );
};

export default ScrollAnimation;
