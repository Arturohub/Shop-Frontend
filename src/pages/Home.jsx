import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [images] = useState([
        "http://www.tasarestaura.com/archivos/trabajos_imagenes_188_cimg2350.jpg",
        "http://www.tasarestaura.com/archivos/trabajos_imagenes_189_cimg2351.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/3/34/Interatelier_petit.jpg",
        "https://res.cloudinary.com/dws8qazyi/image/upload/v1714208357/_8fc3de5d-b115-485f-8391-0bc02d1f36db_ioppmr.jpg"
    ]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 6000);
        return () => clearInterval(interval);
    }, [images]);

    const services = [
        {
            title: "Restoration of Old Furniture",
            description: "Bring new life to cherished pieces with our restoration services.",
        },
        {
            title: "Modern Touch for Classic Furniture",
            description: "Transform traditional furniture into modern masterpieces.",
        },
        {
            title: "Change of Look for Modern Furniture",
            description: "Refresh the appearance of contemporary furniture to match your own custom style.",
        },

    ];

    const testimonials = [
        {quote: "Emma's Restoration Shop exceeded my expectations. The quality of their workmanship and attention to detail are truly impressive.", author: "John Smith", city:"Madrid"},
        {quote: "Emma is a great person and an excellent professional. The furtuniture I brought her was completely destroyed and she fully restored it and gave it a second life. I am very happy with their services and for sure I will repeat with them.", author: "Johannah Smith", city:"Barcelona"},
        {quote: "I'm thrilled with the work Emma's Restoration Shop did on my furniture. Highly recommended!", author: "Maria Smith", city:"Granada"}
    ];

    return (
        <div className="lg:pr-20 lg:pl-20">
            <section className="relative flex flex-col items-center mx-auto overflow-hidden bg-gray-900 text-white px-4 md:py-40 lg:py-60 py-16 mt-4 mb-12 rounded-3xl ">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Restored furniture ${index}`}
                        className={`absolute top-0 left-0 w-screen h-full cover transition-opacity duration-1000 ${
                            index === currentImageIndex ? "opacity-75" : "opacity-0"
                        } ${
                            index === currentImageIndex ? "z-10" : "z-0"
                        }`}
                    />
                ))}
                <div className="container mx-auto flex flex-col items-center justify-center relative z-20">
                    <h1 className="text-5xl font-bold mb-4 font-satisfy">Welcome to Emma's Restoration Shop</h1>
                    <p className="text-lg mb-6 font-space-grotesk">Transforming old into gold with expert craftsmanship</p>
                    <Link to="/shop"><button className="bg-blue-500 hover:bg-blue-600 hover:scale-115 hover:tracking-wider text-white font-bold py-2 px-4 rounded-full">Check out the Shop</button></Link>
                    <Link to="/contact"><button className="bg-blue-500 hover:bg-blue-600 hover:scale-115 hover:tracking-widest text-white font-bold py-2 px-4 rounded-full mt-4">Contact Us</button></Link>
                </div>
            </section>

            <section className="bg-gray-300 py-20 mb-12 rounded-3xl pr-4 pl-4">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-12 text-black">Our Services</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <div key={index} className="bg-white rounded-md p-6 shadow-md">
                                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                                <p>{service.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-gray-300 py-20 text-center rounded-3xl pr-4 pl-4">
                <h2 className="text-3xl font-bold mb-8">What Our Customers Say</h2>
                <div className="container mx-auto">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-white rounded-lg p-6 shadow-md mx-auto max-w-lg mb-6">
                            <p className="text-lg italic mb-4">"{testimonial.quote}"</p>
                            <p className="text-base font-bold">- {testimonial.author}, {testimonial.city}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
