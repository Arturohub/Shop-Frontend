import React, { useState } from 'react';
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Register() {

    const [name, setName] = useState("")
    const [familyname, setFamilyName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [mobilenumber, setMobileNumber] = useState("")
    const [image, setImage] = useState("")

    const [isLoading, setIsLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const navigate = useNavigate();

    const uploadImg = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
        const cloudinaryUrl = import.meta.env.VITE_CLOUDINARY_URL;
        try {
            setUploading(true)
            const response = await axios.post(cloudinaryUrl, formData, { withCredentials: false });
            setImage(response.data.secure_url)
            setUploading(false);
        } catch (error) {
            toast.error('Failed to upload image to Cloudinary:', error);
            setUploading(false);
        }
    };


        const registerUser = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post("https://shopbackend-ikrx.onrender.com/api/users/register", {
                name: name, family_name: familyname, email: email, password: password, mobile_number: mobilenumber, profile_picture: image
            });
            toast.success(response.data.message);
            setIsLoading(false);
            navigate("/login");
        } catch (error) {
            toast.error(error.response.data.message);
            setIsLoading(false);
        }
    };

    return (
        <div className="container justify-center h-screen pr-4 pl-4">
            <h1 className="text-4xl my-8 underline text-gray-200 font-sigmar text-center">Register</h1>
            <form onSubmit={registerUser} className='max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                <div className="mb-4">
                    <label className="block text-gray-700 font-extrabold underline text-lg tracking-wider mb-2" htmlFor="name">Name</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  hover:border-blue-600"
                        id="name"
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName (e.target.value)}
                        required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-extrabold underline text-lg tracking-wider mb-2" htmlFor="family_name">Family Name</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  hover:border-blue-600"
                        id="familyname"
                        type="text"
                        name="familyname"
                        value={familyname}
                        onChange={(e) => setFamilyName(e.target.value)}
                        required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-extrabold underline text-lg tracking-wider mb-2" htmlFor="email">Email</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  hover:border-blue-600"
                        id="email"
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail (e.target.value)}
                        required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-extrabold underline text-lg tracking-wider mb-2" htmlFor="password">Password</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  hover:border-blue-600"
                        id="password"
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-extrabold underline text-lg tracking-wider mb-2" htmlFor="mobile_number">Mobile Number</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  hover:border-blue-600"
                        id="mobilenumber"
                        type="text"
                        name="mobilenumber"
                        value={mobilenumber}
                        onChange={(e) => setMobileNumber (e.target.value)}
                        required />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 font-extrabold underline text-lg tracking-wider mb-2" htmlFor="profile_picture">Profile Picture</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  hover:border-blue-600"
                        id="image"
                        type="file"
                        name="image"
                        onChange={uploadImg}
                        required />
                </div>
                <div className='flex justify-center items-center mt-2 mb-4'>
                    {image && (<img src={image} alt="Profile" className="w-32 h-32 object-cover" /> )}
                </div>
                {!isLoading && (
                    <div className="flex flex-col justify-center border-b-4 pb-8">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline  hover:border-blue-600" type="submit">Register</button>
                    </div>
                )}
                <div className="flex flex-col items-center justify-between">
                    <p className="pt-4 pb-2 mt-4 font-bold">Already have an account?</p>
                    <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline  hover:border-blue-600"
                        to="/login">
                        Log In here!
                    </Link>
                </div>
            </form>
        </div>
    );
};
