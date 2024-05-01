import { useState } from 'react';

export default function About(){
    const [hoveredImage, setHoveredImage] = useState(null);

    const handleMouseEnter = (description) => {
        setHoveredImage(description);
    };

    const handleMouseLeave = () => {
        setHoveredImage(null);
    };
    const images = [
       
        {url: "https://res.cloudinary.com/dws8qazyi/image/upload/v1714207318/_20253d03-76de-4548-a82b-06121335f0d3_xzwywi.jpg", description: "My favourite Trip (Stockholm)"},
        {url: "https://res.cloudinary.com/dws8qazyi/image/upload/v1714207318/img-OETO2TkHYSfhgK2JAfrlo_sbrd7b.jpg", description: "Hiking in the mountains"},
        {url: "https://res.cloudinary.com/dws8qazyi/image/upload/v1714207317/_3a4d6f6f-6781-48f1-aea9-af591a3322a9_lrqxdz.jpg", description: "Having fun at Granada Sound"},
        {url: "https://res.cloudinary.com/dws8qazyi/image/upload/v1714207317/img-cHYhWrVFILl6DcECA0e9L_b7zpht.jpg", description: "Kickboxing, my favourit sport"},
        {url: "https://res.cloudinary.com/dws8qazyi/image/upload/v1714208357/_8fc3de5d-b115-485f-8391-0bc02d1f36db_ioppmr.jpg", description: "Working in the shop"},
        {url: "https://a.cdn-hotels.com/gdcs/production97/d161/80c2054d-79aa-4e2b-8934-be119f9b778d.jpg", description: "Paradise, my favourite place in Calahonda"},
        {url: "https://res.cloudinary.com/dws8qazyi/image/upload/v1714208335/img-2oGCe1RY4N7Lf17dCMvpM_rwiymo.jpg", description: "Restoration Shop where I learnt the craft"},
        {url: "https://images.unsplash.com/photo-1583422409516-2895a77efded?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: "My favourite City (BCN)"}
    
    ]


    return (
        <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 justify-items-center mt-5">
            {images.map((image, index) => (
                <div
                    key={index}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(image.description)}
                    onMouseLeave={handleMouseLeave}
                >
                    <img
                        src={image.url}
                        alt={`Image ${index + 1}`}
                        className="border-8 border-gray-300 shadow-xl mb-5 rounded-xl w-full h-auto sm:w-48 sm:h-48 md:w-80 md:h-80 lg:w-85 lg:h-85 xl:w-90 xl:h-90 object-cover cursor-pointer"
                    />
                    {hoveredImage === image.description && (
                        <div className="absolute bottom-0 left-0 right-0 bg-black text-white p-2 opacity-75 mb-5">
                            {image.description}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}    