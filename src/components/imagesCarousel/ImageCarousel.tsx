import React from "react";
import './ImageCraousel.css'

interface ContinuousImageCarouselProps {
    images: string[]; // Arreglo de URLs de imágenes
    width?: string; // Ancho del carrusel (opcional)
    height?: string; // Altura del carrusel (opcional)
}

export const ContinuousImageCarousel: React.FC<ContinuousImageCarouselProps> = ({
    images,
    width = "100%",
    height = "100%",
}) => {
    // Duplicamos las imágenes para un bucle continuo
    const doubledImages = [...images, ...images];

    return (
        <div
            className="w-full h-full overflow-hidden relative"
            style={{
                width,
                height,
            }}
        >
            <div className="flex items-center justify-center gap-5 w-[calc(200px * 14)] slide-track">
                {doubledImages.map((image, index) => (
                    <div className="w-full" key={index}>
                        <img src={image} alt={`Imagen ${index + 1}`}  />
                    </div>
                ))}
            </div>
        </div>
    );
};
