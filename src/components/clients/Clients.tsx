/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useEffect } from 'react';
import image1 from '../../assets/img/clients/image1.jpg'
import image2 from '../../assets/img/clients/image2.jpg';
import image3 from '../../assets/img/clients/image3.jpg';
import image4 from '../../assets/img/clients/image4.jpg';
import image5 from '../../assets/img/clients/image5.jpg';
import image6 from '../../assets/img/clients/image6.jpg';
import image7 from '../../assets/img/clients/image7.jpg';
import image8 from '../../assets/img/clients/image8.jpg';
import image9 from '../../assets/img/clients/image9.jpg';
import image10 from '../../assets/img/clients/image10.jpg';
import image11 from '../../assets/img/clients/image11.jpg';

export const images = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
    image10,
    image11
]

const ImageGallery = () => {
    const imageContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = imageContainerRef.current;
        if (!container) return;

        const imageWidth = (container.firstChild as HTMLElement)?.offsetWidth || 0;
        const totalWidth = imageWidth * images.length;
        let offset = 0;

        const animate = () => {

            offset -= 1;
            if (offset <= -totalWidth) {
                offset = 0;
            }
            container.style.transform = `translateX(${offset}px)`;
            requestAnimationFrame(animate);
        };

        animate();
    }, [images]);

    return (
        <div className="relative overflow-hidden">
            <div ref={imageContainerRef} className="flex">
                {images.map((image, index) => (
                    <img key={index} src={image} alt="" className="w-full h-full" />
                ))}
            </div>
        </div>
    );
};

export default ImageGallery;