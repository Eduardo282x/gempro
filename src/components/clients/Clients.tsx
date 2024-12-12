/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useEffect, FC } from 'react';

interface IImageGallery {
    images: string[];
    width?: string; // Ancho del cuadro (opcional)
    height?: string; // Altura del cuadro (opcional)
}
const ImageGallery: FC<IImageGallery> = ({ images, width, height }) => {
    const imageContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = imageContainerRef.current;
        if (!container) return;

        const imageWidth = (container.firstChild as HTMLElement)?.offsetWidth || 0;
        const totalWidth = imageWidth * images.length;
        let offset = 0;

        const animate = () => {
            offset -= 1;

            // Check if the last image has passed
            if (offset <= -totalWidth) {
                offset = 0; // Reset to the beginning
            }

            container.style.transform = `translateX(${offset}px)`;
            requestAnimationFrame(animate);
        };

        animate();
    }, [images]);

    return (
        <div className="relative overflow-hidden">
            <div
                ref={imageContainerRef}
                className="flex gap-4"
                style={{ width, height }}
            >
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt=""
                        className='w-full h-full object-contain'
                    />
                ))}
                {/* Duplicate the first image for seamless looping */}
                <img
                    src={images[0]}
                    alt=""
                    className='w-full h-full object-contain'
                />
            </div>
        </div>
    );
};

export default ImageGallery;