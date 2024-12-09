import './mainTitle.css';

import React, { useEffect, useState } from "react";

export const MainTitlePage = () => {
    const [scale, setScale] = useState(1);
    const [opacity, setOpacity] = useState(1);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const newScale = Math.min(1 + scrollY / 1000, 1.5);
            const newOpacity = Math.max(1 - scrollY / 500, 0);
            setScale(newScale);
            setOpacity(newOpacity);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className="w-full text-center py-20">
            <h1
                className="text-[4rem] md:text-[12rem]"
                style={{
                    transform: `scale(${scale})`,
                    opacity: opacity,
                    transition: "transform 0.1s linear, opacity 0.1s linear",
                }}
            >
                GEMPRO
            </h1>
            <p
                className="text-[#041d57] md:text-2xl !font-light"
                style={{
                    opacity: opacity,
                    transition: "opacity 0.1s linear",
                }}
            >
                Grupo Empresarial de Mantenimiento Proactivo
            </p>
        </div>
    );
};
