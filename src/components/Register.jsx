import React, { useState } from 'react';
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Register() {

    const [data, setData] = useState({
        name: '',
        family_name: '',
        email: '',
        password: '',
        mobile_number: '',
        profile_picture: ''
    });

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const registerUser = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const { name, family_name, email, password, mobile_number, profile_picture } = data;
        try {
            const { data } = await axios.post("https://shopbackend-ikrx.onrender.com/api/users/register", {
                name, family_name, email, password, mobile_number, profile_picture
            });
            setData({
                name: '',
                family_name: '',
                email: '',
                password: '',
                mobile_number: '',
                profile_picture: ''
            });
            toast.success("You successfully registered your user!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            });
            setIsLoading(false);
            navigate("/login");
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            } else {
                toast.error("An unexpected error occurred", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
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
                        value={data.name}
                        onChange={handleChange}
                        required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-extrabold underline text-lg tracking-wider mb-2" htmlFor="family_name">Family Name</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  hover:border-blue-600"
                        id="family_name"
                        type="text"
                        name="family_name"
                        value={data.family_name}
                        onChange={handleChange}
                        required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-extrabold underline text-lg tracking-wider mb-2" htmlFor="email">Email</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  hover:border-blue-600"
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                        required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-extrabold underline text-lg tracking-wider mb-2" htmlFor="password">Password</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  hover:border-blue-600"
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        onChange={handleChange}
                        required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-extrabold underline text-lg tracking-wider mb-2" htmlFor="mobile_number">Mobile Number</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  hover:border-blue-600"
                        id="mobile_number"
                        type="text"
                        name="mobile_number"
                        value={data.mobile_number}
                        onChange={handleChange}
                        required />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 font-extrabold underline text-lg tracking-wider mb-2" htmlFor="profile_picture">Profile Picture</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  hover:border-blue-600"
                        id="profile_picture"
                        type="text"
                        name="profile_picture"
                        value={data.profile_picture}
                        onChange={handleChange}
                        required />
                </div>
                <div className="flex flex-col justify-center border-b-4 pb-8">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline  hover:border-blue-600"
                        type="submit">
                        {isLoading ? 'Loading...' : 'Register'}
                    </button>
                </div>
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
