import { FC } from 'react';

interface ICard {
    name: string;
    description: string;
    image: string;
}

export const Card: FC<ICard> = ({ name, description, image }) => {
    return (
        <div className=' bg-white p-4 rounded-md transition-all mx-2 ease-in hover:bg-[#098033] group'>
            {image ?
                <img src={image} alt="" className="w-full h-[12rem] object-cover" />
                :
                <>
                    <h3 className="text-xl font-semibold text-[#098033] mb-2 group-hover:text-white group-hover:font-bold">{name}</h3>
                    <p className="text-gray-600 group-hover:text-gray-200">{description}</p>
                </>}
        </div>
    )
}
