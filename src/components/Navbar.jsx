import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { user, logout } = useContext(UserContext);

    const menuOn = () => {
        setMenuOpen(!menuOpen);
    };

    const handleLogout = () => {
        logout();
        toast.success("User logged off successfully!")       
    };

    return (
        <div>
            <nav>
                <div className="max-w-7xl mx-auto p-4">
                    <div className="hidden md:flex flex-row md:space-x-12 justify-center items-center">
                        <Link to="/"><h2 className="text-white text-2xl font-bold hover:scale-125 hover:text-gray-300 font-permanent-marker">Home</h2></Link>
                        <Link to="/about"><h2 className="text-white text-2xl font-bold hover:scale-125 hover:text-gray-300 font-permanent-marker">About</h2></Link>
                        <Link to="/shop"><h2 className="text-white text-2xl font-bold hover:scale-125 hover:text-gray-300 font-permanent-marker">Shop</h2></Link>
                        <Link to="/blog"><h2 className="text-white text-2xl font-bold hover:scale-125 hover:text-gray-300 font-permanent-marker">Blog</h2></Link>
                        <Link to="/contact"><h2 className="text-white text-2xl font-bold hover:scale-125 hover:text-gray-300 font-permanent-marker">Contact</h2></Link>
                        {user ? (
                            <>
                                <button onClick={handleLogout} className="text-white text-2xl font-bold hover:scale-125 hover:text-gray-300 font-permanent-marker">Logout</button>
                                <div className="flex flex-row">
                                    <img src={user.image} alt="profile_image" className="w-10 h-10 rounded-full mr-2" />
                                    <h2 className="text-white bg-black border pb-1.5 pl-1.5 pr-1.5 rounded-xl text-2xl hover:text-gray-300 font-gloria-hallelujah">{user.name}</h2>
                                </div>
                            </>
                        ) : (
                            <Link to="/login"><h2 className="text-white text-2xl font-bold hover:scale-125 hover:text-gray-300 font-permanent-marker">Log In</h2></Link>
                        )}
                    </div>
                    <div className="border-2 rounded-xl p-1 text-white text-xl font-bold focus:outline-none md:hidden block mx-auto">
                    <button onClick={menuOn} className="text-white text-xl font-bold underline focus:outline-none md:hidden block mx-auto " >&#9776;{menuOpen ? "Close" : "Menu"}</button>
                    {menuOpen && (
                        <div className="flex flex-col justify-center space-y-1 items-center mt-2 md:hidden ">
                            <Link to="/"><h2 className="text-white text-xl font-bold hover:scale-125 hover:text-gray-300 mb-1 font-permanent-marker">Home</h2></Link>
                            <Link to="/about"><h2 className="text-white text-xl font-bold hover:scale-125 hover:text-gray-300 mb-1 font-permanent-marker">About</h2></Link>
                            <Link to="/shop"><h2 className="text-white text-xl font-bold hover:scale-125 hover:text-gray-300 mb-1 font-permanent-marker">Emma's Shop</h2></Link>
                            <Link to="/blog"><h2 className="text-white text-xl font-bold hover:scale-125 hover:text-gray-300 mb-1 font-permanent-marker">Blog</h2></Link>
                            <Link to="/contact"><h2 className="text-white text-xl font-bold hover:scale-125 hover:text-gray-300 mb-1 font-permanent-marker">Contact</h2></Link>
                            {user ? (
                                <>
                                    <button onClick={handleLogout} className="text-white text-xl font-bold hover:scale-125 hover:text-gray-300 pb-1 mb-1 font-permanent-marker">Logout</button>
                                    <div className="flex flex-row justify-center">
                                        <img src={user.image} alt="profile_image" className="w-10 h-10 rounded-full mr-2" />
                                        <h2 className="text-white bg-black border pb-1.5 pl-1.5 pr-1.5 rounded-xl text-xl hover:text-gray-300 mb-1 font-gloria-hallelujah">{user.name}</h2>
                                    </div>
                                </>
                            ) : (
                                <Link to="/login"><h2 className="text-white text-xl font-bold hover:scale-125 hover:text-gray-300 font-permanent-marker">Log In</h2></Link>
                            )}
                        </div>
              
                    )}
                    </div>
                </div>
            </nav>
        </div>
    );
}
