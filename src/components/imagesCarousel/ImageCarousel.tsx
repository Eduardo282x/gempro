import React, { useState, useEffect } from "react";

interface ImageCarouselProps {
    images: string[]; // Arreglo de URLs de imágenes
    width?: string; // Ancho del cuadro (opcional)
    height?: string; // Altura del cuadro (opcional)
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({
    images,
    width = "300px",
    height = "200px",
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFadingOut, setIsFadingOut] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsFadingOut(true);
            setTimeout(() => {
                setCurrentIndex((prevIndex) =>
                    prevIndex === images.length - 1 ? 0 : prevIndex + 1
                );
                setIsFadingOut(false);
            }, 500); // Duración de la animación de desvanecimiento
        }, 2500); // Cambia cada 2.5 segundos (2s visibles + 0.5s animación)

        return () => clearInterval(interval); // Limpia el intervalo al desmontar
    }, [images.length]);

    return (
        <div
            style={{
                width,
                height,
                overflow: "hidden",
                position: "relative",
            }}
            className="rounded shadow-lg"
        >
            <img
                src={images[currentIndex]}
                alt={`Imagen ${currentIndex + 1}`}
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    opacity: isFadingOut ? 0 : 1,
                    transition: "opacity 0.5s ease-in-out",
                }}
            />
        </div>
    );
};
